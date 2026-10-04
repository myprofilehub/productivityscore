import React from 'react';

export default function SlideVisual({ visualType }) {
  if (visualType === 'memory') {
    return (
      <div style={{
        backgroundColor: '#ffffff',
        border: '1.5px solid var(--border-light)',
        borderRadius: 'var(--radius-md)',
        padding: '16px 20px',
        margin: '14px 0'
      }}>
        <div style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text-main)', marginBottom: '12px' }}>
          Pictorial Mental Model: Why NumPy is 50x Faster than Python Lists
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {/* Python List */}
          <div style={{
            padding: '12px',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'var(--accent-orange-light)',
            border: '1px solid var(--accent-orange-border)'
          }}>
            <div style={{ fontSize: '12px', fontWeight: '800', color: 'var(--accent-orange-text)', marginBottom: '8px' }}>
              Standard Python List (Scattered in RAM)
            </div>
            <div style={{ display: 'flex', gap: '6px', marginBottom: '8px' }}>
              {['ptr 0x1', 'ptr 0x8', 'ptr 0x4', 'ptr 0x9'].map((p, i) => (
                <div key={i} style={{
                  padding: '6px 8px',
                  backgroundColor: '#ffffff',
                  border: '1px dashed var(--accent-orange)',
                  borderRadius: '4px',
                  fontSize: '11px',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--accent-orange)'
                }}>
                  {p} ↘
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {['4.0 (24B)', '3.4 (24B)', '3.0 (24B)', '4.1 (24B)'].map((o, i) => (
                <div key={i} style={{
                  padding: '4px 6px',
                  backgroundColor: '#ffffff',
                  border: '1px solid var(--border-medium)',
                  borderRadius: '4px',
                  fontSize: '10px',
                  color: 'var(--text-muted)'
                }}>
                  {o}
                </div>
              ))}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--accent-orange-text)', marginTop: '8px' }}>
              ❌ Scattered memory pointers = CPU cache misses = Slow for maths
            </div>
          </div>

          {/* NumPy Array */}
          <div style={{
            padding: '12px',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'var(--primary-blue-light)',
            border: '1px solid var(--primary-blue-border)'
          }}>
            <div style={{ fontSize: '12px', fontWeight: '800', color: 'var(--primary-blue-text)', marginBottom: '8px' }}>
              NumPy Array (Contiguous Block in RAM)
            </div>
            <div style={{
              display: 'flex',
              borderRadius: '4px',
              overflow: 'hidden',
              border: '2px solid var(--primary-blue)',
              marginBottom: '10px'
            }}>
              {['4.0', '3.4', '3.0', '4.1', '2.9', '5.3'].map((n, i) => (
                <div key={i} style={{
                  flex: 1,
                  padding: '10px 4px',
                  textAlign: 'center',
                  backgroundColor: i % 2 === 0 ? '#ffffff' : '#f1f5f9',
                  borderRight: i < 5 ? '1px solid var(--primary-blue-border)' : 'none',
                  fontSize: '12px',
                  fontWeight: '800',
                  color: 'var(--primary-blue)',
                  fontFamily: 'var(--font-mono)'
                }}>
                  {n}
                </div>
              ))}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--primary-blue-text)' }}>
              ✅ Contiguous 8-byte float64 in L1/L2 cache = Blazing fast SIMD vectorisation
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (visualType === 'slicing') {
    return (
      <div style={{
        backgroundColor: '#ffffff',
        border: '1.5px solid var(--border-light)',
        borderRadius: 'var(--radius-md)',
        padding: '16px 20px',
        margin: '14px 0'
      }}>
        <div style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text-main)', marginBottom: '8px' }}>
          Pictorial Mental Model: Why Slices are Views, Not Copies
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
          <div style={{
            padding: '12px',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'var(--accent-orange-light)',
            border: '1.5px solid var(--accent-orange-border)'
          }}>
            <div style={{ fontSize: '12px', fontWeight: '800', color: 'var(--accent-orange-text)', marginBottom: '6px' }}>
              ⚠️ The Slicing Trap (Memory View)
            </div>
            <pre style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#0f172a', margin: 0 }}>
{`s = exp6[:3]       # Creates a VIEW, NOT a copy
s[0] = 999
print(exp6[0])     # Prints 999! (ORIGINAL MUTATED!)`}
            </pre>
            <div style={{ fontSize: '11px', color: 'var(--accent-orange-text)', marginTop: '6px' }}>
              Slices share the exact same underlying memory block.
            </div>
          </div>

          <div style={{
            padding: '12px',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'var(--accent-green-light)',
            border: '1.5px solid var(--accent-green-border)'
          }}>
            <div style={{ fontSize: '12px', fontWeight: '800', color: 'var(--accent-green-text)', marginBottom: '6px' }}>
              ✅ Safe Independent Copy
            </div>
            <pre style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#0f172a', margin: 0 }}>
{`safe = exp6[:3].copy()  # Allocates fresh memory
safe[0] = 999
print(exp6[0])          # Prints 4.0 (ORIGINAL SAFE!)`}
            </pre>
            <div style={{ fontSize: '11px', color: 'var(--accent-green-text)', marginTop: '6px' }}>
              Always invoke <code>.copy()</code> when modifying array subsets!
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (visualType === 'mask') {
    return (
      <div style={{
        backgroundColor: '#ffffff',
        border: '1.5px solid var(--border-light)',
        borderRadius: 'var(--radius-md)',
        padding: '16px 20px',
        margin: '14px 0'
      }}>
        <div style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text-main)', marginBottom: '8px' }}>
          Filtering 162 Blank Cells using Boolean Masks
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', width: '130px', fontWeight: '600' }}>Raw Training Array:</span>
            <div style={{ display: 'flex', gap: '6px' }}>
              {['12.3', '5.0', '10.4', 'NaN', '6.2', 'NaN'].map((val, idx) => (
                <span key={idx} style={{
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '11px',
                  fontFamily: 'var(--font-mono)',
                  backgroundColor: val === 'NaN' ? 'var(--accent-orange-light)' : 'var(--bg-card-subtle)',
                  color: val === 'NaN' ? 'var(--accent-orange)' : 'var(--text-main)',
                  fontWeight: val === 'NaN' ? '800' : '500'
                }}>
                  {val}
                </span>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', width: '130px', fontWeight: '600' }}>Mask ~np.isnan():</span>
            <div style={{ display: 'flex', gap: '6px' }}>
              {['True', 'True', 'True', 'False', 'True', 'False'].map((val, idx) => (
                <span key={idx} style={{
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '11px',
                  fontFamily: 'var(--font-mono)',
                  backgroundColor: val === 'True' ? 'var(--accent-green-light)' : 'var(--bg-card-subtle)',
                  color: val === 'True' ? 'var(--accent-green-text)' : 'var(--text-light)',
                  fontWeight: '700'
                }}>
                  {val}
                </span>
              ))}
            </div>
          </div>

          <div style={{ fontSize: '12px', color: 'var(--primary-blue)', fontWeight: '700', marginTop: '6px' }}>
            Result: 5,838 complete employee rows retained without dropping full columns!
          </div>
        </div>
      </div>
    );
  }

  if (visualType === 'axis') {
    return (
      <div style={{
        backgroundColor: '#ffffff',
        border: '1.5px solid var(--border-light)',
        borderRadius: 'var(--radius-md)',
        padding: '16px 20px',
        margin: '14px 0'
      }}>
        <div style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text-main)', marginBottom: '8px' }}>
          Pictorial Mental Model: How 2D Axes Work (`axis=0` vs `axis=1`)
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '16px', alignItems: 'center' }}>
          {/* Table */}
          <div style={{
            backgroundColor: 'var(--bg-card-subtle)',
            padding: '12px',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-light)'
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', fontSize: '11px', fontFamily: 'var(--font-mono)' }}>
              <thead>
                <tr style={{ color: 'var(--text-light)', borderBottom: '1px solid var(--border-medium)' }}>
                  <th style={{ padding: '4px' }}>Employee</th>
                  <th style={{ padding: '4px', color: 'var(--primary-blue)' }}>Exp</th>
                  <th style={{ padding: '4px', color: 'var(--accent-orange)' }}>Rework</th>
                  <th style={{ padding: '4px', color: 'var(--accent-green)' }}>Score</th>
                </tr>
              </thead>
              <tbody>
                <tr><td style={{ color: 'var(--text-light)' }}>Row 0</td><td>4.0</td><td>3</td><td>56.9</td></tr>
                <tr><td style={{ color: 'var(--text-light)' }}>Row 1</td><td>3.4</td><td>5</td><td>50.6</td></tr>
                <tr><td style={{ color: 'var(--text-light)' }}>Row 2</td><td>3.0</td><td>5</td><td>67.5</td></tr>
              </tbody>
            </table>
          </div>

          {/* Arrows */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{
              padding: '10px 12px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--primary-blue-light)',
              border: '1px solid var(--primary-blue-border)'
            }}>
              <div style={{ fontSize: '12px', fontWeight: '800', color: 'var(--primary-blue-text)' }}>
                ⬇️ `axis=0` (Downwards): Squashes Rows
              </div>
              <div style={{ fontSize: '11px', color: 'var(--primary-blue-text)' }}>
                Produces 1 summary per feature column (e.g. column averages).
              </div>
            </div>

            <div style={{
              padding: '10px 12px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--accent-green-light)',
              border: '1px solid var(--accent-green-border)'
            }}>
              <div style={{ fontSize: '12px', fontWeight: '800', color: 'var(--accent-green-text)' }}>
                ➡️ `axis=1` (Across): Squashes Columns
              </div>
              <div style={{ fontSize: '11px', color: 'var(--accent-green-text)' }}>
                Produces 1 summary per employee row.
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (visualType === 'broadcasting') {
    return (
      <div style={{
        backgroundColor: '#ffffff',
        border: '1.5px solid var(--border-light)',
        borderRadius: 'var(--radius-md)',
        padding: '16px 20px',
        margin: '14px 0'
      }}>
        <div style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text-main)', marginBottom: '8px' }}>
          Broadcasting Mental Model: Standardising Features
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px',
          backgroundColor: 'var(--bg-card-subtle)',
          borderRadius: 'var(--radius-sm)',
          fontSize: '12px',
          fontFamily: 'var(--font-mono)'
        }}>
          <div>
            <div style={{ color: 'var(--primary-blue)', fontWeight: '700' }}>exp6 (shape 6,)</div>
            <div>[4.0, 3.4, 3.0, 4.1, 2.9, 5.3]</div>
          </div>
          <div style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-light)' }}>-</div>
          <div>
            <div style={{ color: 'var(--accent-orange)', fontWeight: '700' }}>mean (scalar 3.78)</div>
            <div style={{ color: 'var(--text-muted)' }}>Stretches across all 6</div>
          </div>
          <div style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-light)' }}>/</div>
          <div>
            <div style={{ color: 'var(--accent-green)', fontWeight: '700' }}>std (scalar 0.83)</div>
            <div style={{ color: 'var(--text-muted)' }}>Stretches across all 6</div>
          </div>
        </div>
        <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '8px' }}>
          Standardised Z-scores have mean = 0.0 and spread = 1.0, making years, hours, and ratings comparable!
        </div>
      </div>
    );
  }

  if (visualType === 'matrixMath') {
    return (
      <div style={{
        backgroundColor: '#ffffff',
        border: '1.5px solid var(--border-light)',
        borderRadius: 'var(--radius-md)',
        padding: '16px 20px',
        margin: '14px 0'
      }}>
        <div style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text-main)', marginBottom: '10px' }}>
          Matrix Operations: `*` (Element-wise) vs `@` (Dot Product)
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
          <div style={{ padding: '10px', borderRadius: '4px', backgroundColor: 'var(--bg-card-subtle)', border: '1px solid var(--border-light)' }}>
            <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--accent-orange)' }}>
              `A * B` (Hadamard / Item-by-Item)
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
              Multiplies cell (i, j) of A with cell (i, j) of B.
            </div>
          </div>
          <div style={{ padding: '10px', borderRadius: '4px', backgroundColor: 'var(--primary-blue-light)', border: '1px solid var(--primary-blue-border)' }}>
            <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--primary-blue)' }}>
              `A @ B` (Matrix Multiplication)
            </div>
            <div style={{ fontSize: '11px', color: 'var(--primary-blue-text)', marginTop: '4px' }}>
              Row dot product with columns. Used for <code>X @ theta</code> and <code>X.T @ X</code>.
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (visualType === 'regressionLine') {
    return (
      <div style={{
        backgroundColor: '#ffffff',
        border: '1.5px solid var(--border-light)',
        borderRadius: 'var(--radius-md)',
        padding: '16px 20px',
        margin: '14px 0'
      }}>
        <div style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text-main)', marginBottom: '8px' }}>
          The Least Squares Line: `Score = 1.88 * Experience + 53.2`
        </div>
        <div style={{
          height: '140px',
          backgroundColor: 'var(--bg-card-subtle)',
          borderRadius: 'var(--radius-sm)',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {/* Scatter dots */}
          {[
            { x: '15%', y: '70%' },
            { x: '25%', y: '60%' },
            { x: '35%', y: '50%' },
            { x: '45%', y: '42%' },
            { x: '55%', y: '46%' },
            { x: '65%', y: '32%' },
            { x: '75%', y: '25%' },
            { x: '85%', y: '20%' }
          ].map((dot, idx) => (
            <div key={idx} style={{
              position: 'absolute',
              left: dot.x,
              top: dot.y,
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: 'var(--primary-blue)'
            }} />
          ))}

          {/* Regression line */}
          <div style={{
            position: 'absolute',
            left: '10%',
            bottom: '22%',
            width: '80%',
            height: '3px',
            backgroundColor: 'var(--accent-orange)',
            transform: 'rotate(-20deg)',
            transformOrigin: 'left bottom'
          }} />

          <div style={{
            position: 'absolute',
            bottom: '10px',
            right: '16px',
            fontSize: '11px',
            fontWeight: '700',
            color: 'var(--accent-orange)'
          }}>
            Slope m = +1.88 pts/year | Intercept c = 53.2
          </div>
        </div>
      </div>
    );
  }

  if (visualType === 'lossBowl') {
    return (
      <div style={{
        backgroundColor: '#ffffff',
        border: '1.5px solid var(--border-light)',
        borderRadius: 'var(--radius-md)',
        padding: '16px 20px',
        margin: '14px 0'
      }}>
        <div style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text-main)', marginBottom: '8px' }}>
          MSE Loss Function: The 3D Error Bowl
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px',
          backgroundColor: 'var(--bg-card-subtle)',
          borderRadius: 'var(--radius-sm)'
        }}>
          <div>
            <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-main)' }}>
              MSE = Mean of (Actual - Predicted)²
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
              • High points = Large mistakes (bad parameters)<br/>
              • Bowl bottom = Least squares optimal line (m=1.88, c=53.2)<br/>
              • Normal Equation jumps straight to bottom in 1 step<br/>
              • Gradient Descent walks downhill step-by-step
            </div>
          </div>
          <div style={{
            fontSize: '36px',
            textAlign: 'center',
            padding: '10px 20px',
            borderRadius: '8px',
            backgroundColor: '#ffffff',
            border: '1px solid var(--border-light)'
          }}>
            🥣 ↘ 🎯
          </div>
        </div>
      </div>
    );
  }

  if (visualType === 'gradientDescent') {
    return (
      <div style={{
        backgroundColor: '#ffffff',
        border: '1.5px solid var(--border-light)',
        borderRadius: 'var(--radius-md)',
        padding: '16px 20px',
        margin: '14px 0'
      }}>
        <div style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text-main)', marginBottom: '10px' }}>
          The Learning Rate Experiment: Three Scenarios
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', fontSize: '12px' }}>
          <div style={{ padding: '10px', borderRadius: '4px', backgroundColor: 'var(--bg-card-subtle)', border: '1px solid var(--border-light)' }}>
            <div style={{ fontWeight: '800', color: 'var(--text-muted)' }}>lr = 0.001 (Too Small)</div>
            <div style={{ fontSize: '11px', color: 'var(--text-light)', marginTop: '4px' }}>
              Loss creeps down agonizingly slowly. Still 1,827 after 200 epochs!
            </div>
          </div>
          <div style={{ padding: '10px', borderRadius: '4px', backgroundColor: 'var(--accent-green-light)', border: '1px solid var(--accent-green-border)' }}>
            <div style={{ fontWeight: '800', color: 'var(--accent-green-text)' }}>lr = 0.1 (Just Right)</div>
            <div style={{ fontSize: '11px', color: 'var(--accent-green-text)', marginTop: '4px' }}>
              Converges smoothly to exact closed-form solution within 23 epochs!
            </div>
          </div>
          <div style={{ padding: '10px', borderRadius: '4px', backgroundColor: 'var(--accent-orange-light)', border: '1px solid var(--accent-orange-border)' }}>
            <div style={{ fontWeight: '800', color: 'var(--accent-orange-text)' }}>lr = 1.5 (Too Big)</div>
            <div style={{ fontSize: '11px', color: 'var(--accent-orange-text)', marginTop: '4px' }}>
              Steps overshoot the bowl and explode to infinity (NaN divergence)!
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (visualType === 'correlationRanking') {
    return (
      <div style={{
        backgroundColor: '#ffffff',
        border: '1.5px solid var(--border-light)',
        borderRadius: 'var(--radius-md)',
        padding: '16px 20px',
        margin: '14px 0'
      }}>
        <div style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text-main)', marginBottom: '10px' }}>
          Feature Correlation with Productivity Score (Strongest to Weakest)
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '8px', fontSize: '12px' }}>
          {[
            { name: 'rework_tickets', r: '-0.50', color: 'var(--accent-orange)' },
            { name: 'experience_years', r: '+0.48', color: 'var(--primary-blue)' },
            { name: 'absent_days', r: '-0.31', color: 'var(--accent-orange)' },
            { name: 'ai_assistant', r: '+0.30', color: 'var(--accent-green)' },
            { name: 'task_complexity', r: '-0.29', color: 'var(--accent-orange)' },
            { name: 'training_hours', r: '+0.20', color: 'var(--accent-green)' },
            { name: 'team_size', r: '+0.01', color: 'var(--text-light)' }
          ].map((item, idx) => (
            <div key={idx} style={{
              padding: '8px',
              borderRadius: '4px',
              backgroundColor: 'var(--bg-card-subtle)',
              textAlign: 'center',
              border: '1px solid var(--border-light)'
            }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{item.name}</div>
              <div style={{ fontSize: '15px', fontWeight: '800', color: item.color, fontFamily: 'var(--font-mono)' }}>
                {item.r}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (visualType === 'designMatrix') {
    return (
      <div style={{
        backgroundColor: '#ffffff',
        border: '1.5px solid var(--border-light)',
        borderRadius: 'var(--radius-md)',
        padding: '16px 20px',
        margin: '14px 0'
      }}>
        <div style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text-main)', marginBottom: '8px' }}>
          Design Matrix Structure: `X = np.column_stack([np.ones(n), F])`
        </div>
        <div style={{
          backgroundColor: '#0f172a',
          color: '#f8fafc',
          padding: '12px 16px',
          borderRadius: 'var(--radius-sm)',
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          lineHeight: '1.6',
          overflowX: 'auto'
        }}>
          <div>// Shape: (5,838 rows x 10 columns)</div>
          <div>[ [ 1.0,  exp,  train,  complexity,  ai,  rework,  absent,  team,  meetings,  blockers ],</div>
          <div>  [ 1.0,  4.0,   12.3,         3.5,   0,       3,       1,     6,      19.2,       5.6 ],</div>
          <div>  [ 1.0,  3.4,    5.0,         3.1,   0,       5,       1,     4,      16.0,       8.4 ], ... ]</div>
          <div style={{ color: '#94a3b8', marginTop: '4px' }}>
            ↑ Leading column of 1.0 carries the Intercept (76.57) automatically!
          </div>
        </div>
      </div>
    );
  }

  if (visualType === 'standardisedRanking') {
    return (
      <div style={{
        backgroundColor: '#ffffff',
        border: '1.5px solid var(--border-light)',
        borderRadius: 'var(--radius-md)',
        padding: '16px 20px',
        margin: '14px 0'
      }}>
        <div style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text-main)', marginBottom: '8px' }}>
          Standardised Weights: Score Change per 1 Workplace Standard Deviation (All 9 Features)
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {[
            { name: '1. Work Experience', val: '+4.35', color: 'var(--primary-blue)', w: '100%' },
            { name: '2. Task Complexity', val: '-3.13', color: 'var(--accent-orange)', w: '72%' },
            { name: '3. Absent Days', val: '-2.77', color: 'var(--accent-orange)', w: '64%' },
            { name: '4. Rework Tickets', val: '-2.31', color: 'var(--accent-orange)', w: '53%' },
            { name: '5. AI Assistant', val: '+2.26', color: 'var(--accent-green)', w: '52%' },
            { name: '6. Blocker Delays', val: '-1.89', color: 'var(--accent-orange)', w: '43%' },
            { name: '7. Training Hours', val: '+1.67', color: 'var(--accent-green)', w: '38%' },
            { name: '8. Meeting Overhead', val: '-1.54', color: 'var(--accent-orange)', w: '35%' },
            { name: '9. Team Size', val: '-0.07', color: 'var(--text-light)', w: '2%' }
          ].map((item, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px' }}>
              <span style={{ width: '140px', fontWeight: '600' }}>{item.name}</span>
              <div style={{ flex: 1, height: '8px', backgroundColor: 'var(--bg-card-subtle)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: item.w, height: '100%', backgroundColor: item.color, borderRadius: '4px' }} />
              </div>
              <span style={{ width: '60px', textAlign: 'right', fontWeight: '800', fontFamily: 'var(--font-mono)', color: item.color }}>
                {item.val}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (visualType === 'dropOne') {
    return (
      <div style={{
        backgroundColor: '#ffffff',
        border: '1.5px solid var(--border-light)',
        borderRadius: 'var(--radius-md)',
        padding: '16px 20px',
        margin: '14px 0'
      }}>
        <div style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text-main)', marginBottom: '8px' }}>
          The Drop-One Test: How Much Does R² Fall When Removed?
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '8px', fontSize: '12px' }}>
          {[
            { f: 'experience_years', loss: '-0.185 (Huge)', color: 'var(--accent-orange)' },
            { f: 'task_complexity', loss: '-0.093 (High)', color: 'var(--accent-orange)' },
            { f: 'absent_days', loss: '-0.092 (High)', color: 'var(--accent-orange)' },
            { f: 'ai_assistant', loss: '-0.060 (Clear)', color: 'var(--primary-blue)' },
            { f: 'rework_tickets', loss: '-0.051 (Clear)', color: 'var(--primary-blue)' },
            { f: 'training_hours', loss: '-0.034 (Small)', color: 'var(--text-muted)' },
            { f: 'team_size', loss: '0.000 (ZERO!)', color: 'var(--accent-green)' }
          ].map((item, idx) => (
            <div key={idx} style={{ padding: '8px', borderRadius: '4px', backgroundColor: 'var(--bg-card-subtle)', border: '1px solid var(--border-light)', textAlign: 'center' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{item.f}</div>
              <div style={{ fontSize: '12px', fontWeight: '800', color: item.color, marginTop: '2px' }}>
                {item.loss}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (visualType === 'luckCheck') {
    return (
      <div style={{
        backgroundColor: '#ffffff',
        border: '1.5px solid var(--border-light)',
        borderRadius: 'var(--radius-md)',
        padding: '16px 20px',
        margin: '14px 0'
      }}>
        <div style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text-main)', marginBottom: '8px' }}>
          Bootstrap Luck Check: 95% Confidence Intervals
        </div>
        <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '10px' }}>
          Team Size interval [-0.08, +0.02] crosses 0 → Effect may be pure luck!
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {[
            { f: 'experience_years', range: '[+1.80 to +1.92]', robust: true },
            { f: 'ai_assistant', range: '[+5.33 to +5.93]', robust: true },
            { f: 'task_complexity', range: '[-4.56 to -4.10]', robust: true },
            { f: 'absent_days', range: '[-2.89 to -2.60]', robust: true },
            { f: 'rework_tickets', range: '[-1.50 to -1.32]', robust: true },
            { f: 'training_hours', range: '[+0.52 to +0.61]', robust: true },
            { f: 'team_size', range: '[-0.08 to +0.02]', robust: false }
          ].map((item, idx) => (
            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', padding: '4px 8px', borderRadius: '4px', backgroundColor: item.robust ? 'var(--bg-card-subtle)' : 'var(--accent-orange-light)' }}>
              <span style={{ fontWeight: '600' }}>{item.f}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: '700', color: item.robust ? 'var(--accent-green-text)' : 'var(--accent-orange-text)' }}>
                {item.range} {item.robust ? '✅ Statistically Real' : '❌ Crosses 0 (Luck)'}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (visualType === 'assumptions') {
    return (
      <div style={{
        backgroundColor: '#ffffff',
        border: '1.5px solid var(--border-light)',
        borderRadius: 'var(--radius-md)',
        padding: '16px 20px',
        margin: '14px 0'
      }}>
        <div style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text-main)', marginBottom: '10px' }}>
          Diagnostics Summary: All 5 Assumptions Validated
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px', textAlign: 'center' }}>
          <div style={{ padding: '8px', backgroundColor: 'var(--accent-green-light)', borderRadius: '4px' }}>
            <div style={{ fontSize: '11px', color: 'var(--accent-green-text)' }}>Mean Error</div>
            <div style={{ fontSize: '15px', fontWeight: '800', color: 'var(--accent-green-text)' }}>0.000</div>
          </div>
          <div style={{ padding: '8px', backgroundColor: 'var(--accent-green-light)', borderRadius: '4px' }}>
            <div style={{ fontSize: '11px', color: 'var(--accent-green-text)' }}>Bell Curve (±2 SD)</div>
            <div style={{ fontSize: '15px', fontWeight: '800', color: 'var(--accent-green-text)' }}>95.8%</div>
          </div>
          <div style={{ padding: '8px', backgroundColor: 'var(--accent-green-light)', borderRadius: '4px' }}>
            <div style={{ fontSize: '11px', color: 'var(--accent-green-text)' }}>Equal Spread</div>
            <div style={{ fontSize: '15px', fontWeight: '800', color: 'var(--accent-green-text)' }}>5.3 vs 5.3</div>
          </div>
          <div style={{ padding: '8px', backgroundColor: 'var(--accent-green-light)', borderRadius: '4px' }}>
            <div style={{ fontSize: '11px', color: 'var(--accent-green-text)' }}>Max VIF</div>
            <div style={{ fontSize: '15px', fontWeight: '800', color: 'var(--accent-green-text)' }}>1.27 (&lt; 5)</div>
          </div>
        </div>
      </div>
    );
  }

  if (visualType === 'timeSplit') {
    return (
      <div style={{
        backgroundColor: '#ffffff',
        border: '1.5px solid var(--border-light)',
        borderRadius: 'var(--radius-md)',
        padding: '16px 20px',
        margin: '14px 0'
      }}>
        <div style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text-main)', marginBottom: '8px' }}>
          Honest Time Split: Train on Months 1–18, Test on Months 19–24
        </div>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
          <div style={{ flex: 18, height: '24px', backgroundColor: 'var(--primary-blue)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontSize: '11px', fontWeight: '700' }}>
            Months 1–18 (4,385 Train Records)
          </div>
          <div style={{ flex: 6, height: '24px', backgroundColor: 'var(--accent-green)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontSize: '11px', fontWeight: '700' }}>
            Months 19–24 (1,453 Test)
          </div>
        </div>
        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
          Test RMSE on future months is 5.3 points (demolishing the 10.4 naive baseline).
        </div>
      </div>
    );
  }

  if (visualType === 'polyfit') {
    return (
      <div style={{
        backgroundColor: '#ffffff',
        border: '1.5px solid var(--border-light)',
        borderRadius: 'var(--radius-md)',
        padding: '16px 20px',
        margin: '14px 0'
      }}>
        <div style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text-main)', marginBottom: '8px' }}>
          Underfitting vs Overfitting on 30 Records
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', fontSize: '11px', textAlign: 'center' }}>
          <div style={{ padding: '8px', borderRadius: '4px', backgroundColor: 'var(--accent-orange-light)' }}>
            <div style={{ fontWeight: '700', color: 'var(--accent-orange-text)' }}>Degree 0</div>
            <div>Train: 8.3 | Test: 9.1</div>
            <div style={{ fontWeight: '800', color: 'var(--accent-orange-text)' }}>Underfitting</div>
          </div>
          <div style={{ padding: '8px', borderRadius: '4px', backgroundColor: 'var(--accent-green-light)' }}>
            <div style={{ fontWeight: '700', color: 'var(--accent-green-text)' }}>Degree 1</div>
            <div>Train: 6.4 | Test: 8.0</div>
            <div style={{ fontWeight: '800', color: 'var(--accent-green-text)' }}>Good Fit</div>
          </div>
          <div style={{ padding: '8px', borderRadius: '4px', backgroundColor: 'var(--bg-card-subtle)' }}>
            <div style={{ fontWeight: '700' }}>Degree 2</div>
            <div>Train: 6.4 | Test: 8.0</div>
            <div style={{ color: 'var(--text-muted)' }}>No Extra Gain</div>
          </div>
          <div style={{ padding: '8px', borderRadius: '4px', backgroundColor: 'var(--accent-orange-light)' }}>
            <div style={{ fontWeight: '700', color: 'var(--accent-orange-text)' }}>Degree 5</div>
            <div>Train: 6.2 | Test: 13.5!</div>
            <div style={{ fontWeight: '800', color: 'var(--accent-orange-text)' }}>Overfitting</div>
          </div>
        </div>
      </div>
    );
  }

  if (visualType === 'ridge') {
    return (
      <div style={{
        backgroundColor: '#ffffff',
        border: '1.5px solid var(--border-light)',
        borderRadius: 'var(--radius-md)',
        padding: '16px 20px',
        margin: '14px 0'
      }}>
        <div style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text-main)', marginBottom: '8px' }}>
          Ridge Regularisation: Shrinking Large Weights
        </div>
        <div style={{
          backgroundColor: '#0f172a',
          color: '#f8fafc',
          padding: '10px 14px',
          borderRadius: 'var(--radius-sm)',
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          lineHeight: '1.6'
        }}>
          <div>Lambda 0:     [62.39, 4.35, 1.67, -3.13, 2.26, -2.31, -2.77, -0.07]</div>
          <div style={{ color: '#34d399' }}>Lambda 1000:  [62.39, 3.60, 1.44, -2.49, 1.98, -2.32, -2.36, -0.05]</div>
          <div style={{ color: '#fb923c' }}>Lambda 10000: [62.39, 1.54, 0.65, -0.96, 0.93, -1.39, -1.02, +0.01]</div>
        </div>
      </div>
    );
  }

  if (visualType === 'responsibleUse') {
    return (
      <div style={{
        backgroundColor: '#ffffff',
        border: '1.5px solid var(--border-light)',
        borderRadius: 'var(--radius-md)',
        padding: '16px 20px',
        margin: '14px 0'
      }}>
        <div style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text-main)', marginBottom: '10px' }}>
          Responsible AI Guidelines: Workplace Analytics Ethics
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', fontSize: '12px' }}>
          <div style={{ padding: '10px', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--accent-green-light)', border: '1px solid var(--accent-green-border)' }}>
            <div style={{ fontWeight: '800', color: 'var(--accent-green-text)', marginBottom: '4px' }}>
              ✅ Good Managerial Use: Support &amp; Unblock
            </div>
            <div style={{ color: 'var(--accent-green-text)' }}>
              • Identify team training needs<br/>
              • Roll out AI assistant to remove friction<br/>
              • Balance task complexity equitably
            </div>
          </div>

          <div style={{ padding: '10px', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--accent-orange-light)', border: '1px solid var(--accent-orange-border)' }}>
            <div style={{ fontWeight: '800', color: 'var(--accent-orange-text)', marginBottom: '4px' }}>
              ❌ Unethical Use: Ranking &amp; Penalising
            </div>
            <div style={{ color: 'var(--accent-orange-text)' }}>
              • Automated appraisals or pay cuts<br/>
              • Ignoring personal illness or team disruptions<br/>
              • Treating simulated regressions as absolute truth
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (visualType === 'precisionComparison') {
    return (
      <div style={{
        backgroundColor: '#ffffff',
        border: '1.5px solid var(--border-light)',
        borderRadius: 'var(--radius-md)',
        padding: '16px 20px',
        margin: '14px 0'
      }}>
        <div style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text-main)', marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
          <span>Architecture Milestone: 7-Feature Baseline vs 9-Feature Precision Model</span>
          <span className="badge badge-green" style={{ fontSize: '11px' }}>R²: 0.658 ➔ 0.755 (Gold Standard Met)</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px', fontSize: '12px' }}>
          <div style={{ padding: '12px', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--primary-blue-light)', border: '1px solid var(--primary-blue-border)' }}>
            <div style={{ fontWeight: '800', color: 'var(--primary-blue-text)', marginBottom: '6px' }}>
              📊 7 Core Technical Features (Baseline)
            </div>
            <div style={{ color: 'var(--text-main)', lineHeight: '1.5', marginBottom: '8px' }}>
              • Experience (+1.87), Training (+0.56)<br/>
              • Complexity (-4.34), AI Assistant (+5.61)<br/>
              • Rework (-1.41), Absences (-2.75), Team (-0.03)
            </div>
            <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--primary-blue-text)', borderTop: '1px solid var(--primary-blue-border)', paddingTop: '6px' }}>
              R² = 0.658 | RMSE = 5.33 pts (Leaves 34.2% friction unexplained)
            </div>
          </div>

          <div style={{ padding: '12px', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--accent-green-light)', border: '1px solid var(--accent-green-border)' }}>
            <div style={{ fontWeight: '800', color: 'var(--accent-green-text)', marginBottom: '6px' }}>
              🎯 9-Feature Precision Model (+ Friction Levers)
            </div>
            <div style={{ color: 'var(--text-main)', lineHeight: '1.5', marginBottom: '8px' }}>
              • All 7 Core Features<br/>
              • <strong>+ Meeting Overhead</strong> (-0.32 pts/hr)<br/>
              • <strong>+ Blocker Delays</strong> (-0.45 pts/hr)
            </div>
            <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--accent-green-text)', borderTop: '1px solid var(--accent-green-border)', paddingTop: '6px' }}>
              R² = 0.755 | RMSE = 4.45 pts (-16% Error, Gold Standard Met!)
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
