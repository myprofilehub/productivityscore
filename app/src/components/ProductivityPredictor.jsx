import React, { useState } from 'react';
import { 
  TrendingUp, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Zap, 
  UserCheck, 
  Award,
  Clock,
  Layers
} from 'lucide-react';
import modelData from '../data/employee_models_data.json';

export default function ProductivityPredictor() {
  // 9 Total Features (7 Baseline + 2 Operational Domain Friction)
  const [experience, setExperience] = useState(4.0);
  const [training, setTraining] = useState(8.0);
  const [complexity, setComplexity] = useState(3.0);
  const [hasAI, setHasAI] = useState(false);
  const [rework, setRework] = useState(3);
  const [absent, setAbsent] = useState(1);
  const [teamSize, setTeamSize] = useState(8);

  // Merged Operational Domain Features (Option 4)
  const [meetingHours, setMeetingHours] = useState(16.0); // 0 to 40 hrs/month, mean 16h
  const [blockerHours, setBlockerHours] = useState(10.0); // 0 to 30 hrs/month, mean 10h

  // Operational friction impacts (relative to corporate benchmarks: 16h meetings, 10h blockers)
  const meetingImpact = -0.32 * (meetingHours - 16.0);
  const blockerImpact = -0.45 * (blockerHours - 10.0);

  // Multiple Linear Regression calculation (9 features)
  const rawScore = 
    66.98 +
    1.87 * experience +
    0.56 * training -
    4.34 * complexity +
    (hasAI ? 5.61 : 0) -
    1.41 * rework -
    2.75 * absent -
    0.03 * teamSize +
    meetingImpact +
    blockerImpact;

  // 7-Feature baseline score for comparison
  const baseline7RawScore = 
    66.98 +
    1.87 * experience +
    0.56 * training -
    4.34 * complexity +
    (hasAI ? 5.61 : 0) -
    1.41 * rework -
    2.75 * absent -
    0.03 * teamSize;
  const baseline7Score = Math.min(100, Math.max(0, Math.round(baseline7RawScore * 10) / 10));

  // Cap at 100
  const predictedScore = Math.min(100, Math.max(0, Math.round(rawScore * 10) / 10));
  const estimatedTasks = Math.round((predictedScore / 100) * 160);

  // Baseline guess and single-feature comparison
  const baselineScore = modelData.summary.score_mean; // 62.39
  const scoreDiffFromBaseline = Math.round((predictedScore - baselineScore) * 10) / 10;
  const singleExpScore = Math.round((1.88 * experience + 53.2) * 10) / 10;

  // Presets from Teaching Document + Operational Profiles
  const applyPreset = (presetKey) => {
    if (presetKey === 'person1') {
      // Person 1 (Module 1 & 8): Senior, 10h training, AI yes, low meeting & blocker friction
      setExperience(6.0);
      setTraining(10.0);
      setComplexity(3.0);
      setHasAI(true);
      setRework(2);
      setAbsent(1);
      setTeamSize(8);
      setMeetingHours(12.0);
      setBlockerHours(6.0);
    } else if (presetKey === 'person2') {
      // Person 2 (Module 1): Junior, high rework, high absence, heavy meeting & blocker friction
      setExperience(2.0);
      setTraining(4.0);
      setComplexity(4.0);
      setHasAI(false);
      setRework(5);
      setAbsent(3);
      setTeamSize(6);
      setMeetingHours(26.0);
      setBlockerHours(18.0);
    } else if (presetKey === 'base') {
      // Base typical employee (Module 11.5): Standard corporate averages
      setExperience(4.0);
      setTraining(8.0);
      setComplexity(3.0);
      setHasAI(false);
      setRework(3);
      setAbsent(1);
      setTeamSize(8);
      setMeetingHours(16.0);
      setBlockerHours(10.0);
    } else if (presetKey === 'performer') {
      // High Performer: Senior, protected flow state, minimal blockers
      setExperience(8.0);
      setTraining(14.0);
      setComplexity(3.5);
      setHasAI(true);
      setRework(1);
      setAbsent(0);
      setTeamSize(7);
      setMeetingHours(8.0);
      setBlockerHours(4.0);
    }
  };

  // Sensitivity Lever Helper
  const applyLever = (type) => {
    if (type === 'training') setTraining(prev => Math.min(18.7, Math.round((prev + 5.0) * 10) / 10));
    if (type === 'ai') setHasAI(prev => !prev);
    if (type === 'rework') setRework(prev => Math.max(0, prev - 2));
    if (type === 'absent') setAbsent(prev => Math.max(0, prev - 2));
    if (type === 'meeting') setMeetingHours(prev => Math.max(0, prev - 5.0));
    if (type === 'blocker') setBlockerHours(prev => Math.max(0, prev - 5.0));
    if (type === 'team') setTeamSize(prev => Math.min(12, prev + 4));
  };

  // Performance category styling
  const getCategory = (s) => {
    if (s >= 80) return { label: 'High Performer / Near Capacity', color: 'var(--accent-green)', badge: 'badge-green', icon: Award };
    if (s >= 65) return { label: 'Strong Month', color: 'var(--primary-blue)', badge: 'badge-blue', icon: CheckCircle2 };
    if (s >= 50) return { label: 'Solid Baseline Month', color: '#475569', badge: 'badge-blue', icon: UserCheck };
    return { label: 'Needs Support / High Bottlenecks', color: 'var(--accent-orange)', badge: 'badge-orange', icon: AlertCircle };
  };

  const category = getCategory(predictedScore);
  const CategoryIcon = category.icon;

  return (
    <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '24px' }}>
      {/* Top Banner */}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="badge badge-blue">
              <TrendingUp size={13} /> Multiple Linear Regression Simulator
            </span>
            <span className="badge badge-green">
              9 Full Variables (7 Core + 2 Operational)
            </span>
            <span className="badge badge-orange">
              Cap: 100 pts (160 Tasks)
            </span>
          </div>
          <h1 style={{ fontSize: '26px', fontWeight: '800', color: 'var(--text-main)', letterSpacing: '-0.02em', margin: '4px 0' }}>
            Employee Productivity Score Predictor &amp; Simulator
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', maxWidth: '850px' }}>
            Predict monthly productivity scores using NumPy multiple regression. Compare the 9-feature baseline against the Precision Regression Model.
          </p>
        </div>

        {/* Global Key Stats Pill */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          padding: '12px 22px',
          backgroundColor: '#f0fdf4',
          borderRadius: 'var(--radius-md)',
          border: '1.5px solid #86efac',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div>
            <div style={{ fontSize: '10px', fontWeight: '800', color: 'var(--text-light)', textTransform: 'uppercase' }}>
              Model R² Score
            </div>
            <div style={{ fontSize: '20px', fontWeight: '900', color: 'var(--accent-green)' }}>
              0.755{' '}
              <span style={{ fontSize: '11px', fontWeight: '700', color: '#15803d' }}>
                ★ &gt;0.75 Target Reached! (75.5%)
              </span>
            </div>
          </div>

          <div style={{ width: '1px', height: '36px', backgroundColor: 'var(--border-medium)' }} />

          <div>
            <div style={{ fontSize: '10px', fontWeight: '800', color: 'var(--text-light)', textTransform: 'uppercase' }}>
              Model RMSE
            </div>
            <div style={{ fontSize: '20px', fontWeight: '900', color: 'var(--primary-blue)' }}>
              4.45{' '}
              <span style={{ fontSize: '11px', fontWeight: '600', color: 'var(--text-light)' }}>
                vs 9.1 Base (-16% error)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Single Page Predictor & What-If Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px', alignItems: 'start' }}>
        {/* Left Column: Sliders & Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <h2 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-main)' }}>
                  Employee Profile &amp; Operational Inputs (9 Features)
                </h2>
                <p style={{ fontSize: '12px', color: 'var(--text-light)' }}>
                  Adjust technical competencies and workplace operational factors to observe predicted productivity.
                </p>
              </div>

              {/* Presets dropdown / buttons */}
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                <button 
                  onClick={() => applyPreset('person1')}
                  className="btn btn-outline btn-sm"
                  title="Person 1: Senior, 10h training, AI tool, low friction"
                >
                  Person 1 (Senior+AI)
                </button>
                <button 
                  onClick={() => applyPreset('person2')}
                  className="btn btn-outline btn-sm"
                  title="Person 2: Junior, high rework, high meetings & blockers"
                >
                  Person 2 (Stressed)
                </button>
                <button 
                  onClick={() => applyPreset('base')}
                  className="btn btn-outline btn-sm"
                  title="Typical Base Employee Corporate Average"
                >
                  Base Typical
                </button>
                <button 
                  onClick={() => applyPreset('performer')}
                  className="btn btn-outline btn-sm"
                  title="High Performer Profile with protected deep work"
                >
                  High Performer
                </button>
              </div>
            </div>

            {/* Sliders Grid: 9 Features */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* 1. Experience */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: '700', marginBottom: '4px' }}>
                  <span style={{ color: 'var(--text-main)' }}>1. Work Experience (years)</span>
                  <span style={{ color: 'var(--primary-blue)', fontFamily: 'var(--font-mono)' }}>{experience} yrs (+{(1.87 * experience).toFixed(1)} pts)</span>
                </div>
                <input 
                  type="range" 
                  min="0.5" 
                  max="14.4" 
                  step="0.1" 
                  value={experience} 
                  onChange={e => setExperience(parseFloat(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--primary-blue)' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-light)' }}>
                  <span>Junior (0.5y)</span>
                  <span>Average: 4.9y</span>
                  <span>Senior (14.4y)</span>
                </div>
              </div>

              {/* 2. Training Hours */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: '700', marginBottom: '4px' }}>
                  <span style={{ color: 'var(--text-main)' }}>2. Training Hours Attended</span>
                  <span style={{ color: 'var(--accent-green)', fontFamily: 'var(--font-mono)' }}>{training} hrs (+{(0.56 * training).toFixed(1)} pts)</span>
                </div>
                <input 
                  type="range" 
                  min="0.0" 
                  max="18.7" 
                  step="0.5" 
                  value={training} 
                  onChange={e => setTraining(parseFloat(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--accent-green)' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-light)' }}>
                  <span>0.0 hrs</span>
                  <span>Average: 8.0 hrs</span>
                  <span>18.7 hrs</span>
                </div>
              </div>

              {/* 3. Task Complexity */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: '700', marginBottom: '4px' }}>
                  <span style={{ color: 'var(--text-main)' }}>3. Task Complexity Rating (1-5)</span>
                  <span style={{ color: 'var(--accent-orange)', fontFamily: 'var(--font-mono)' }}>{complexity} ({( -4.34 * complexity ).toFixed(1)} pts)</span>
                </div>
                <input 
                  type="range" 
                  min="1.0" 
                  max="5.0" 
                  step="0.1" 
                  value={complexity} 
                  onChange={e => setComplexity(parseFloat(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--accent-orange)' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-light)' }}>
                  <span>1.0 (Very Easy)</span>
                  <span>Average: 3.1</span>
                  <span>5.0 (Very Hard)</span>
                </div>
              </div>

              {/* 4. AI Assistant Toggle */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: hasAI ? 'var(--primary-blue-light)' : 'var(--bg-card-subtle)',
                border: `1.5px solid ${hasAI ? 'var(--primary-blue-border)' : 'var(--border-light)'}`,
                transition: 'all 0.15s ease'
              }}>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-main)' }}>
                    4. AI Assistant Tool Usage
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-light)' }}>
                    Did employee use AI coding / writing assistant this month?
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '13px', fontWeight: '800', color: hasAI ? 'var(--primary-blue)' : 'var(--text-muted)' }}>
                    {hasAI ? '+5.61 pts (YES)' : '0 pts (NO)'}
                  </span>
                  <button
                    onClick={() => setHasAI(!hasAI)}
                    className={`btn btn-sm ${hasAI ? 'btn-primary' : 'btn-outline'}`}
                  >
                    {hasAI ? 'Enabled' : 'Disabled'}
                  </button>
                </div>
              </div>

              {/* 5. Rework Tickets */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: '700', marginBottom: '4px' }}>
                  <span style={{ color: 'var(--text-main)' }}>5. Rework Tickets (Sent Back)</span>
                  <span style={{ color: 'var(--accent-orange)', fontFamily: 'var(--font-mono)' }}>{rework} tickets ({( -1.41 * rework ).toFixed(1)} pts)</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="11" 
                  step="1" 
                  value={rework} 
                  onChange={e => setRework(parseInt(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--accent-orange)' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-light)' }}>
                  <span>0 tickets</span>
                  <span>Average: 2.1</span>
                  <span>11 tickets</span>
                </div>
              </div>

              {/* 6. Absent Days */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: '700', marginBottom: '4px' }}>
                  <span style={{ color: 'var(--text-main)' }}>6. Days Absent (Out of 20 workdays)</span>
                  <span style={{ color: 'var(--accent-orange)', fontFamily: 'var(--font-mono)' }}>{absent} days ({( -2.75 * absent ).toFixed(1)} pts)</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="6" 
                  step="1" 
                  value={absent} 
                  onChange={e => setAbsent(parseInt(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--accent-orange)' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-light)' }}>
                  <span>0 days</span>
                  <span>Average: 1.0</span>
                  <span>6 days</span>
                </div>
              </div>

              {/* 7. Team Size */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: '700', marginBottom: '4px' }}>
                  <span style={{ color: 'var(--text-main)' }}>7. Team Size (Number of people)</span>
                  <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{teamSize} people ({( -0.03 * teamSize ).toFixed(2)} pts)</span>
                </div>
                <input 
                  type="range" 
                  min="4" 
                  max="12" 
                  step="1" 
                  value={teamSize} 
                  onChange={e => setTeamSize(parseInt(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--text-muted)' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-light)' }}>
                  <span>4 people</span>
                  <span>Average: 7.8</span>
                  <span>12 people</span>
                </div>
              </div>

              {/* 8. Meeting Overhead Hours (Merged Option 4) */}
              <div style={{
                padding: '12px 14px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: '#f8fafc',
                border: '1.5px solid #cbd5e1'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: '700', marginBottom: '4px' }}>
                  <span style={{ color: 'var(--text-main)' }}>8. Meeting Overhead &amp; Context-Switching</span>
                  <span style={{ color: meetingImpact <= 0 ? 'var(--accent-orange)' : 'var(--accent-green)', fontFamily: 'var(--font-mono)' }}>
                    {meetingHours} hrs/mo ({meetingImpact >= 0 ? `+${meetingImpact.toFixed(1)}` : meetingImpact.toFixed(1)} pts)
                  </span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="40" 
                  step="1" 
                  value={meetingHours} 
                  onChange={e => setMeetingHours(parseFloat(e.target.value))}
                  style={{ width: '100%', accentColor: '#059669' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-light)' }}>
                  <span>0h (Deep Work Flow +5.1)</span>
                  <span>Benchmark: 16 hrs (0.0)</span>
                  <span>40h (Meeting Fatigue -7.7)</span>
                </div>
              </div>

              {/* 9. Blocker & Dependency Delay Hours (Merged Option 4) */}
              <div style={{
                padding: '12px 14px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: '#f8fafc',
                border: '1.5px solid #cbd5e1'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: '700', marginBottom: '4px' }}>
                  <span style={{ color: 'var(--text-main)' }}>9. Blocker &amp; Dependency Delay Hours</span>
                  <span style={{ color: blockerImpact <= 0 ? 'var(--accent-orange)' : 'var(--accent-green)', fontFamily: 'var(--font-mono)' }}>
                    {blockerHours} hrs/mo ({blockerImpact >= 0 ? `+${blockerImpact.toFixed(1)}` : blockerImpact.toFixed(1)} pts)
                  </span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="30" 
                  step="1" 
                  value={blockerHours} 
                  onChange={e => setBlockerHours(parseFloat(e.target.value))}
                  style={{ width: '100%', accentColor: '#ea580c' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-light)' }}>
                  <span>0h (Instant PR Merges +4.5)</span>
                  <span>Benchmark: 10 hrs (0.0)</span>
                  <span>30h (Blocked Waiting -9.0)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Sensitivity Levers */}
          <div className="card" style={{ backgroundColor: 'var(--bg-card-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <Zap size={16} color="var(--primary-blue)" />
              <h3 style={{ fontSize: '14px', fontWeight: '800', color: 'var(--text-main)' }}>
                Interactive "What-If" Sensitivity Levers
              </h3>
            </div>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '12px' }}>
              Click any lever to see how targeted workplace interventions affect productivity holding all other variables constant:
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              <button onClick={() => applyLever('training')} className="btn btn-outline btn-sm">
                +5h Training (+2.8 pts)
              </button>
              <button onClick={() => applyLever('ai')} className="btn btn-outline btn-sm">
                {hasAI ? 'Disable AI (-5.6 pts)' : 'Enable AI (+5.6 pts)'}
              </button>
              <button onClick={() => applyLever('rework')} className="btn btn-outline btn-sm">
                -2 Rework Tickets (+2.8 pts)
              </button>
              <button onClick={() => applyLever('absent')} className="btn btn-outline btn-sm">
                -2 Absent Days (+5.5 pts)
              </button>
              <button onClick={() => applyLever('meeting')} className="btn btn-outline btn-sm">
                -5h Meetings (+1.6 pts)
              </button>
              <button onClick={() => applyLever('blocker')} className="btn btn-outline btn-sm">
                -5h Blockers (+2.3 pts)
              </button>
              <button onClick={() => applyLever('team')} className="btn btn-outline btn-sm" style={{ opacity: 0.8 }}>
                +4 Team Size (-0.1 pts) ❌ No Effect
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Live Projection Card & Math Breakdown */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Live Score Hero Card */}
          <div className="card" style={{
            border: `2px solid ${category.color}`,
            boxShadow: 'var(--shadow-lg)',
            position: 'sticky',
            top: '90px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span className={`badge ${category.badge}`}>
                <CategoryIcon size={14} /> {category.label}
              </span>
              <span style={{ fontSize: '12px', color: 'var(--text-light)', fontWeight: '600' }}>
                Standard Error: ±4.4 pts
              </span>
            </div>

            {/* Big Score Display */}
            <div style={{ textAlign: 'center', margin: '14px 0 10px' }}>
              <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Predicted Productivity Score
              </div>
              <div style={{
                fontSize: '64px',
                fontWeight: '900',
                color: category.color,
                letterSpacing: '-0.03em',
                lineHeight: '1'
              }}>
                {predictedScore.toFixed(1)}
                <span style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text-light)', marginLeft: '4px' }}>
                  / 100
                </span>
              </div>

              <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-muted)', marginTop: '6px' }}>
                Equivalent to <strong>~{estimatedTasks} completed tasks</strong> this month (Full capacity: 160)
              </div>
            </div>

            {/* Score Progress Bar */}
            <div style={{
              height: '14px',
              borderRadius: '7px',
              backgroundColor: 'var(--bg-card-subtle)',
              overflow: 'hidden',
              margin: '16px 0',
              border: '1px solid var(--border-light)',
              position: 'relative'
            }}>
              <div style={{
                width: `${Math.min(100, predictedScore)}%`,
                height: '100%',
                backgroundColor: category.color,
                borderRadius: '7px',
                transition: 'width 0.3s ease'
              }} />
              {/* 62.4 Baseline marker */}
              <div style={{
                position: 'absolute',
                left: '62.4%',
                top: 0,
                bottom: 0,
                width: '2px',
                backgroundColor: '#0f172a',
                zIndex: 2
              }} title="Overall Baseline Average: 62.4" />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-light)', marginBottom: '16px' }}>
              <span>0 pts (0 tasks)</span>
              <span style={{ fontWeight: '700', color: 'var(--text-main)' }}>▲ Baseline: 62.4</span>
              <span>100 pts (160 tasks capped)</span>
            </div>

            {/* Model Precision Comparison Card */}
            <div style={{
              padding: '14px',
              backgroundColor: '#f0fdf4',
              borderRadius: 'var(--radius-md)',
              border: '1.5px solid #86efac',
              marginBottom: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '12px', fontWeight: '800', color: 'var(--text-main)' }}>
                  📊 Model Precision &amp; Explanatory Lift
                </span>
                <span className="badge badge-green" style={{ fontSize: '10px' }}>
                  ★ Target R² &gt; 0.75 Active
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '12px' }}>
                <div style={{ padding: '8px', backgroundColor: '#ffffff', borderRadius: '6px', border: '1px solid var(--border-light)' }}>
                  <div style={{ color: 'var(--text-light)', fontSize: '11px', fontWeight: '600' }}>7 Core Features Only</div>
                  <div style={{ fontWeight: '800', color: 'var(--text-main)', fontSize: '15px' }}>{baseline7Score.toFixed(1)} pts</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '11px' }}>R² = <strong>0.658</strong> | RMSE <strong>5.33</strong></div>
                </div>

                <div style={{ padding: '8px', backgroundColor: '#ffffff', borderRadius: '6px', border: '1.5px solid #86efac' }}>
                  <div style={{ color: '#16a34a', fontSize: '11px', fontWeight: '700' }}>Merged 9 Features</div>
                  <div style={{ fontWeight: '900', color: '#15803d', fontSize: '15px' }}>{predictedScore.toFixed(1)} pts</div>
                  <div style={{ color: '#16a34a', fontSize: '11px' }}>R² = <strong>0.755</strong> | RMSE <strong>4.45</strong></div>
                </div>
              </div>

              <div style={{ marginTop: '8px', fontSize: '11px', color: '#15803d', lineHeight: '1.4' }}>
                ✨ Adding <strong>Meeting Overhead</strong> &amp; <strong>Blocker Delays</strong> explains an extra <strong>+9.7% variance</strong> and reduces error by <strong>16%</strong>!
              </div>
            </div>

            {/* Exact Formula Breakdown */}
            <div style={{
              fontSize: '12px',
              fontFamily: 'var(--font-mono)',
              backgroundColor: '#0f172a',
              color: '#f8fafc',
              padding: '12px 14px',
              borderRadius: 'var(--radius-sm)',
              lineHeight: '1.6'
            }}>
              <div style={{ color: '#94a3b8', fontSize: '11px', marginBottom: '4px', fontFamily: 'var(--font-sans)', fontWeight: '700' }}>
                📐 Multiple Regression Equation Computation (9 Variables):
              </div>
              <div>Score = 66.98 (Intercept)</div>
              <div style={{ color: '#60a5fa' }}>  + 1.87 * {experience} (Exp) = +{(1.87 * experience).toFixed(1)}</div>
              <div style={{ color: '#34d399' }}>  + 0.56 * {training} (Train) = +{(0.56 * training).toFixed(1)}</div>
              <div style={{ color: '#fb923c' }}>  - 4.34 * {complexity} (Cx) = {( -4.34 * complexity ).toFixed(1)}</div>
              <div style={{ color: '#a78bfa' }}>  + 5.61 * {hasAI ? 1 : 0} (AI) = +{(hasAI ? 5.61 : 0).toFixed(1)}</div>
              <div style={{ color: '#f87171' }}>  - 1.41 * {rework} (Rework) = {( -1.41 * rework ).toFixed(1)}</div>
              <div style={{ color: '#f87171' }}>  - 2.75 * {absent} (Absent) = {( -2.75 * absent ).toFixed(1)}</div>
              <div style={{ color: '#94a3b8' }}>  - 0.03 * {teamSize} (Team) = {( -0.03 * teamSize ).toFixed(2)}</div>
              <div style={{ color: '#4ade80' }}>  - 0.32 * ({meetingHours}-16) [Meeting Drag] = {meetingImpact >= 0 ? `+${meetingImpact.toFixed(1)}` : meetingImpact.toFixed(1)}</div>
              <div style={{ color: '#fbbf24' }}>  - 0.45 * ({blockerHours}-10) [Blocker Drag] = {blockerImpact >= 0 ? `+${blockerImpact.toFixed(1)}` : blockerImpact.toFixed(1)}</div>
              
              <div style={{ borderTop: '1px solid #334155', marginTop: '6px', paddingTop: '4px', color: '#f1f5f9', fontWeight: '700' }}>
                = {predictedScore.toFixed(1)} {predictedScore >= 100 ? '(Capped at 100.0)' : ''}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
