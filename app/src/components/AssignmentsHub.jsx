import React, { useState } from 'react';
import { 
  FileText, 
  Award, 
  CheckCircle2, 
  Sparkles, 
  BookOpen, 
  Code2, 
  Download, 
  Check, 
  Copy 
} from 'lucide-react';
import { ASSIGNMENTS } from '../data/courseData';

export default function AssignmentsHub({ facilitatorMode }) {
  const [activeAssignmentId, setActiveAssignmentId] = useState('assignment-1');
  const [copiedTask, setCopiedTask] = useState(null);

  const activeAssignment = ASSIGNMENTS.find(a => a.id === activeAssignmentId) || ASSIGNMENTS[0];

  const handleCopyCode = (taskNum, code) => {
    navigator.clipboard.writeText(code);
    setCopiedTask(taskNum);
    setTimeout(() => setCopiedTask(null), 2000);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
      {/* Header Banner */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-light)',
        padding: '24px 28px',
        marginBottom: '24px',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span className="badge badge-blue">
              <Award size={13} /> Practical Certification Assessments
            </span>
            <span className="badge badge-green">
              2 Hands-on Jupyter / Colab Assignments
            </span>
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text-main)', margin: '4px 0' }}>
            Take-Home Certification Assignments
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
            Participants submit a Jupyter or Colab notebook with vectorised NumPy code, regression outputs, and ethical workplace conclusions based on <code>employee_productivity_data.csv</code>.
          </p>
        </div>

        {/* Global Marks Badge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          padding: '12px 20px',
          backgroundColor: 'var(--bg-card-subtle)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-light)'
        }}>
          <div>
            <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-light)', textTransform: 'uppercase' }}>
              Total Weight
            </div>
            <div style={{ fontSize: '22px', fontWeight: '800', color: 'var(--primary-blue)' }}>
              100 Marks Total
            </div>
          </div>
        </div>
      </div>

      {/* Assignment Switcher Tabs */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        {ASSIGNMENTS.map(asgn => {
          const isActive = asgn.id === activeAssignmentId;
          return (
            <button
              key={asgn.id}
              onClick={() => setActiveAssignmentId(asgn.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                borderRadius: 'var(--radius-md)',
                border: isActive ? '1.5px solid var(--primary-blue)' : '1px solid var(--border-light)',
                backgroundColor: isActive ? 'var(--primary-blue-light)' : '#ffffff',
                color: isActive ? 'var(--primary-blue)' : 'var(--text-muted)',
                fontWeight: isActive ? '800' : '600',
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <FileText size={16} />
              <span>{asgn.title}</span>
              <span className={`badge ${isActive ? 'badge-blue' : 'badge-green'}`} style={{ fontSize: '11px' }}>
                {asgn.marks} Marks
              </span>
            </button>
          );
        })}
      </div>

      {/* Marking Scheme Summary Card */}
      <div className="card" style={{ marginBottom: '20px', backgroundColor: 'var(--bg-card-subtle)' }}>
        <h3 style={{ fontSize: '14px', fontWeight: '800', color: 'var(--text-main)', marginBottom: '8px' }}>
          Official Evaluation &amp; Marking Rubric (100 Marks Total)
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px', fontSize: '12px' }}>
          <div style={{ padding: '8px 12px', backgroundColor: '#ffffff', borderRadius: '4px', border: '1px solid var(--border-light)' }}>
            <span style={{ fontWeight: '700', color: 'var(--primary-blue)' }}>30 Marks:</span> Correct NumPy vectorised operations without row loops
          </div>
          <div style={{ padding: '8px 12px', backgroundColor: '#ffffff', borderRadius: '4px', border: '1px solid var(--border-light)' }}>
            <span style={{ fontWeight: '700', color: 'var(--primary-blue)' }}>25 Marks:</span> Correct regression, gradient descent &amp; evaluation metrics
          </div>
          <div style={{ padding: '8px 12px', backgroundColor: '#ffffff', borderRadius: '4px', border: '1px solid var(--border-light)' }}>
            <span style={{ fontWeight: '700', color: 'var(--primary-blue)' }}>20 Marks:</span> Feature impact analysis (standardised weights, drop-one, bootstrap)
          </div>
          <div style={{ padding: '8px 12px', backgroundColor: '#ffffff', borderRadius: '4px', border: '1px solid var(--border-light)' }}>
            <span style={{ fontWeight: '700', color: 'var(--primary-blue)' }}>15 Marks:</span> Diagnostics checks, honest time split &amp; Ridge
          </div>
          <div style={{ padding: '8px 12px', backgroundColor: '#ffffff', borderRadius: '4px', border: '1px solid var(--border-light)' }}>
            <span style={{ fontWeight: '700', color: 'var(--primary-blue)' }}>10 Marks:</span> Written answers on ethics, fairness &amp; clean execution
          </div>
        </div>
      </div>

      {/* Selected Assignment Tasks */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        <div className="card" style={{ borderLeft: '5px solid var(--primary-blue)' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-main)', marginBottom: '6px' }}>
            {activeAssignment.title}
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.5' }}>
            <strong>Business Scenario:</strong> {activeAssignment.scenario}
          </p>
        </div>

        {/* Tasks List */}
        {activeAssignment.tasks.map(task => (
          <div key={task.num} className="card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--primary-blue)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '13px',
                  fontWeight: '800'
                }}>
                  {task.num}
                </span>
                <h3 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text-main)' }}>
                  Task {task.num}: {task.title}
                </h3>
              </div>
            </div>

            <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', marginBottom: '12px', lineHeight: '1.5' }}>
              {task.desc}
            </p>

            {/* Facilitator Reference Benchmark */}
            {facilitatorMode && (
              <div style={{
                backgroundColor: '#0f172a',
                borderRadius: 'var(--radius-sm)',
                padding: '12px 16px',
                borderLeft: '4px solid var(--accent-green)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '11px', fontWeight: '800', color: '#34d399', textTransform: 'uppercase' }}>
                    🔑 Facilitator Reference Benchmark Solution
                  </span>
                  <button
                    onClick={() => handleCopyCode(task.num, task.solution)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#94a3b8',
                      fontSize: '11px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    {copiedTask === task.num ? <Check size={12} color="#34d399" /> : <Copy size={12} />}
                    <span>{copiedTask === task.num ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <pre style={{
                  fontSize: '12px',
                  fontFamily: 'var(--font-mono)',
                  color: '#f8fafc',
                  margin: 0,
                  whiteSpace: 'pre-wrap',
                  lineHeight: '1.5'
                }}>
                  {task.solution}
                </pre>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
