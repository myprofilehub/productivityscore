import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  RotateCcw, 
  Plus, 
  Trash2, 
  Copy, 
  Check, 
  ChevronUp, 
  ChevronDown, 
  Terminal, 
  Cpu, 
  HardDrive, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  Code2, 
  Cloud, 
  UploadCloud, 
  Download, 
  FileCode, 
  X, 
  RefreshCw, 
  FolderOpen,
  ArrowRight,
  Database,
  Layers
} from 'lucide-react';
import { CODE_TEMPLATES } from '../data/courseData';

export default function ColabNotebook({ pyodideRef, pyodideStatus, onInsertCodeRef }) {
  // Initially null/false: The live code editor is NOT available until a notebook file is uploaded!
  const [notebookLoaded, setNotebookLoaded] = useState(false);
  const [notebookName, setNotebookName] = useState('');
  const [cells, setCells] = useState([]);
  const [activeCellId, setActiveCellId] = useState(null);
  const [runningCellId, setRunningCellId] = useState(null);
  const [isRunAll, setIsRunAll] = useState(false);
  const [executionCounter, setExecutionCounter] = useState(1);
  const [hoverDividerIdx, setHoverDividerIdx] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [mountedFiles, setMountedFiles] = useState(['employee_productivity_data.csv']);
  const [fileToast, setFileToast] = useState(null);
  const [showFilesModal, setShowFilesModal] = useState(false);

  const fileInputRef = useRef(null);
  const csvFileInputRef = useRef(null);

  // Expose insertion method to parent
  useEffect(() => {
    if (onInsertCodeRef) {
      onInsertCodeRef.current = (codeText, title = 'Slide Code') => {
        // Only allow inserting code if a notebook has already been uploaded!
        if (!notebookLoaded) return false;
        
        const newCellId = `cell-slide-${Date.now()}`;
        const newCell = {
          id: newCellId,
          type: 'code',
          content: codeText,
          output: null,
          executionCount: null,
          executionTime: null
        };
        setCells(prev => [...prev, newCell]);
        setActiveCellId(newCellId);
        return true;
      };
    }
  }, [onInsertCodeRef, notebookLoaded]);

  // Parse .ipynb JSON content
  const processNotebookJSON = (rawJSON, filename) => {
    try {
      const parsed = typeof rawJSON === 'string' ? JSON.parse(rawJSON) : rawJSON;

      if (!parsed.cells || !Array.isArray(parsed.cells)) {
        throw new Error('Invalid notebook format: Missing "cells" array in JSON.');
      }

      const parsedCells = parsed.cells.map((c, i) => {
        const content = Array.isArray(c.source) ? c.source.join('') : (c.source || '');
        let outputText = null;

        if (c.outputs && Array.isArray(c.outputs) && c.outputs.length > 0) {
          outputText = c.outputs
            .map(out => {
              if (out.text) return Array.isArray(out.text) ? out.text.join('') : out.text;
              if (out.data && out.data['text/plain']) {
                return Array.isArray(out.data['text/plain']) ? out.data['text/plain'].join('') : out.data['text/plain'];
              }
              if (out.traceback) {
                return out.traceback.join('\n');
              }
              return '';
            })
            .filter(Boolean)
            .join('\n');
        }

        return {
          id: `cell-uploaded-${i}-${Date.now()}`,
          type: c.cell_type === 'markdown' ? 'text' : 'code',
          content,
          output: outputText || null,
          executionCount: c.execution_count || null,
          executionTime: null
        };
      });

      if (parsedCells.length === 0) {
        throw new Error('The uploaded .ipynb notebook contains no cells.');
      }

      setNotebookName(filename);
      setCells(parsedCells);
      setActiveCellId(parsedCells[0].id);
      setNotebookLoaded(true);
      setUploadError(null);
    } catch (err) {
      setUploadError(`Failed to parse .ipynb file: ${err.message}`);
    }
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.ipynb') && !file.name.endsWith('.json')) {
      setUploadError('Please select a valid Jupyter Notebook file with a .ipynb extension.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      processNotebookJSON(event.target.result, file.name);
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // Drag and drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  // Upload and mount CSV file into Pyodide virtual filesystem
  const handleCsvFileUpload = (file) => {
    if (!file) return;
    if (!file.name.endsWith('.csv') && !file.name.endsWith('.tsv') && !file.name.endsWith('.txt')) {
      setFileToast({ type: 'error', message: 'Please select a .csv file.' });
      setTimeout(() => setFileToast(null), 4000);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      if (pyodideRef && pyodideRef.current) {
        try {
          pyodideRef.current.FS.writeFile(file.name, content);
          setMountedFiles(prev => Array.from(new Set([...prev, file.name])));
          setFileToast({
            type: 'success',
            message: `Successfully mounted "${file.name}"! Access in Python via pd.read_csv("${file.name}").`
          });
          setTimeout(() => setFileToast(null), 5000);
        } catch (err) {
          console.error('Mount file error:', err);
          setFileToast({ type: 'error', message: `Mount error: ${err.message}` });
          setTimeout(() => setFileToast(null), 5000);
        }
      } else {
        setFileToast({ type: 'error', message: 'Python engine is still initializing. Please wait a moment.' });
        setTimeout(() => setFileToast(null), 4000);
      }
    };
    reader.readAsText(file);
  };

  const handleCsvInputChange = (e) => {
    const file = e.target.files?.[0];
    if (file) handleCsvFileUpload(file);
    e.target.value = '';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    if (file.name.endsWith('.csv') || file.name.endsWith('.tsv') || file.name.endsWith('.txt')) {
      handleCsvFileUpload(file);
      return;
    }

    if (!file.name.endsWith('.ipynb') && !file.name.endsWith('.json')) {
      setUploadError('Please drop a valid .ipynb notebook file or .csv data file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      processNotebookJSON(event.target.result, file.name);
    };
    reader.readAsText(file);
  };

  // Load sample masterclass .ipynb
  const handleLoadSampleNotebook = async () => {
    try {
      const resp = await fetch('/Employee_Productivity_NumPy_Linear_Regression.ipynb');
      if (resp.ok) {
        const json = await resp.json();
        processNotebookJSON(json, 'Employee_Productivity_NumPy_Linear_Regression.ipynb');
      }
    } catch (e) {
      console.warn('Could not load sample notebook:', e);
      setUploadError('Could not load sample notebook from server.');
    }
  };

  // Close active notebook to return to upload screen
  const handleCloseNotebook = () => {
    setNotebookLoaded(false);
    setNotebookName('');
    setCells([]);
    setActiveCellId(null);
    setUploadError(null);
  };

  // Export current state as .ipynb JSON
  const handleExportNotebook = () => {
    const notebookData = {
      cells: cells.map(c => ({
        cell_type: c.type === 'text' ? 'markdown' : 'code',
        execution_count: c.executionCount || null,
        metadata: {},
        outputs: c.output ? [{
          output_type: 'stream',
          name: 'stdout',
          text: c.output.split('\n').map(l => l + '\n')
        }] : [],
        source: c.content.split('\n').map((line, idx, arr) => idx < arr.length - 1 ? line + '\n' : line)
      })),
      metadata: {
        kernelspec: {
          display_name: 'Python 3 (Pyodide WebAssembly)',
          language: 'python',
          name: 'python3'
        },
        language_info: {
          name: 'python',
          version: '3.11.0'
        }
      },
      nbformat: 4,
      nbformat_minor: 4
    };

    const blob = new Blob([JSON.stringify(notebookData, null, 2)], { type: 'application/x-ipynb+json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = notebookName.endsWith('.ipynb') ? notebookName : `${notebookName}.ipynb`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Preprocess IPython magics and shortcuts (e.g. %timeit, timeit, %time, %matplotlib, !pip)
  const preprocessNotebookCode = (code) => {
    if (!code) return '';
    const lines = code.split('\n');
    const transformed = [];

    // 1. Cell-level magics: %%time or %%timeit
    if (lines.length > 0) {
      const firstTrimmed = lines[0].trim();
      if (firstTrimmed.startsWith('%%timeit') || firstTrimmed.startsWith('%%time')) {
        const rest = lines.slice(1).join('\n');
        return `import time as _t_bench\n_t0 = _t_bench.perf_counter()\n${rest}\n_t1 = _t_bench.perf_counter()\nprint(f"Cell execution: {((_t1 - _t0) * 1000):.2f} ms")`;
      }
    }

    for (const line of lines) {
      const trimmed = line.trim();

      // 2. Shell commands (!pip install, !ls, etc.)
      if (trimmed.startsWith('!')) {
        transformed.push(`# [Shell command skipped in browser]: ${line}`);
        continue;
      }

      // 3. Skip line magics that don't need timing (%matplotlib, %config, etc.)
      if (trimmed.startsWith('%') && !trimmed.startsWith('%timeit') && !trimmed.startsWith('%time')) {
        transformed.push(`# [Magic skipped]: ${line}`);
        continue;
      }

      // 4. Handle %timeit or automagic timeit (e.g., 'timeit [x * 2 for x in data_list] # list')
      let body = trimmed;
      if (body.startsWith('%timeit')) body = body.replace(/^%timeit\s*/, 'timeit ');
      if (body.startsWith('%time')) body = body.replace(/^%time\s*/, 'time ');

      if (body.startsWith('timeit ') || body === 'timeit') {
        const indent = line.match(/^\s*/)?.[0] || '';
        let rawExpr = body.substring(6).trim();
        // Remove flags like -n 10 -r 3
        rawExpr = rawExpr.replace(/^(-[a-zA-Z0-9]+\s+[a-zA-Z0-9]+\s*)+/, '').trim();

        let comment = '';
        if (rawExpr.includes('#')) {
          const parts = rawExpr.split('#');
          rawExpr = parts[0].trim();
          comment = '  # ' + parts.slice(1).join('#').trim();
        }

        if (rawExpr) {
          transformed.push(
            `${indent}import time as _t_bench\n` +
            `${indent}_t0 = _t_bench.perf_counter()\n` +
            `${indent}_runs = 5\n` +
            `${indent}for _ in range(_runs):\n` +
            `${indent}    ${rawExpr}\n` +
            `${indent}_t1 = _t_bench.perf_counter()\n` +
            `${indent}_ms = ((_t1 - _t0) / _runs) * 1000\n` +
            `${indent}print(f"[{_ms:.2f} ms per loop] {${JSON.stringify(rawExpr)}}${comment}")`
          );
          continue;
        }
      }

      // 5. Handle %time or automagic time
      if (body.startsWith('time ') && !body.startsWith('time.sleep') && !body.startsWith('time.')) {
        const indent = line.match(/^\s*/)?.[0] || '';
        let rawExpr = body.substring(4).trim();
        if (rawExpr.includes('#')) rawExpr = rawExpr.split('#')[0].trim();
        if (rawExpr && !rawExpr.includes('=')) {
          transformed.push(
            `${indent}import time as _t_bench\n` +
            `${indent}_t0 = _t_bench.perf_counter()\n` +
            `${indent}${rawExpr}\n` +
            `${indent}_t1 = _t_bench.perf_counter()\n` +
            `${indent}print(f"Wall time: {((_t1 - _t0) * 1000):.2f} ms")`
          );
          continue;
        }
      }

      transformed.push(line);
    }

    return transformed.join('\n');
  };

  // Execute single cell internally via Pyodide
  const executeCell = async (cellId) => {
    const cell = cells.find(c => c.id === cellId);
    if (!cell || cell.type !== 'code') return;

    setRunningCellId(cellId);
    const startTime = performance.now();

    let outputResult = '';
    let outputImage = null;
    let isError = false;

    try {
      if (pyodideRef && pyodideRef.current) {
        const py = pyodideRef.current;

        // Auto-load any packages needed by this cell
        if (py.loadPackagesFromImports) {
          try {
            await py.loadPackagesFromImports(cell.content);
          } catch (pkgErr) {
            console.warn('Auto-load from imports notice:', pkgErr);
          }
        }

        // Direct package fallback verification
        if (cell.content.includes('matplotlib') && (!py.loadedPackages || !py.loadedPackages.matplotlib)) {
          try {
            await py.loadPackage('matplotlib');
          } catch (e) {
            console.warn('Direct matplotlib load fallback:', e);
          }
        }
        if (cell.content.includes('pandas') && (!py.loadedPackages || !py.loadedPackages.pandas)) {
          try {
            await py.loadPackage('pandas');
          } catch (e) {
            console.warn('Direct pandas load fallback:', e);
          }
        }
        if ((cell.content.includes('sklearn') || cell.content.includes('scikit-learn')) && (!py.loadedPackages || !py.loadedPackages['scikit-learn'])) {
          try {
            await py.loadPackage('scikit-learn');
          } catch (e) {
            console.warn('Direct scikit-learn load fallback:', e);
          }
        }

        const preprocessedCode = preprocessNotebookCode(cell.content);
        py.globals.set('_cell_code_input', preprocessedCode);
        const jsonStr = await py.runPythonAsync(`
import sys, io, traceback, json, base64, types

_out_io = io.StringIO()
_err_io = io.StringIO()
_old_out = sys.stdout
_old_err = sys.stderr
sys.stdout = _out_io
sys.stderr = _err_io

_error_msg = None
_img_b64 = None

try:
    # 1. Headless backend for Matplotlib
    try:
        import matplotlib
        matplotlib.use('Agg')
        import matplotlib.pyplot as _plt
        _plt.close('all')
    except Exception:
        pass

    # 2. Compatibility shim for sklearn root_mean_squared_error
    try:
        import sklearn.metrics as _skm
        if not hasattr(_skm, 'root_mean_squared_error'):
            def _rmse(y_true, y_pred, **kwargs):
                import numpy as _np
                return _np.sqrt(_skm.mean_squared_error(y_true, y_pred, **kwargs))
            _skm.root_mean_squared_error = _rmse
    except Exception:
        pass

    # 3. Mock google.colab in WebAssembly
    if 'google.colab' not in sys.modules:
        _colab = types.ModuleType('google.colab')
        _files = types.ModuleType('google.colab.files')
        _files.upload = lambda: {}
        _colab.files = _files
        sys.modules['google.colab'] = _colab
        sys.modules['google.colab.files'] = _files

    # Execute cell code in persistent global environment
    exec(compile(_cell_code_input, '<cell>', 'exec'), globals())

    # Check if a matplotlib figure was generated
    try:
        import matplotlib.pyplot as _plt
        if _plt.get_fignums():
            _buf = io.BytesIO()
            _plt.savefig(_buf, format='png', bbox_inches='tight', dpi=100)
            _buf.seek(0)
            _img_b64 = base64.b64encode(_buf.getvalue()).decode('utf-8')
            _plt.close('all')
    except Exception:
        pass

except Exception:
    _error_msg = traceback.format_exc()
finally:
    sys.stdout = _old_out
    sys.stderr = _old_err

json.dumps({
    "stdout": _out_io.getvalue(),
    "stderr": _err_io.getvalue(),
    "error": _error_msg,
    "image": _img_b64
})
`);
        const parsed = JSON.parse(jsonStr);
        if (parsed.error) {
          isError = true;
          outputResult = (parsed.stdout ? parsed.stdout + '\n' : '') + parsed.error;
        } else {
          outputResult = parsed.stdout || parsed.stderr || (parsed.image ? '' : '(Executed successfully with no printed output)');
          if (parsed.stderr && !parsed.stdout) isError = true;
        }
        if (parsed.image) {
          outputImage = parsed.image;
        }
      } else {
        outputResult = 'Python WebAssembly engine is initializing... Please wait a few seconds and run again.';
      }
    } catch (err) {
      isError = true;
      outputResult = `Traceback (most recent call last):\n  ${err.message || String(err)}`;
    } finally {
      const duration = ((performance.now() - startTime) / 1000).toFixed(2);
      const currentCount = executionCounter;
      setExecutionCounter(prev => prev + 1);

      setCells(prev => prev.map(c => {
        if (c.id === cellId) {
          return {
            ...c,
            output: outputResult,
            image: outputImage,
            isError,
            executionCount: currentCount,
            executionTime: `${duration}s`
          };
        }
        return c;
      }));

      setRunningCellId(null);
    }
  };

  // Run all cells sequentially
  const runAllCells = async () => {
    setIsRunAll(true);
    for (const cell of cells) {
      if (cell.type === 'code') {
        await executeCell(cell.id);
      }
    }
    setIsRunAll(false);
  };

  // Clear all cell outputs
  const clearAllOutputs = () => {
    setCells(prev => prev.map(c => ({
      ...c,
      output: null,
      isError: false,
      executionCount: null,
      executionTime: null
    })));
  };

  // Add cell
  const addCell = (type, index = cells.length) => {
    const newCell = {
      id: `cell-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      type,
      content: type === 'code' ? '# Write Python code here...\n' : '### Notes Section\nDouble click to edit markdown notes.',
      output: null,
      executionCount: null,
      executionTime: null
    };
    const nextCells = [...cells];
    nextCells.splice(index, 0, newCell);
    setCells(nextCells);
    setActiveCellId(newCell.id);
  };

  // Delete cell
  const deleteCell = (cellId) => {
    if (cells.length <= 1) return;
    setCells(prev => prev.filter(c => c.id !== cellId));
  };

  // Move cell
  const moveCell = (index, direction) => {
    const targetIdx = index + direction;
    if (targetIdx < 0 || targetIdx >= cells.length) return;
    const nextCells = [...cells];
    const [moved] = nextCells.splice(index, 1);
    nextCells.splice(targetIdx, 0, moved);
    setCells(nextCells);
  };

  // Update cell text
  const updateCellContent = (cellId, content) => {
    setCells(prev => prev.map(c => c.id === cellId ? { ...c, content } : c));
  };

  // Copy cell content
  const copyCellCode = (cellId, content) => {
    navigator.clipboard?.writeText(content);
    setCopiedId(cellId);
    setTimeout(() => setCopiedId(null), 1800);
  };

  // Fallback simulator for offline mode
  const simulateCellExecution = (c) => {
    if (c.includes('features') || c.includes('meeting_hours') || c.includes('blocker_hours') || c.includes('76.57')) {
      return `Model Intercept (c) : 76.57
Model R² Score      : 0.755 (Exceeds 0.75 Gold Standard!)
Model RMSE Error    : 4.51 score points
Meeting Drag Coef   : -0.320 pts/hr
Blocker Drag Coef   : -0.450 pts/hr`;
    }
    if (c.includes('df.shape') || c.includes('head()')) {
      return `Dataset Shape: (6000, 14) (6,000 rows x 14 columns)
Technical & Friction Features: ['experience_years', 'overtime_hours', 'absence_days', 'task_complexity', 'team_size', 'training_hours', 'ai_assistant', 'meeting_hours', 'blocker_hours']
Preview: Loaded successfully.`;
    }
    if (c.includes('StandardScaler') || c.includes('std_reg') || c.includes('ranking')) {
      return `=== Standardized Feature Weights Ranking ===
#1 experience_years  : +4.35 std pts
#2 task_complexity   : -3.13 std pts
#3 absence_days      : -2.77 std pts
#4 overtime_hours    : -2.31 std pts
#5 ai_assistant      : +2.26 std pts
#6 blocker_hours     : -1.89 std pts
#7 training_hours    : +1.67 std pts
#8 meeting_hours     : -1.54 std pts
#9 team_size         : -0.07 std pts`;
    }
    if (c.includes('Ridge') || c.includes('Lasso')) {
      return `Team Size Weight (Feature 5):
  OLS   : -0.0712
  Ridge : -0.0489 (Shrunk smoothly)
  Lasso : +0.0000 (Pruned to exactly 0.0!)`;
    }
    return `[Google Colab Output]
Script executed successfully in WebAssembly sandbox.`;
  };

  // =========================================================================
  // STATE 1: NO NOTEBOOK UPLOADED YET (SHOW ONLY THE UPLOAD BUTTON SECTION)
  // =========================================================================
  if (!notebookLoaded) {
    return (
      <div style={{
        borderRadius: 'var(--radius-lg)',
        backgroundColor: '#ffffff',
        border: '1px solid #d1d5db',
        boxShadow: 'var(--shadow-sm)',
        padding: '50px 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '520px',
        textAlign: 'center'
      }}>
        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".ipynb,application/x-ipynb+json,application/json"
          style={{ display: 'none' }}
        />

        {/* Upload Drop Area */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          style={{
            maxWidth: '480px',
            width: '100%',
            padding: '44px 32px',
            borderRadius: '16px',
            border: isDragging ? '2px dashed #f59e0b' : '2px dashed #cbd5e1',
            backgroundColor: isDragging ? '#fffbeb' : '#f8fafc',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            transition: 'all 0.2s ease',
            boxShadow: isDragging ? '0 6px 16px rgba(245, 158, 11, 0.2)' : 'none'
          }}
        >
          {/* Upload Icon */}
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '14px',
            backgroundColor: '#fef3c7',
            border: '1px solid #fde68a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '18px',
            boxShadow: '0 2px 8px rgba(245, 158, 11, 0.2)'
          }}>
            <UploadCloud size={30} color="#d97706" />
          </div>

          <h2 style={{ fontSize: '19px', fontWeight: '800', color: '#1e293b', margin: '0 0 8px 0' }}>
            Upload Notebook File (.ipynb)
          </h2>

          <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.6', margin: '0 0 24px 0', maxWidth: '380px' }}>
            Upload your Jupyter or Google Colab <strong>.ipynb</strong> notebook to launch the interactive code runner.
          </p>

          {/* Error Message if Any */}
          {uploadError && (
            <div style={{
              width: '100%',
              marginBottom: '18px',
              padding: '10px 14px',
              borderRadius: '8px',
              backgroundColor: '#fef2f2',
              border: '1px solid #fecaca',
              color: '#b91c1c',
              fontSize: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              textAlign: 'left'
            }}>
              <AlertCircle size={15} flexShrink={0} />
              <span>{uploadError}</span>
            </div>
          )}

          {/* PRIMARY UPLOAD BUTTON */}
          <button
            onClick={() => fileInputRef.current?.click()}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              padding: '14px 28px',
              borderRadius: '10px',
              backgroundColor: '#f59e0b',
              border: 'none',
              color: '#ffffff',
              fontSize: '14px',
              fontWeight: '800',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(245, 158, 11, 0.35)',
              transition: 'transform 0.1s ease, box-shadow 0.1s ease'
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <UploadCloud size={18} fill="#ffffff" />
            <span>Upload .ipynb Notebook</span>
          </button>

          <span style={{ fontSize: '12px', color: '#94a3b8', marginTop: '12px' }}>
            or drag and drop .ipynb file here
          </span>

          {/* Discreet Sample Loader & Downloader */}
          <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #e2e8f0', width: '100%', display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
            <button
              onClick={handleLoadSampleNotebook}
              style={{
                background: 'none',
                border: 'none',
                color: '#2563eb',
                fontSize: '12px',
                fontWeight: '700',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              Click here to load Employee_Productivity_NumPy_Linear_Regression.ipynb
            </button>
            <a
              href="/Employee_Productivity_NumPy_Linear_Regression.ipynb"
              download="Employee_Productivity_NumPy_Linear_Regression.ipynb"
              style={{
                fontSize: '11px',
                color: '#64748b',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <span>Download masterclass .ipynb file</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // STATE 2: NOTEBOOK IS UPLOADED (SHOW FULL INTERACTIVE COLAB CELL RUNNER)
  // =========================================================================
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      borderRadius: 'var(--radius-lg)',
      backgroundColor: '#ffffff',
      border: '1px solid #d1d5db',
      boxShadow: 'var(--shadow-sm)',
      overflow: 'hidden'
    }}>
      {/* Hidden File Input for Switching / Re-uploading .ipynb */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".ipynb,application/x-ipynb+json,application/json"
        style={{ display: 'none' }}
      />

      {/* Hidden File Input for Uploading .csv / Data Files */}
      <input
        type="file"
        ref={csvFileInputRef}
        onChange={handleCsvInputChange}
        accept=".csv,.tsv,.txt"
        style={{ display: 'none' }}
      />

      {/* ============================================================== */}
      {/* ACTIVE NOTEBOOK HEADER BAR                                     */}
      {/* ============================================================== */}
      <div style={{
        backgroundColor: '#f8fafc',
        borderBottom: '1px solid #e2e8f0',
        padding: '10px 14px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
          {/* Title & Colab Emblem */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '26px',
              height: '26px',
              borderRadius: '6px',
              backgroundColor: '#f59e0b',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '900',
              fontSize: '13px',
              boxShadow: '0 1px 3px rgba(245, 158, 11, 0.4)'
            }}>
              CO
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b' }}>
                  {notebookName}
                </span>
                <span style={{
                  fontSize: '10px',
                  backgroundColor: '#dbeafe',
                  color: '#1d4ed8',
                  padding: '1px 6px',
                  borderRadius: '4px',
                  fontWeight: '700'
                }}>
                  {cells.length} cells loaded
                </span>
                <Cloud size={13} color="#10b981" title="Mounted virtual filesystem ready" />
              </div>
              <div style={{ display: 'flex', gap: '10px', fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
                <span style={{ cursor: 'pointer' }} onClick={() => fileInputRef.current?.click()}>File</span>
                <span style={{ cursor: 'pointer' }} onClick={() => setShowFilesModal(prev => !prev)}>Dataset</span>
                <span style={{ cursor: 'pointer' }}>Edit</span>
                <span style={{ cursor: 'pointer' }}>View</span>
                <span style={{ cursor: 'pointer' }}>Runtime</span>
                <span style={{ cursor: 'pointer' }}>Tools</span>
              </div>
            </div>
          </div>

          {/* Runtime & Resource Monitor */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* RAM Meter */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#64748b' }}>
              <Cpu size={12} color="#475569" />
              <span>RAM</span>
              <div style={{ width: '36px', height: '6px', backgroundColor: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: '24%', height: '100%', backgroundColor: '#3b82f6' }} />
              </div>
            </div>

            {/* Disk Meter */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#64748b' }}>
              <HardDrive size={12} color="#475569" />
              <span>Disk</span>
              <div style={{ width: '36px', height: '6px', backgroundColor: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: '19%', height: '100%', backgroundColor: '#10b981' }} />
              </div>
            </div>

            {/* Connection Badge */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              backgroundColor: '#ecfdf5',
              border: '1px solid #a7f3d0',
              padding: '3px 8px',
              borderRadius: '12px',
              fontSize: '11px',
              fontWeight: '700',
              color: '#065f46'
            }}>
              <div style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#10b981' }} />
              <span>Connected</span>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTop: '1px solid #f1f5f9',
          paddingTop: '6px',
          gap: '8px',
          flexWrap: 'wrap'
        }}>
          {/* Main Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
            {/* Re-Upload / Switch Button */}
            <button
              onClick={() => fileInputRef.current?.click()}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '5px 10px',
                borderRadius: '6px',
                backgroundColor: '#f59e0b',
                border: 'none',
                color: '#ffffff',
                fontSize: '11px',
                fontWeight: '800',
                cursor: 'pointer'
              }}
              title="Upload another .ipynb file"
            >
              <UploadCloud size={12} fill="#ffffff" />
              <span>Change .ipynb</span>
            </button>

            {/* Upload CSV / Dataset Button */}
            <button
              onClick={() => csvFileInputRef.current?.click()}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '5px 10px',
                borderRadius: '6px',
                backgroundColor: '#10b981',
                border: 'none',
                color: '#ffffff',
                fontSize: '11px',
                fontWeight: '800',
                cursor: 'pointer',
                boxShadow: '0 1px 3px rgba(16, 185, 129, 0.3)'
              }}
              title="Upload any .csv file into the Python virtual filesystem"
            >
              <Database size={12} fill="#ffffff" />
              <span>Upload CSV</span>
            </button>

            {/* Files Panel Toggle Button */}
            <button
              onClick={() => setShowFilesModal(prev => !prev)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '4px 9px',
                borderRadius: '6px',
                backgroundColor: showFilesModal ? '#ecfdf5' : '#ffffff',
                border: `1px solid ${showFilesModal ? '#10b981' : '#cbd5e1'}`,
                fontSize: '11px',
                fontWeight: '700',
                color: showFilesModal ? '#047857' : '#334155',
                cursor: 'pointer'
              }}
              title="View all files mounted in Python environment"
            >
              <FolderOpen size={12} color="#059669" />
              <span>Files ({mountedFiles.length})</span>
            </button>

            <div style={{ width: '1px', height: '18px', backgroundColor: '#e2e8f0', margin: '0 2px' }} />

            {/* Run All */}
            <button
              onClick={runAllCells}
              disabled={isRunAll || runningCellId !== null}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '5px 11px',
                borderRadius: '6px',
                backgroundColor: '#2563eb',
                border: 'none',
                color: '#ffffff',
                fontSize: '11px',
                fontWeight: '700',
                cursor: 'pointer',
                opacity: isRunAll ? 0.6 : 1
              }}
              title="Run all code cells sequentially in internal Pyodide engine"
            >
              <Play size={11} fill="#ffffff" />
              <span>{isRunAll ? 'Running All...' : 'Run All'}</span>
            </button>

            {/* Export / Download */}
            <button
              onClick={handleExportNotebook}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '4px 9px',
                borderRadius: '6px',
                backgroundColor: '#ffffff',
                border: '1px solid #cbd5e1',
                fontSize: '11px',
                fontWeight: '700',
                color: '#334155',
                cursor: 'pointer'
              }}
              title="Download executed notebook as .ipynb file"
            >
              <Download size={12} />
              <span>Export</span>
            </button>

            <div style={{ width: '1px', height: '18px', backgroundColor: '#e2e8f0', margin: '0 2px' }} />

            {/* Add Cell Buttons */}
            <button
              onClick={() => addCell('code')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '4px 8px',
                borderRadius: '6px',
                backgroundColor: '#ffffff',
                border: '1px solid #cbd5e1',
                fontSize: '11px',
                fontWeight: '700',
                color: '#334155',
                cursor: 'pointer'
              }}
            >
              <Plus size={12} color="#2563eb" />
              <span>Code</span>
            </button>

            <button
              onClick={() => addCell('text')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '4px 8px',
                borderRadius: '6px',
                backgroundColor: '#ffffff',
                border: '1px solid #cbd5e1',
                fontSize: '11px',
                fontWeight: '700',
                color: '#334155',
                cursor: 'pointer'
              }}
            >
              <Plus size={12} color="#059669" />
              <span>Text</span>
            </button>

            <button
              onClick={clearAllOutputs}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '4px 8px',
                borderRadius: '6px',
                backgroundColor: 'transparent',
                border: '1px solid #e2e8f0',
                fontSize: '11px',
                color: '#64748b',
                cursor: 'pointer'
              }}
              title="Clear all cell outputs"
            >
              <RotateCcw size={11} />
              <span>Clear</span>
            </button>
          </div>

          {/* Close Notebook Button */}
          <button
            onClick={handleCloseNotebook}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              background: 'none',
              border: 'none',
              fontSize: '11px',
              color: '#dc2626',
              fontWeight: '700',
              cursor: 'pointer'
            }}
            title="Close this notebook and return to the upload screen"
          >
            <X size={12} />
            <span>Close Notebook</span>
          </button>
        </div>

        {/* Files Explorer Drawer */}
        {showFilesModal && (
          <div style={{
            marginTop: '10px',
            backgroundColor: '#ffffff',
            border: '1px solid #cbd5e1',
            borderRadius: '8px',
            padding: '12px 16px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FolderOpen size={16} color="#059669" />
                <span style={{ fontSize: '13px', fontWeight: '800', color: '#0f172a' }}>
                  Virtual Filesystem (/content/)
                </span>
                <span style={{ fontSize: '11px', color: '#64748b' }}>
                  Files directly available to <code>open()</code>, <code>pd.read_csv()</code>, <code>np.loadtxt()</code>
                </span>
              </div>
              <button
                onClick={() => setShowFilesModal(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
              >
                <X size={15} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {mountedFiles.map(filename => (
                <div
                  key={filename}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    backgroundColor: '#f8fafc',
                    border: '1px solid #e2e8f0'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FileText size={15} color="#3b82f6" />
                    <span style={{ fontSize: '12px', fontFamily: 'monospace', fontWeight: '700', color: '#1e293b' }}>
                      {filename}
                    </span>
                    {filename === 'employee_productivity_data.csv' && (
                      <span style={{ fontSize: '10px', backgroundColor: '#e0f2fe', color: '#0369a1', padding: '1px 6px', borderRadius: '4px', fontWeight: '700' }}>
                        Default Masterclass Dataset (6,000 rows)
                      </span>
                    )}
                  </div>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button
                      onClick={() => {
                        const code = `# Load mounted CSV data file\nimport pandas as pd\ndf = pd.read_csv('${filename}')\nprint(f"Shape: {df.shape}")\ndf.head()`;
                        const newCell = {
                          id: `cell-load-${Date.now()}`,
                          type: 'code',
                          content: code,
                          output: null,
                          executionCount: null,
                          executionTime: null
                        };
                        setCells(prev => [...prev, newCell]);
                        setShowFilesModal(false);
                      }}
                      style={{
                        padding: '3px 9px',
                        borderRadius: '5px',
                        border: '1px solid #cbd5e1',
                        backgroundColor: '#ffffff',
                        fontSize: '11px',
                        fontWeight: '700',
                        color: '#2563eb',
                        cursor: 'pointer'
                      }}
                    >
                      + Insert pd.read_csv Cell
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  onClick={() => csvFileInputRef.current?.click()}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    backgroundColor: '#10b981',
                    color: '#ffffff',
                    border: 'none',
                    fontSize: '11px',
                    fontWeight: '800',
                    cursor: 'pointer'
                  }}
                >
                  <Plus size={13} />
                  <span>Upload Custom CSV</span>
                </button>
                <span style={{ fontSize: '11px', color: '#64748b' }}>
                  Supports .csv, .tsv, .txt
                </span>
              </div>
              <span style={{ fontSize: '11px', color: '#94a3b8' }}>
                Drag & drop files anywhere onto the notebook to mount automatically
              </span>
            </div>
          </div>
        )}
      </div>

      {/* ============================================================== */}
      {/* NOTEBOOK CELLS LIST                                           */}
      {/* ============================================================== */}
      <div style={{
        padding: '16px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        width: '100%',
        boxSizing: 'border-box',
        overflowX: 'hidden',
        overflowY: 'auto',
        maxHeight: '850px',
        backgroundColor: '#f8fafc'
      }}>
        {cells.map((cell, idx) => {
          const isFocused = activeCellId === cell.id;
          const isExecuting = runningCellId === cell.id;

          return (
            <div key={cell.id} style={{ display: 'flex', flexDirection: 'column' }}>
              {/* Floating Add Line between cells */}
              <div
                onMouseEnter={() => setHoverDividerIdx(idx)}
                onMouseLeave={() => setHoverDividerIdx(null)}
                style={{
                  height: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative'
                }}
              >
                {hoverDividerIdx === idx && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    backgroundColor: '#ffffff',
                    padding: '1px 8px',
                    borderRadius: '10px',
                    border: '1px solid #cbd5e1',
                    zIndex: 10,
                    boxShadow: '0 2px 4px rgba(0,0,0,0.06)'
                  }}>
                    <button
                      onClick={() => addCell('code', idx)}
                      style={{ background: 'none', border: 'none', fontSize: '10px', fontWeight: '700', color: '#2563eb', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '2px' }}
                    >
                      <Plus size={10} /> Code
                    </button>
                    <span style={{ color: '#cbd5e1' }}>|</span>
                    <button
                      onClick={() => addCell('text', idx)}
                      style={{ background: 'none', border: 'none', fontSize: '10px', fontWeight: '700', color: '#059669', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '2px' }}
                    >
                      <Plus size={10} /> Text
                    </button>
                  </div>
                )}
              </div>

              {/* Cell Card Box */}
              <div
                onClick={() => setActiveCellId(cell.id)}
                style={{
                  borderRadius: '8px',
                  border: isFocused ? '2px solid #2563eb' : '1px solid #e2e8f0',
                  backgroundColor: '#ffffff',
                  boxShadow: isFocused ? '0 0 0 3px rgba(37, 99, 235, 0.1)' : '0 1px 2px rgba(0,0,0,0.03)',
                  overflow: 'hidden',
                  transition: 'border 0.15s ease, box-shadow 0.15s ease'
                }}
              >
                {/* Cell Header with Actions */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '4px 10px',
                  backgroundColor: isFocused ? '#eff6ff' : '#f8fafc',
                  borderBottom: '1px solid #e2e8f0',
                  fontSize: '11px',
                  color: '#64748b'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {cell.type === 'code' ? (
                      <span style={{ fontFamily: 'var(--font-mono)', fontWeight: '700', color: '#2563eb' }}>
                        [{cell.executionCount ? cell.executionCount : ' '}]
                      </span>
                    ) : (
                      <span style={{ fontWeight: '700', color: '#059669', display: 'flex', alignItems: 'center', gap: '3px' }}>
                        <FileText size={11} /> Markdown Text
                      </span>
                    )}

                    {cell.executionTime && (
                      <span style={{ fontSize: '10px', color: '#94a3b8' }}>
                        • Executed in {cell.executionTime}
                      </span>
                    )}
                  </div>

                  {/* Cell Top-Right Actions */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <button
                      onClick={(e) => { e.stopPropagation(); moveCell(idx, -1); }}
                      disabled={idx === 0}
                      style={{ background: 'none', border: 'none', color: '#64748b', cursor: idx === 0 ? 'default' : 'pointer', opacity: idx === 0 ? 0.3 : 1 }}
                      title="Move cell up"
                    >
                      <ChevronUp size={14} />
                    </button>

                    <button
                      onClick={(e) => { e.stopPropagation(); moveCell(idx, 1); }}
                      disabled={idx === cells.length - 1}
                      style={{ background: 'none', border: 'none', color: '#64748b', cursor: idx === cells.length - 1 ? 'default' : 'pointer', opacity: idx === cells.length - 1 ? 0.3 : 1 }}
                      title="Move cell down"
                    >
                      <ChevronDown size={14} />
                    </button>

                    <button
                      onClick={(e) => { e.stopPropagation(); copyCellCode(cell.id, cell.content); }}
                      style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}
                      title="Copy cell contents"
                    >
                      {copiedId === cell.id ? <Check size={13} color="#10b981" /> : <Copy size={13} />}
                    </button>

                    <button
                      onClick={(e) => { e.stopPropagation(); deleteCell(cell.id); }}
                      style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}
                      title="Delete cell"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>

                {/* Cell Main Body */}
                {/* Cell Main Body */}
                {cell.type === 'code' ? (
                  <div style={{ width: '100%', boxSizing: 'border-box' }}>
                    {/* Code Input Area with Gutter Play Button - WHITE THEME */}
                    <div style={{
                      display: 'flex',
                      width: '100%',
                      boxSizing: 'border-box',
                      backgroundColor: '#ffffff',
                      minWidth: 0
                    }}>
                      {/* Colab Circular Play Button in Left Gutter */}
                      <div style={{
                        width: '46px',
                        flexShrink: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        paddingTop: '10px',
                        borderRight: '1px solid #e2e8f0',
                        backgroundColor: '#f8fafc'
                      }}>
                        <button
                          onClick={() => executeCell(cell.id)}
                          disabled={isExecuting}
                          style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '50%',
                            backgroundColor: isExecuting ? '#fef3c7' : '#ffffff',
                            border: isExecuting ? '1px solid #fde68a' : '1px solid #cbd5e1',
                            color: isExecuting ? '#d97706' : '#2563eb',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                            transition: 'all 0.15s ease'
                          }}
                          title="Run cell (Shift+Enter)"
                          onMouseEnter={(e) => {
                            if (!isExecuting) {
                              e.currentTarget.style.backgroundColor = '#eff6ff';
                              e.currentTarget.style.borderColor = '#93c5fd';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!isExecuting) {
                              e.currentTarget.style.backgroundColor = '#ffffff';
                              e.currentTarget.style.borderColor = '#cbd5e1';
                            }
                          }}
                        >
                          {isExecuting ? (
                            <div style={{
                              width: '12px',
                              height: '12px',
                              borderRadius: '50%',
                              border: '2px solid #d97706',
                              borderTopColor: 'transparent',
                              animation: 'spin 0.8s linear infinite'
                            }} />
                          ) : (
                            <Play size={12} fill="#2563eb" color="#2563eb" style={{ marginLeft: '2px' }} />
                          )}
                        </button>
                      </div>

                      {/* Code Editor Textarea - Clean White Theme & Flexible Width */}
                      <textarea
                        value={cell.content}
                        onChange={(e) => updateCellContent(cell.id, e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && e.shiftKey) {
                            e.preventDefault();
                            executeCell(cell.id);
                          }
                        }}
                        wrap="soft"
                        spellCheck="false"
                        style={{
                          flex: 1,
                          width: '100%',
                          minWidth: 0,
                          boxSizing: 'border-box',
                          minHeight: Math.min(500, Math.max(75, ((cell.content || '').split('\n').length + 1) * 20)) + 'px',
                          padding: '12px 16px',
                          backgroundColor: '#ffffff',
                          color: '#0f172a',
                          fontFamily: 'Consolas, Monaco, "Courier New", monospace',
                          fontSize: '13px',
                          lineHeight: '1.55',
                          border: 'none',
                          outline: 'none',
                          resize: 'vertical',
                          whiteSpace: 'pre-wrap',
                          wordBreak: 'break-word',
                          overflowWrap: 'anywhere',
                          overflowX: 'hidden',
                          caretColor: '#2563eb'
                        }}
                      />
                    </div>

                    {/* Cell Output Container */}
                    {(cell.output || cell.image) && (
                      <div style={{
                        borderTop: '1px solid #e2e8f0',
                        backgroundColor: cell.isError ? '#fff5f5' : '#f8fafc',
                        padding: '12px 16px',
                        width: '100%',
                        boxSizing: 'border-box',
                        fontSize: '12.5px',
                        fontFamily: 'Consolas, Monaco, "Courier New", monospace',
                        lineHeight: '1.5'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                          <span style={{
                            fontSize: '10.5px',
                            fontWeight: '700',
                            color: cell.isError ? '#dc2626' : '#059669',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}>
                            {cell.isError ? <AlertCircle size={13} /> : <CheckCircle2 size={13} />}
                            {cell.isError ? 'Execution Error' : 'Standard Output'}
                          </span>

                          <button
                            onClick={() => {
                              setCells(prev => prev.map(c => c.id === cell.id ? { ...c, output: null, image: null } : c));
                            }}
                            style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '0 2px' }}
                            title="Clear cell output"
                          >
                            <X size={13} />
                          </button>
                        </div>

                        {cell.image && (
                          <div style={{ margin: '10px 0', textAlign: 'center' }}>
                            <img
                              src={`data:image/png;base64,${cell.image}`}
                              alt="Matplotlib Chart"
                              style={{ maxWidth: '100%', borderRadius: '6px', border: '1px solid #e2e8f0', backgroundColor: '#ffffff' }}
                            />
                          </div>
                        )}

                        {cell.output && (
                          <pre style={{
                            margin: 0,
                            color: cell.isError ? '#991b1b' : '#0f172a',
                            whiteSpace: 'pre-wrap',
                            wordBreak: 'break-word',
                            overflowWrap: 'anywhere',
                            overflowX: 'hidden',
                            width: '100%',
                            boxSizing: 'border-box',
                            maxHeight: '350px',
                            overflowY: 'auto'
                          }}>
                            {cell.output}
                          </pre>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  /* Text / Markdown Cell */
                  <div style={{ padding: '12px 14px', width: '100%', boxSizing: 'border-box' }}>
                    <textarea
                      value={cell.content}
                      onChange={(e) => updateCellContent(cell.id, e.target.value)}
                      wrap="soft"
                      style={{
                        width: '100%',
                        minWidth: 0,
                        boxSizing: 'border-box',
                        minHeight: Math.min(300, Math.max(65, ((cell.content || '').split('\n').length + 1) * 20)) + 'px',
                        padding: '10px 12px',
                        borderRadius: '6px',
                        border: '1px solid #cbd5e1',
                        backgroundColor: '#ffffff',
                        fontFamily: 'inherit',
                        fontSize: '13px',
                        lineHeight: '1.5',
                        outline: 'none',
                        resize: 'vertical',
                        color: '#0f172a',
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word',
                        overflowWrap: 'anywhere',
                        overflowX: 'hidden'
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Bottom Bar: Add Cell & Switch Notebook */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '10px 0', flexWrap: 'wrap' }}>
          <button
            onClick={() => fileInputRef.current?.click()}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              padding: '6px 14px',
              borderRadius: '20px',
              backgroundColor: '#fef3c7',
              border: '1px solid #fde68a',
              fontSize: '11px',
              fontWeight: '700',
              color: '#92400e',
              cursor: 'pointer',
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
            }}
          >
            <UploadCloud size={13} />
            <span>Upload Another .ipynb Notebook</span>
          </button>

          <button
            onClick={() => addCell('code')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '6px 12px',
              borderRadius: '20px',
              backgroundColor: '#ffffff',
              border: '1px solid #cbd5e1',
              fontSize: '11px',
              fontWeight: '700',
              color: '#2563eb',
              cursor: 'pointer',
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
            }}
          >
            <Plus size={13} />
            <span>Add Code Cell</span>
          </button>

          <button
            onClick={() => addCell('text')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '6px 12px',
              borderRadius: '20px',
              backgroundColor: '#ffffff',
              border: '1px solid #cbd5e1',
              fontSize: '11px',
              fontWeight: '700',
              color: '#059669',
              cursor: 'pointer',
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
            }}
          >
            <Plus size={13} />
            <span>Add Text Cell</span>
          </button>
        </div>
      </div>

      {/* Floating File Notification Toast */}
      {fileToast && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 9999,
          backgroundColor: fileToast.type === 'error' ? '#fef2f2' : '#ecfdf5',
          border: `1px solid ${fileToast.type === 'error' ? '#fecaca' : '#a7f3d0'}`,
          color: fileToast.type === 'error' ? '#991b1b' : '#065f46',
          padding: '10px 16px',
          borderRadius: '8px',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '12px',
          fontWeight: '600'
        }}>
          {fileToast.type === 'error' ? <AlertCircle size={16} /> : <CheckCircle2 size={16} />}
          <span>{fileToast.message}</span>
        </div>
      )}
    </div>
  );
}
