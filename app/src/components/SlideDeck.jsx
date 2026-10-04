import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Copy, 
  Check, 
  Sparkles, 
  Clock, 
  BookOpen, 
  HelpCircle,
  BarChart3,
  Maximize2
} from 'lucide-react';
import { SLIDES, QUIZZES, POLLS } from '../data/courseData';
import InteractiveQuestionCard from './InteractiveQuestionCard';
import SlideVisual from './SlideVisuals';

export default function SlideDeck({ facilitatorMode }) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [copiedCode, setCopiedCode] = useState(false);
  const [showSpeakerNotes, setShowSpeakerNotes] = useState(false);

  const currentSlide = SLIDES[currentSlideIndex];
  const totalSlides = SLIDES.length;

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 'ArrowRight' || e.key === ' ') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlideIndex]);

  const nextSlide = () => {
    if (currentSlideIndex < totalSlides - 1) {
      setCurrentSlideIndex(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(prev => prev - 1);
    }
  };

  const handleCopyCode = (codeText) => {
    navigator.clipboard.writeText(codeText);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Find linked quiz or poll
  const linkedQuiz = currentSlide.quizId ? QUIZZES.find(q => q.id === currentSlide.quizId) : null;
  const linkedPoll = currentSlide.pollId ? POLLS.find(p => p.id === currentSlide.pollId) : null;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
      {/* Slide Navigation Header Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '16px',
        backgroundColor: '#ffffff',
        padding: '12px 20px',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-light)',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span className={`badge ${currentSlide.badgeColor === 'orange' ? 'badge-orange' : currentSlide.badgeColor === 'green' ? 'badge-green' : 'badge-blue'}`}>
            {currentSlide.badge}
          </span>
          <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-light)' }}>
            Module {currentSlide.module} • Slide {currentSlideIndex + 1} of {totalSlides}
          </span>
        </div>

        {/* Progress Dots / Slider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {SLIDES.map((s, idx) => (
            <div
              key={s.id}
              onClick={() => setCurrentSlideIndex(idx)}
              style={{
                width: idx === currentSlideIndex ? '28px' : '8px',
                height: '8px',
                borderRadius: '4px',
                backgroundColor: idx === currentSlideIndex ? 'var(--primary-blue)' : 'var(--border-medium)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              title={`Go to Slide ${idx + 1}: ${s.title}`}
            />
          ))}
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => setShowSpeakerNotes(!showSpeakerNotes)}
            className="btn btn-outline btn-sm"
            style={{
              backgroundColor: showSpeakerNotes || facilitatorMode ? 'var(--primary-blue-light)' : '#ffffff',
              color: showSpeakerNotes || facilitatorMode ? 'var(--primary-blue)' : 'var(--text-muted)',
              borderColor: showSpeakerNotes || facilitatorMode ? 'var(--primary-blue-border)' : 'var(--border-medium)'
            }}
          >
            <BookOpen size={14} />
            <span>Facilitator Talking Points</span>
          </button>

          <button
            onClick={prevSlide}
            disabled={currentSlideIndex === 0}
            className="btn btn-outline btn-sm"
            style={{ opacity: currentSlideIndex === 0 ? 0.4 : 1 }}
          >
            <ChevronLeft size={16} />
            <span>Prev</span>
          </button>

          <button
            onClick={nextSlide}
            disabled={currentSlideIndex === totalSlides - 1}
            className="btn btn-primary btn-sm"
            style={{ opacity: currentSlideIndex === totalSlides - 1 ? 0.4 : 1 }}
          >
            <span>Next</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Main Slide Card */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-light)',
        boxShadow: 'var(--shadow-md)',
        padding: '36px',
        minHeight: '520px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}>
        <div>
          {/* Slide Title */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', borderBottom: '2px solid var(--primary-blue-light)', paddingBottom: '12px' }}>
            <h2 style={{
              fontSize: '22px',
              fontWeight: '800',
              color: 'var(--text-main)',
              margin: 0
            }}>
              {currentSlide.title}
            </h2>
            {currentSlide.duration && (
              <span className="badge badge-blue" style={{ fontSize: '12px' }}>
                <Clock size={12} /> {currentSlide.duration}
              </span>
            )}
          </div>

          {/* Slide Content Blocks */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {currentSlide.content.map((block, idx) => {
              if (block.type === 'lead') {
                return (
                  <p key={idx} style={{
                    fontSize: '16px',
                    lineHeight: '1.6',
                    color: 'var(--text-muted)',
                    fontWeight: '500'
                  }}>
                    {block.text}
                  </p>
                );
              }

              if (block.type === 'grid') {
                return (
                  <div key={idx} style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '16px'
                  }}>
                    {block.items.map((item, i) => {
                      const borderColor = item.color === 'orange' ? 'var(--accent-orange-border)' :
                                          item.color === 'green' ? 'var(--accent-green-border)' :
                                          'var(--primary-blue-border)';
                      const bgColor = item.color === 'orange' ? 'var(--accent-orange-light)' :
                                      item.color === 'green' ? 'var(--accent-green-light)' :
                                      'var(--primary-blue-light)';
                      const titleColor = item.color === 'orange' ? 'var(--accent-orange-text)' :
                                         item.color === 'green' ? 'var(--accent-green-text)' :
                                         'var(--primary-blue-text)';

                      return (
                        <div key={i} style={{
                          padding: '18px 20px',
                          borderRadius: 'var(--radius-md)',
                          border: `1.5px solid ${borderColor}`,
                          backgroundColor: bgColor
                        }}>
                          <div style={{ fontSize: '13px', fontWeight: '700', color: titleColor, marginBottom: '6px' }}>
                            {item.title}
                          </div>
                          <div style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text-main)', marginBottom: '6px' }}>
                            {item.text}
                          </div>
                          {item.subtext && (
                            <div style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                              {item.subtext}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              }

              if (block.type === 'code') {
                return (
                  <div key={idx} style={{ position: 'relative' }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      backgroundColor: '#1e293b',
                      padding: '8px 16px',
                      borderTopLeftRadius: 'var(--radius-md)',
                      borderTopRightRadius: 'var(--radius-md)',
                      color: '#94a3b8',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}>
                      <span>Python / NumPy Code</span>
                      <button
                        onClick={() => handleCopyCode(block.code)}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: '#e2e8f0',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontSize: '12px'
                        }}
                      >
                        {copiedCode ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                        <span>{copiedCode ? 'Copied!' : 'Copy'}</span>
                      </button>
                    </div>
                    <pre style={{
                      backgroundColor: '#0f172a',
                      color: '#f8fafc',
                      padding: '16px',
                      borderBottomLeftRadius: 'var(--radius-md)',
                      borderBottomRightRadius: 'var(--radius-md)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '13.5px',
                      lineHeight: '1.6',
                      overflowX: 'auto',
                      margin: 0
                    }}>
                      <code>{block.code}</code>
                    </pre>
                  </div>
                );
              }

              if (block.type === 'example') {
                return (
                  <div key={idx} style={{
                    padding: '16px 20px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-card-subtle)',
                    border: '1px solid var(--border-medium)'
                  }}>
                    <div style={{ fontSize: '13.5px', fontWeight: '800', color: 'var(--text-main)', marginBottom: '8px' }}>
                      💡 {block.title}
                    </div>
                    <ul style={{ paddingLeft: '20px', fontSize: '13.5px', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>
                      {block.steps.map((st, sidx) => (
                        <li key={sidx}>{st}</li>
                      ))}
                    </ul>
                  </div>
                );
              }

              if (block.type === 'callout') {
                return (
                  <div key={idx} style={{
                    padding: '16px 20px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: block.color === 'orange' ? 'var(--accent-orange-light)' :
                                     block.color === 'green' ? 'var(--accent-green-light)' :
                                     'var(--primary-blue-light)',
                    borderLeft: `4px solid ${block.color === 'orange' ? 'var(--accent-orange)' : block.color === 'green' ? 'var(--accent-green)' : 'var(--primary-blue)'}`
                  }}>
                    <div style={{ fontWeight: '700', fontSize: '14px', color: 'var(--text-main)', marginBottom: '4px' }}>
                      {block.title}
                    </div>
                    <div style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                      {block.text}
                    </div>
                  </div>
                );
              }

              if (block.type === 'visual') {
                return <SlideVisual key={idx} visualType={block.visualType} type={block.visualType} />;
              }

              return null;
            })}
          </div>

          {/* Embedded Poll or Quiz */}
          {linkedQuiz && (
            <InteractiveQuestionCard
              item={linkedQuiz}
              type="quiz"
              facilitatorMode={facilitatorMode}
            />
          )}

          {linkedPoll && (
            <InteractiveQuestionCard
              item={linkedPoll}
              type="poll"
              facilitatorMode={facilitatorMode}
            />
          )}
        </div>

        {/* Facilitator Notes Box */}
        {(showSpeakerNotes || facilitatorMode) && currentSlide.facilitatorNotes && (
          <div style={{
            marginTop: '28px',
            padding: '16px 20px',
            backgroundColor: '#fffbeb',
            border: '1.5px solid #fde68a',
            borderRadius: 'var(--radius-md)',
            color: '#92400e',
            fontSize: '13px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '800', marginBottom: '6px' }}>
              <Clock size={15} />
              <span>Facilitator Delivery Guide &amp; Classroom Notes:</span>
            </div>
            <p style={{ lineHeight: '1.6', margin: 0 }}>
              {currentSlide.facilitatorNotes}
            </p>
          </div>
        )}
      </div>

      {/* Bottom Navigation Shortcut Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: '16px',
        color: 'var(--text-light)',
        fontSize: '12px'
      }}>
        <span>💡 Tip: Use Left / Right arrow keys on your keyboard to navigate slides</span>
        <span>NumPy Basics &amp; Linear Regression • Employee Productivity Score Predictor</span>
      </div>
    </div>
  );
}
