import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import ClassroomWorkspace from './components/ClassroomWorkspace';
import ColabNotebook from './components/ColabNotebook';
import ProductivityPredictor from './components/ProductivityPredictor';
import QuizPollHub from './components/QuizPollHub';
import ErrorBoundary from './components/ErrorBoundary';
import { Sparkles, Database } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('classroom');
  const [facilitatorMode, setFacilitatorMode] = useState(false);
  const [selectedQuizSlide, setSelectedQuizSlide] = useState(null);

  // Global Pyodide WebAssembly Instance (Loads once & mounts CSV)
  const pyodideRef = useRef(null);
  const [pyodideStatus, setPyodideStatus] = useState('Initializing Python Engine...');
  const [pyodideReady, setPyodideReady] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function init() {
      if (window.loadPyodide && !pyodideRef.current) {
        try {
          setPyodideStatus('Loading Pyodide WebAssembly...');
          const py = await window.loadPyodide({
            indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/'
          });
          setPyodideStatus('Loading NumPy, Scikit-Learn, Matplotlib & Pandas...');
          const corePackages = ['numpy', 'scikit-learn', 'matplotlib', 'pandas'];
          for (const pkg of corePackages) {
            try {
              setPyodideStatus(`Loading ${pkg}...`);
              await py.loadPackage(pkg);
            } catch (pkgErr) {
              console.warn(`Notice while loading ${pkg}:`, pkgErr);
            }
          }

          // Compatibility Shims & Mocks for Jupyter / Colab notebooks
          try {
            await py.runPythonAsync(`
import sys, types

# 1. Provide root_mean_squared_error if scikit-learn version lacks it
try:
    import sklearn.metrics
    if not hasattr(sklearn.metrics, 'root_mean_squared_error'):
        def _rmse(y_true, y_pred, **kwargs):
            import numpy as np
            return np.sqrt(sklearn.metrics.mean_squared_error(y_true, y_pred, **kwargs))
        sklearn.metrics.root_mean_squared_error = _rmse
except Exception:
    pass

# 2. Mock google.colab in WebAssembly
if 'google.colab' not in sys.modules:
    colab = types.ModuleType('google.colab')
    files = types.ModuleType('google.colab.files')
    files.upload = lambda: {}
    colab.files = files
    sys.modules['google.colab'] = colab
    sys.modules['google.colab.files'] = files

# 3. Headless matplotlib backend for in-browser rendering
try:
    import matplotlib
    matplotlib.use('Agg')
except Exception:
    pass
`);
          } catch (shimErr) {
            console.warn('Shim initialization notice:', shimErr);
          }

          // Mount dataset
          try {
            const resp = await fetch('/employee_productivity_data.csv');
            if (resp.ok) {
              const csvText = await resp.text();
              py.FS.writeFile('employee_productivity_data.csv', csvText);
            }
          } catch (e) {
            console.warn('Dataset mount notice:', e);
          }

          pyodideRef.current = py;
          if (isMounted) {
            setPyodideReady(true);
            setPyodideStatus('NumPy, Scikit-Learn & Matplotlib Engine Ready');
          }
        } catch (err) {
          if (isMounted) {
            setPyodideReady(true);
            setPyodideStatus('Client Simulation Engine Ready');
          }
        }
      }
    }
    init();
    return () => { isMounted = false; };
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-page)' }}>
      {/* Top Navigation */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        facilitatorMode={facilitatorMode}
        setFacilitatorMode={setFacilitatorMode}
      />

      {/* Facilitator Global Notification Banner if ON */}
      {facilitatorMode && (
        <div style={{
          backgroundColor: 'var(--accent-orange-light)',
          borderBottom: '1px solid var(--accent-orange-border)',
          padding: '8px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          color: 'var(--accent-orange-text)',
          fontSize: '13px',
          fontWeight: '700'
        }}>
          <Sparkles size={15} color="var(--accent-orange)" />
          <span>Facilitator Mode is Active: Correct quiz answers, standardized statistical rankings, and classroom talking points are revealed.</span>
        </div>
      )}

      {/* Main Tab Content */}
      <main style={{ flex: 1, paddingBottom: '40px' }}>
        <ErrorBoundary>
          {activeTab === 'classroom' && (
            <ClassroomWorkspace 
              facilitatorMode={facilitatorMode} 
              onNavigateToQuizzes={(slideIdx) => {
                setSelectedQuizSlide(slideIdx);
                setActiveTab('quizzes');
              }}
              onNavigateToNotebook={() => setActiveTab('notebook')}
            />
          )}

          {activeTab === 'notebook' && (
            <div style={{ maxWidth: '1600px', margin: '0 auto', padding: '20px 24px' }}>
              <ColabNotebook 
                pyodideRef={pyodideRef}
                pyodideStatus={pyodideStatus}
              />
            </div>
          )}

          {activeTab === 'predictor' && (
            <ProductivityPredictor />
          )}

          {activeTab === 'quizzes' && (
            <QuizPollHub 
              facilitatorMode={facilitatorMode} 
              initialSlideIndex={selectedQuizSlide}
            />
          )}
        </ErrorBoundary>
      </main>

      {/* Footer */}
      <footer style={{
        backgroundColor: '#ffffff',
        borderTop: '1px solid var(--border-light)',
        padding: '20px 24px',
        color: 'var(--text-light)',
        fontSize: '13px',
        marginTop: 'auto'
      }}>
        <div style={{
          maxWidth: '1800px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Database size={16} color="var(--primary-blue)" />
            <span>
              <strong>Dataset:</strong> 6,000 employee-months across 9 permanent features (7 technical + 2 operational friction) • <strong>Benchmark Capacity:</strong> 160 tasks/month (Score 100)
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span>5,838 Complete Records (162 missing training hours filtered)</span>
            <span style={{ color: 'var(--border-medium)' }}>|</span>
            <span>NumPy Basics &amp; Complete Linear Regression Facilitator Platform</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
