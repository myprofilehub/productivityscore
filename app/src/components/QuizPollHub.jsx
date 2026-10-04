import React, { useState, useEffect } from 'react';
import { 
  HelpCircle, 
  BarChart3, 
  Award, 
  Sparkles, 
  CheckCircle2, 
  RotateCcw, 
  FileText, 
  BookOpen, 
  Check, 
  ChevronRight,
  Filter,
  Layers,
  Copy
} from 'lucide-react';
import { SLIDES, ASSIGNMENTS } from '../data/courseData';
import InteractiveQuestionCard from './InteractiveQuestionCard';

export default function QuizPollHub({ facilitatorMode, initialSlideIndex }) {
  // If initialSlideIndex is provided, default to that slide index (0 to 22), otherwise 'all'
  const [selectedSlide, setSelectedSlide] = useState(
    initialSlideIndex !== undefined && initialSlideIndex !== null ? String(initialSlideIndex) : 'all'
  );
  const [activeTypeFilter, setActiveTypeFilter] = useState('all'); // 'all', 'quizzes', 'polls', 'assignments'
  const [answeredScores, setAnsweredScores] = useState({});
  const [copiedTask, setCopiedTask] = useState(null);

  // Sync if initialSlideIndex prop changes
  useEffect(() => {
    if (initialSlideIndex !== undefined && initialSlideIndex !== null) {
      setSelectedSlide(String(initialSlideIndex));
    }
  }, [initialSlideIndex]);

  // Extract all questions across all 23 slides
  const allCuratedQuestions = SLIDES.flatMap((s, sIdx) => 
    (s.curatedQuestions || []).map(q => ({
      ...q,
      slideId: s.id,
      slideIndex: sIdx,
      slideTitle: s.title,
      slideBadge: s.badge,
      badgeColor: s.badgeColor,
      itemType: q.title?.toLowerCase().includes('poll') ? 'poll' : 'quiz'
    }))
  );

  // Handle score updates
  const handleScoreUpdate = (id, optionId, correct) => {
    setAnsweredScores(prev => ({
      ...prev,
      [id]: { optionId, correct }
    }));
  };

  // Reset all answered questions
  const handleResetProgress = () => {
    setAnsweredScores({});
  };

  // Copy code helper for assignments
  const handleCopyCode = (taskNum, code) => {
    navigator.clipboard?.writeText(code);
    setCopiedTask(taskNum);
    setTimeout(() => setCopiedTask(null), 2000);
  };

  // Filter questions based on slide and type
  const filteredQuestions = allCuratedQuestions.filter(q => {
    // Slide filter
    if (selectedSlide !== 'all' && q.slideIndex !== parseInt(selectedSlide, 10)) {
      return false;
    }
    // Type filter
    if (activeTypeFilter === 'quizzes' && q.itemType !== 'quiz') return false;
    if (activeTypeFilter === 'polls' && q.itemType !== 'poll') return false;
    return true;
  });

  // Calculate score stats
  const totalQuestions = allCuratedQuestions.length;
  const answeredCount = Object.keys(answeredScores).length;
  const correctCount = Object.values(answeredScores).filter(s => s.correct).length;
  const scorePercent = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px' }}>
      {/* ============================================================== */}
      {/* HEADER BANNER WITH SCORE & MASTERY METRICS                      */}
      {/* ============================================================== */}
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
        gap: '20px'
      }}>
        <div style={{ maxWidth: '750px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="badge badge-blue">
              <HelpCircle size={13} /> Curriculum Assessment Hub
            </span>
            <span className="badge badge-green">
              23 Slides • 115 Curated Questions &amp; Polls
            </span>
            {facilitatorMode && (
              <span className="badge badge-orange" style={{ fontWeight: '800' }}>
                <Sparkles size={12} /> Facilitator Key Active
              </span>
            )}
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text-main)', margin: '4px 0 8px 0' }}>
            Interactive Quiz &amp; Polls Hub
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.5', margin: 0 }}>
            Reinforce key mathematical, algorithmic, and workplace concepts. Every slide includes 5 tailored questions covering NumPy broadcasting, loss minimization, 9-feature multiple regression, standardization, and ethical deployment.
          </p>
        </div>

        {/* Global Scorecard */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          padding: '16px 20px',
          backgroundColor: '#f8fafc',
          borderRadius: 'var(--radius-md)',
          border: '1px solid #e2e8f0'
        }}>
          <div>
            <div style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>
              Mastery Score
            </div>
            <div style={{ fontSize: '22px', fontWeight: '800', color: '#1d4ed8', lineHeight: '1.2' }}>
              {correctCount} / {answeredCount} <span style={{ fontSize: '13px', fontWeight: '600', color: '#64748b' }}>Correct</span>
            </div>
            <div style={{ fontSize: '11px', color: '#059669', fontWeight: '600' }}>
              {scorePercent}% Accuracy ({answeredCount} answered)
            </div>
          </div>

          {answeredCount > 0 && (
            <button
              onClick={handleResetProgress}
              className="btn btn-outline btn-sm"
              title="Reset all quiz answers"
              style={{ fontSize: '11px', padding: '4px 8px' }}
            >
              <RotateCcw size={12} />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* ============================================================== */}
      {/* FILTER & SLIDE SELECTOR CONTROLS                                */}
      {/* ============================================================== */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-light)',
        padding: '16px 20px',
        marginBottom: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        boxShadow: 'var(--shadow-sm)'
      }}>
        {/* Row 1: Category Filter Tabs */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: '700', color: '#475569', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Filter size={13} /> View:
            </span>
            <button
              onClick={() => setActiveTypeFilter('all')}
              className={`btn btn-sm ${activeTypeFilter === 'all' ? 'btn-primary' : 'btn-outline'}`}
              style={{ padding: '4px 12px', fontSize: '12px' }}
            >
              All Checks ({allCuratedQuestions.length})
            </button>
            <button
              onClick={() => setActiveTypeFilter('quizzes')}
              className={`btn btn-sm ${activeTypeFilter === 'quizzes' ? 'btn-primary' : 'btn-outline'}`}
              style={{ padding: '4px 12px', fontSize: '12px' }}
            >
              Quizzes Only
            </button>
            <button
              onClick={() => setActiveTypeFilter('polls')}
              className={`btn btn-sm ${activeTypeFilter === 'polls' ? 'btn-primary' : 'btn-outline'}`}
              style={{ padding: '4px 12px', fontSize: '12px' }}
            >
              Classroom Polls
            </button>
            <button
              onClick={() => setActiveTypeFilter('assignments')}
              className={`btn btn-sm ${activeTypeFilter === 'assignments' ? 'btn-primary' : 'btn-outline'}`}
              style={{ padding: '4px 12px', fontSize: '12px' }}
            >
              <Award size={13} /> Take-Home Assignments Rubric (100 Marks)
            </button>
          </div>

          {/* Slide Dropdown Selector */}
          {activeTypeFilter !== 'assignments' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#475569' }}>
                Filter by Slide:
              </span>
              <select
                value={selectedSlide}
                onChange={e => setSelectedSlide(e.target.value)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  border: '1px solid #cbd5e1',
                  backgroundColor: '#ffffff',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#1e293b',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="all">🌟 All 23 Slides (115 Questions)</option>
                {SLIDES.map((s, idx) => (
                  <option key={s.id} value={idx}>
                    Slide {s.id}: {s.title} ({s.curatedQuestions?.length || 5} checks)
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Row 2: Slide Pills Scroll Bar (when not viewing assignments) */}
        {activeTypeFilter !== 'assignments' && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            overflowX: 'auto',
            paddingBottom: '4px',
            borderTop: '1px solid #f1f5f9',
            paddingTop: '10px'
          }}>
            <button
              onClick={() => setSelectedSlide('all')}
              style={{
                padding: '4px 10px',
                borderRadius: '14px',
                border: selectedSlide === 'all' ? '1.5px solid #2563eb' : '1px solid #cbd5e1',
                backgroundColor: selectedSlide === 'all' ? '#eff6ff' : '#ffffff',
                color: selectedSlide === 'all' ? '#1d4ed8' : '#475569',
                fontSize: '11px',
                fontWeight: '700',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              All Slides
            </button>

            {SLIDES.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setSelectedSlide(String(idx))}
                style={{
                  padding: '4px 10px',
                  borderRadius: '14px',
                  border: selectedSlide === String(idx) ? '1.5px solid #2563eb' : '1px solid #cbd5e1',
                  backgroundColor: selectedSlide === String(idx) ? '#eff6ff' : '#ffffff',
                  color: selectedSlide === String(idx) ? '#1d4ed8' : '#475569',
                  fontSize: '11px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
                title={s.title}
              >
                Slide {s.id}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ============================================================== */}
      {/* MAIN CONTENT AREA: QUESTIONS LIST OR ASSIGNMENT RUBRIC         */}
      {/* ============================================================== */}
      {activeTypeFilter === 'assignments' ? (
        /* Take-Home Assignments Rubric View */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {ASSIGNMENTS.map(assignment => (
            <div key={assignment.id} className="card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', borderBottom: '2px solid var(--primary-blue-light)', paddingBottom: '10px' }}>
                <div>
                  <span className="badge badge-blue" style={{ marginBottom: '6px' }}>
                    {assignment.marks} Total Marks
                  </span>
                  <h2 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text-main)', margin: '4px 0' }}>
                    {assignment.title}
                  </h2>
                </div>
                <span className="badge badge-green" style={{ fontSize: '12px' }}>
                  {assignment.format}
                </span>
              </div>

              <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '16px' }}>
                {assignment.description}
              </p>

              {/* Tasks List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {assignment.tasks.map(task => (
                  <div key={task.num} style={{
                    padding: '16px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid #e2e8f0',
                    backgroundColor: '#f8fafc'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{ fontWeight: '800', fontSize: '14px', color: 'var(--text-main)' }}>
                        Task {task.num}: {task.title}
                      </span>
                    </div>

                    <p style={{ fontSize: '13px', color: '#475569', lineHeight: '1.5', margin: '4px 0 10px 0' }}>
                      {task.desc}
                    </p>

                    {(facilitatorMode || task.solution) && (
                      <div style={{
                        marginTop: '10px',
                        padding: '10px 14px',
                        borderRadius: '6px',
                        backgroundColor: '#eff6ff',
                        border: '1px solid #bfdbfe',
                        fontSize: '12px',
                        color: '#1e40af'
                      }}>
                        <strong>Grading Benchmark / Solution:</strong> {task.solution}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Questions List */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {selectedSlide !== 'all' && (
            <div style={{
              backgroundColor: '#eff6ff',
              border: '1px solid #bfdbfe',
              padding: '12px 18px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '6px'
            }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: '800', color: '#2563eb', textTransform: 'uppercase' }}>
                  Active Slide Focus
                </span>
                <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#1e3a8a', margin: '2px 0 0 0' }}>
                  Slide {SLIDES[parseInt(selectedSlide, 10)].id}: {SLIDES[parseInt(selectedSlide, 10)].title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedSlide('all')}
                style={{
                  background: '#ffffff',
                  border: '1px solid #93c5fd',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontWeight: '700',
                  color: '#1d4ed8',
                  cursor: 'pointer'
                }}
              >
                Show All Slides (115)
              </button>
            </div>
          )}

          {filteredQuestions.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              backgroundColor: '#ffffff',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-light)'
            }}>
              <HelpCircle size={40} color="#94a3b8" style={{ marginBottom: '12px' }} />
              <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-main)' }}>
                No questions match your filter
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                Try selecting "All Slides" or clearing the type filter.
              </p>
            </div>
          ) : (
            filteredQuestions.map((q) => (
              <div key={q.id} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {/* Slide Origin Tag if viewing All Slides */}
                {selectedSlide === 'all' && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', paddingLeft: '4px' }}>
                    <span style={{
                      fontSize: '11px',
                      fontWeight: '800',
                      color: '#2563eb',
                      backgroundColor: '#eff6ff',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      border: '1px solid #bfdbfe'
                    }}>
                      Slide {q.slideId}: {q.slideTitle}
                    </span>
                  </div>
                )}

                <InteractiveQuestionCard
                  item={q}
                  type={q.itemType}
                  facilitatorMode={facilitatorMode}
                  onAnswered={(selectedOpt) => {
                    const isCorrect = q.itemType === 'poll' || selectedOpt === q.correctAnswer;
                    handleScoreUpdate(q.id, selectedOpt, isCorrect);
                  }}
                />
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
