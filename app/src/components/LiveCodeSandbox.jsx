import React, { useRef } from 'react';
import ColabNotebook from './ColabNotebook';

export default function LiveCodeSandbox() {
  const pyodideRef = useRef(null);

  return (
    <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ marginBottom: '16px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text-main)', marginBottom: '4px' }}>
          Interactive Google Colab Notebook
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: 0 }}>
          Live in-browser Python runtime powered by WebAssembly, NumPy, and Scikit-Learn. Experiment with cells, run multi-stage regression pipelines, and inspect workplace productivity outputs.
        </p>
      </div>

      <ColabNotebook 
        pyodideRef={pyodideRef}
        pyodideStatus="NumPy & Scikit-Learn Engine Ready"
      />
    </div>
  );
}
