import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  RotateCcw, 
  Terminal, 
  BookOpen, 
  HelpCircle, 
  Clock, 
  Code2,
  Copy,
  Check
} from 'lucide-react';
import { SLIDES, CODE_TEMPLATES } from '../data/courseData';
import SlideVisual from './SlideVisuals';

export default function ClassroomWorkspace({ facilitatorMode, onNavigateToQuizzes, onNavigateToNotebook }) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [showFacilitatorNotes, setShowFacilitatorNotes] = useState(false);
  const [copiedCodeIdx, setCopiedCodeIdx] = useState(null);

  const currentSlide = SLIDES[currentSlideIndex] || SLIDES[0];
  const totalSlides = SLIDES.length;

  // Slide navigation
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

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlideIndex]);

  return (
    <div style={{ padding: '20px 24px', maxWidth: '1280px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* Slide Navigation Header */}
          <div className="card" style={{ padding: '12px 16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className={`badge ${currentSlide.badgeColor === 'orange' ? 'badge-orange' : currentSlide.badgeColor === 'green' ? 'badge-green' : 'badge-blue'}`}>
                  {currentSlide.badge}
                </span>
                <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-light)' }}>
                  Slide {currentSlideIndex + 1} of {totalSlides}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <button
                  onClick={prevSlide}
                  disabled={currentSlideIndex === 0}
                  className="btn btn-outline btn-sm"
                  style={{ opacity: currentSlideIndex === 0 ? 0.4 : 1 }}
                >
                  <ChevronLeft size={14} />
                  <span>Prev</span>
                </button>
                <button
                  onClick={nextSlide}
                  disabled={currentSlideIndex === totalSlides - 1}
                  className="btn btn-primary btn-sm"
                  style={{ opacity: currentSlideIndex === totalSlides - 1 ? 0.4 : 1 }}
                >
                  <span>Next</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>

            {/* Micro Progress Bar Slider */}
            <div style={{ display: 'flex', gap: '3px', alignItems: 'center' }}>
              {SLIDES.map((s, idx) => (
                <div
                  key={s.id}
                  onClick={() => setCurrentSlideIndex(idx)}
                  style={{
                    flex: 1,
                    height: idx === currentSlideIndex ? '8px' : '5px',
                    borderRadius: '3px',
                    backgroundColor: idx === currentSlideIndex ? 'var(--primary-blue)' : idx < currentSlideIndex ? '#93c5fd' : '#e2e8f0',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                  title={`Slide ${idx + 1}: ${s.title}`}
                />
              ))}
            </div>
          </div>

          {/* Main Slide Card */}
          <div className="card" style={{ minHeight: '620px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              {/* Slide Title & Topic Sub-Header */}
              <div style={{ borderBottom: '2px solid var(--primary-blue-light)', paddingBottom: '12px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '6px' }}>
                  <h2 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-main)', lineHeight: '1.3' }}>
                    {currentSlide.title}
                  </h2>
                  <span className="badge badge-blue" style={{ fontSize: '11px', flexShrink: 0 }}>
                    <Clock size={11} /> {currentSlide.duration}
                  </span>
                </div>

                {/* 2-Topic Badges */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '6px' }}>
                  {currentSlide.topic1 && (
                    <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--primary-blue-text)', backgroundColor: 'var(--primary-blue-light)', padding: '2px 8px', borderRadius: '4px' }}>
                      Topic 1: {currentSlide.topic1}
                    </span>
                  )}
                  {currentSlide.topic2 && (
                    <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--accent-green-text)', backgroundColor: 'var(--accent-green-light)', padding: '2px 8px', borderRadius: '4px' }}>
                      Topic 2: {currentSlide.topic2}
                    </span>
                  )}
                </div>
              </div>

              {/* Slide Body Elements */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {currentSlide.content.map((block, idx) => {
                  if (block.type === 'lead') {
                    return (
                      <p key={idx} style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--text-muted)' }}>
                        {block.text}
                      </p>
                    );
                  }

                  if (block.type === 'grid') {
                    return (
                      <div key={idx} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        {block.items.map((item, i) => (
                          <div key={i} style={{
                            padding: '12px 14px',
                            borderRadius: 'var(--radius-sm)',
                            border: `1.5px solid ${item.color === 'orange' ? 'var(--accent-orange-border)' : item.color === 'green' ? 'var(--accent-green-border)' : 'var(--primary-blue-border)'}`,
                            backgroundColor: item.color === 'orange' ? 'var(--accent-orange-light)' : item.color === 'green' ? 'var(--accent-green-light)' : 'var(--primary-blue-light)'
                          }}>
                            <div style={{ fontSize: '11px', fontWeight: '800', color: item.color === 'orange' ? 'var(--accent-orange-text)' : item.color === 'green' ? 'var(--accent-green-text)' : 'var(--primary-blue-text)' }}>
                              {item.title}
                            </div>
                            <div style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text-main)', margin: '4px 0' }}>
                              {item.text}
                            </div>
                            <div style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                              {item.subtext}
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  }

                  if (block.type === 'example') {
                    return (
                      <div key={idx} style={{
                        padding: '12px 14px',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: 'var(--bg-card-subtle)',
                        border: '1px solid var(--border-medium)'
                      }}>
                        <div style={{ fontSize: '12px', fontWeight: '800', color: 'var(--text-main)', marginBottom: '6px' }}>
                          💡 {block.title}
                        </div>
                        <ul style={{ paddingLeft: '18px', fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>
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
                        padding: '12px 14px',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: block.color === 'orange' ? 'var(--accent-orange-light)' : block.color === 'green' ? 'var(--accent-green-light)' : 'var(--primary-blue-light)',
                        borderLeft: `4px solid ${block.color === 'orange' ? 'var(--accent-orange)' : block.color === 'green' ? 'var(--accent-green)' : 'var(--primary-blue)'}`
                      }}>
                        <div style={{ fontWeight: '800', fontSize: '12px', color: 'var(--text-main)', marginBottom: '3px' }}>
                          {block.title}
                        </div>
                        <div style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                          {block.text}
                        </div>
                      </div>
                    );
                  }

                  if (block.type === 'code') {
                    return (
                      <div key={idx} style={{
                        borderRadius: 'var(--radius-md)',
                        overflow: 'hidden',
                        border: '1px solid var(--border-medium)',
                        backgroundColor: '#0f172a',
                        marginTop: '4px'
                      }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          backgroundColor: '#1e293b',
                          padding: '6px 12px',
                          color: '#94a3b8',
                          fontSize: '11px',
                          fontWeight: '700'
                        }}>
                          <span>{block.title || 'Scikit-Learn Implementation'}</span>
                          <button
                            onClick={() => {
                              navigator.clipboard?.writeText(block.code);
                              setCopiedCodeIdx(idx);
                              setTimeout(() => setCopiedCodeIdx(null), 2000);
                            }}
                            className="btn btn-outline btn-sm"
                            style={{
                              padding: '2px 8px',
                              fontSize: '10px',
                              height: '22px',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px',
                              backgroundColor: copiedCodeIdx === idx ? '#065f46' : 'rgba(255,255,255,0.08)',
                              borderColor: copiedCodeIdx === idx ? '#10b981' : 'rgba(255,255,255,0.2)',
                              color: copiedCodeIdx === idx ? '#34d399' : '#e2e8f0'
                            }}
                            title="Copy Python code to clipboard"
                          >
                            {copiedCodeIdx === idx ? (
                              <>
                                <Check size={10} color="#34d399" />
                                <span>Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy size={10} />
                                <span>Copy Code</span>
                              </>
                            )}
                          </button>
                        </div>
                        <pre style={{
                          margin: 0,
                          padding: '10px 12px',
                          color: '#38bdf8',
                          fontSize: '11px',
                          lineHeight: '1.5',
                          overflowX: 'auto',
                          fontFamily: 'Consolas, Monaco, monospace'
                        }}>
                          <code>{block.code}</code>
                        </pre>
                      </div>
                    );
                  }

                  if (block.type === 'visual') {
                    return <SlideVisual key={idx} visualType={block.visualType} type={block.visualType} />;
                  }

                  return null;
                })}
              </div>
            </div>

            {/* Facilitator Talking Points Footer */}
            <div style={{ marginTop: '18px', borderTop: '1px solid var(--border-light)', paddingTop: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <button
                  onClick={() => setShowFacilitatorNotes(!showFacilitatorNotes)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--primary-blue)',
                    fontSize: '12px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <BookOpen size={13} />
                  <span>{showFacilitatorNotes || facilitatorMode ? 'Hide Facilitator Guide' : 'Show Facilitator Delivery Guide'}</span>
                </button>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {onNavigateToQuizzes && (
                    <button
                      onClick={() => onNavigateToQuizzes(currentSlideIndex)}
                      style={{
                        background: 'var(--primary-blue-light)',
                        border: '1px solid var(--primary-blue-border)',
                        borderRadius: '6px',
                        color: 'var(--primary-blue-text)',
                        fontSize: '11px',
                        fontWeight: '700',
                        padding: '5px 12px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px'
                      }}
                      title="Open interactive quizzes & polls for this slide in the Quiz & Polls tab"
                    >
                      <HelpCircle size={13} />
                      <span>Take Slide {currentSlideIndex + 1} Quiz ({currentSlide.curatedQuestions?.length || 5}) →</span>
                    </button>
                  )}
                  {onNavigateToNotebook && (
                    <button
                      onClick={onNavigateToNotebook}
                      style={{
                        background: '#fef3c7',
                        border: '1px solid #fde68a',
                        borderRadius: '6px',
                        color: '#92400e',
                        fontSize: '11px',
                        fontWeight: '700',
                        padding: '5px 12px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px'
                      }}
                      title="Open dedicated Notebook Runner tab"
                    >
                      <Terminal size={13} color="#d97706" />
                      <span>Open in Notebook Runner →</span>
                    </button>
                  )}
                  <span style={{ fontSize: '11px', color: 'var(--text-light)' }}>
                    Use keyboard ← / → to switch slides
                  </span>
                </div>
              </div>

              {(showFacilitatorNotes || facilitatorMode) && currentSlide.facilitatorNotes && (
                <div style={{
                  marginTop: '10px',
                  padding: '10px 14px',
                  backgroundColor: '#fffbeb',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid #fde68a',
                  fontSize: '12px',
                  color: '#92400e',
                  lineHeight: '1.5'
                }}>
                  <strong>Facilitator Talking Points:</strong> {currentSlide.facilitatorNotes}
                </div>
              )}
            </div>
          </div>
        </div>
    </div>
  );
}
