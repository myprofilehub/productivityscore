import React from 'react';
import { 
  Columns3, 
  TrendingUp, 
  HelpCircle,
  Sparkles,
  Users,
  GraduationCap,
  Presentation,
  Terminal
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, facilitatorMode, setFacilitatorMode }) {
  const navItems = [
    { id: 'classroom', label: 'Slide Deck Masterclass', icon: Presentation, badge: '23 Slides' },
    { id: 'notebook', label: 'Notebook Runner', icon: Terminal, badge: '.ipynb Runner' },
    { id: 'predictor', label: 'Productivity Predictor & Lab', icon: TrendingUp, badge: '9 Features' },
    { id: 'quizzes', label: 'Quiz & Polls', icon: HelpCircle, badge: '115 Curated Checks' }
  ];

  return (
    <header style={{
      backgroundColor: '#ffffff',
      borderBottom: '1px solid var(--border-light)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      boxShadow: 'var(--shadow-sm)'
    }}>
      <div style={{
        maxWidth: '1800px',
        margin: '0 auto',
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '70px',
        gap: '16px'
      }}>
        {/* Brand / Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, var(--primary-blue), #2563eb)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            boxShadow: '0 4px 10px rgba(29, 78, 216, 0.3)'
          }}>
            <Users size={22} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '17px', fontWeight: '800', color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
                Employee Productivity Predictor
              </span>
              <span className="badge badge-blue" style={{ fontSize: '11px', padding: '2px 8px' }}>
                NumPy &amp; ML
              </span>
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-light)', fontWeight: '500' }}>
              2-Hour Corporate Fresher Training • 3-Pane Interactive Learning Environment
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '9px 16px',
                  borderRadius: 'var(--radius-md)',
                  border: isActive ? '1px solid var(--primary-blue-border)' : '1px solid transparent',
                  backgroundColor: isActive ? 'var(--primary-blue-light)' : 'transparent',
                  color: isActive ? 'var(--primary-blue)' : 'var(--text-muted)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '13.5px',
                  fontWeight: isActive ? '700' : '600',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <Icon size={17} color={isActive ? 'var(--primary-blue)' : 'var(--text-light)'} />
                <span>{item.label}</span>
                {item.badge && (
                  <span style={{
                    fontSize: '10.5px',
                    padding: '2px 7px',
                    borderRadius: '10px',
                    backgroundColor: isActive ? 'var(--primary-blue)' : 'var(--bg-card-subtle)',
                    color: isActive ? '#ffffff' : 'var(--text-light)'
                  }}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Facilitator Mode Switch */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            onClick={() => setFacilitatorMode(!facilitatorMode)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 12px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: facilitatorMode ? 'var(--accent-orange-light)' : 'var(--bg-card-subtle)',
              border: `1.5px solid ${facilitatorMode ? 'var(--accent-orange-border)' : 'var(--border-light)'}`,
              cursor: 'pointer',
              userSelect: 'none',
              transition: 'all 0.2s ease'
            }}
            title="Toggle Facilitator Mode: reveals quiz answers, delivery talking points, and benchmark solutions"
          >
            <Sparkles size={14} color={facilitatorMode ? 'var(--accent-orange)' : 'var(--text-light)'} />
            <span style={{
              fontSize: '12px',
              fontWeight: '700',
              color: facilitatorMode ? 'var(--accent-orange-text)' : 'var(--text-muted)'
            }}>
              Facilitator Mode: {facilitatorMode ? 'ON' : 'OFF'}
            </span>
            <div style={{
              width: '28px',
              height: '16px',
              borderRadius: '8px',
              backgroundColor: facilitatorMode ? 'var(--accent-orange)' : '#cbd5e1',
              position: 'relative',
              transition: 'background-color 0.2s ease'
            }}>
              <div style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: '#ffffff',
                position: 'absolute',
                top: '2px',
                left: facilitatorMode ? '14px' : '2px',
                transition: 'left 0.2s ease'
              }} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
