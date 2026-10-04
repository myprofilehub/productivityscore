import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, XCircle, Info, Sparkles, HelpCircle, BarChart3 } from 'lucide-react';

export default function InteractiveQuestionCard({ 
  item, 
  type = 'quiz', // 'quiz' or 'poll'
  facilitatorMode = false,
  onAnswered 
}) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [votes, setVotes] = useState(() => item?.initialVotes || { A: 20, B: 60, C: 15, D: 5 });

  if (!item || !item.options || !Array.isArray(item.options)) {
    return null;
  }

  const isQuiz = type === 'quiz';
  const correctAnswer = item.correctAnswer;

  const handleSelect = (optionId) => {
    if (isRevealed) return;
    setSelectedOption(optionId);
  };

  const handleReveal = () => {
    if (!selectedOption && !facilitatorMode) return;
    setIsRevealed(true);
    
    // Update poll vote counts
    if (selectedOption) {
      setVotes(prev => ({
        ...prev,
        [selectedOption]: (prev[selectedOption] || 0) + 1
      }));
    }

    // Trigger celebration if correct in quiz
    if (selectedOption === correctAnswer) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#1d4ed8', '#059669', '#ea580c']
      });
    }

    if (onAnswered) onAnswered(selectedOption);
  };

  const totalVotes = Object.values(votes).reduce((sum, v) => sum + v, 0);

  return (
    <div style={{
      backgroundColor: '#ffffff',
      border: '1px solid var(--border-light)',
      borderRadius: 'var(--radius-lg)',
      padding: '24px',
      boxShadow: 'var(--shadow-sm)',
      marginTop: '20px',
      textAlign: 'left'
    }}>
      {/* Header Badge */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className={`badge ${isQuiz ? 'badge-blue' : 'badge-orange'}`}>
            {isQuiz ? <HelpCircle size={13} /> : <BarChart3 size={13} />}
            {isQuiz ? 'Interactive Quiz' : 'Live Audience Poll'}
          </span>
          <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-main)' }}>
            {item.title}
          </span>
        </div>
        {facilitatorMode && (
          <span className="badge badge-green" style={{ fontSize: '11px' }}>
            <Sparkles size={11} /> Correct: {correctAnswer}
          </span>
        )}
      </div>

      {/* Question Text */}
      <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '16px', lineHeight: '1.4' }}>
        {item.question}
      </h3>

      {/* Options List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '18px' }}>
        {item.options.map(opt => {
          const isSelected = selectedOption === opt.id;
          const isCorrect = opt.id === correctAnswer;
          const showAnswerHighlight = isRevealed || facilitatorMode;

          let borderColor = 'var(--border-light)';
          let bgColor = 'var(--bg-card)';
          let textColor = 'var(--text-main)';

          if (showAnswerHighlight) {
            if (isCorrect) {
              borderColor = 'var(--accent-green)';
              bgColor = 'var(--accent-green-light)';
              textColor = 'var(--accent-green-text)';
            } else if (isSelected && !isCorrect) {
              borderColor = 'var(--accent-orange)';
              bgColor = 'var(--accent-orange-light)';
              textColor = 'var(--accent-orange-text)';
            }
          } else if (isSelected) {
            borderColor = 'var(--primary-blue)';
            bgColor = 'var(--primary-blue-light)';
            textColor = 'var(--primary-blue-text)';
          }

          const optVotes = votes[opt.id] || 0;
          const percentage = totalVotes > 0 ? Math.round((optVotes / totalVotes) * 100) : 0;

          return (
            <div
              key={opt.id}
              onClick={() => handleSelect(opt.id)}
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                borderRadius: 'var(--radius-md)',
                border: `1.5px solid ${borderColor}`,
                backgroundColor: bgColor,
                color: textColor,
                cursor: isRevealed ? 'default' : 'pointer',
                transition: 'all 0.15s ease',
                overflow: 'hidden'
              }}
            >
              {/* Vote Percentage Background Bar */}
              {isRevealed && (
                <div style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: `${percentage}%`,
                  backgroundColor: isCorrect ? 'rgba(5, 150, 105, 0.15)' : 'rgba(234, 88, 12, 0.10)',
                  zIndex: 1,
                  pointerEvents: 'none'
                }} />
              )}

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', zIndex: 2 }}>
                <span style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: '700',
                  backgroundColor: isSelected ? 'var(--primary-blue)' : 'var(--bg-card-subtle)',
                  color: isSelected ? '#ffffff' : 'var(--text-muted)'
                }}>
                  {opt.id}
                </span>
                <span style={{ fontSize: '14px', fontWeight: isSelected ? '600' : '500' }}>
                  {opt.text}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', zIndex: 2 }}>
                {showAnswerHighlight && (
                  <>
                    <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-light)' }}>
                      {percentage}%
                    </span>
                    {isCorrect && <CheckCircle2 size={18} color="var(--accent-green)" />}
                    {isSelected && !isCorrect && <XCircle size={18} color="var(--accent-orange)" />}
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
        <div>
          {!isRevealed ? (
            <button
              onClick={handleReveal}
              disabled={!selectedOption && !facilitatorMode}
              className="btn btn-primary btn-sm"
              style={{
                opacity: (!selectedOption && !facilitatorMode) ? 0.6 : 1,
                cursor: (!selectedOption && !facilitatorMode) ? 'not-allowed' : 'pointer'
              }}
            >
              {isQuiz ? 'Check Answer' : 'Submit Vote & Reveal Distribution'}
            </button>
          ) : (
            <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--accent-green)' }}>
              {selectedOption === correctAnswer 
                ? '🎉 Excellent! Correct answer.' 
                : `Answer: Option ${correctAnswer}`}
            </span>
          )}
        </div>

        {isRevealed && (
          <button
            onClick={() => { setIsRevealed(false); setSelectedOption(null); }}
            className="btn btn-outline btn-sm"
          >
            Reset
          </button>
        )}
      </div>

      {/* Facilitator Notes & Explanation */}
      {(isRevealed || facilitatorMode) && (
        <div style={{
          marginTop: '16px',
          padding: '14px 16px',
          borderRadius: 'var(--radius-md)',
          backgroundColor: 'var(--bg-card-subtle)',
          borderLeft: '4px solid var(--primary-blue)',
          fontSize: '13px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '700', color: 'var(--primary-blue)', marginBottom: '4px' }}>
            <Info size={15} />
            <span>Explanation & Data Intuition</span>
          </div>
          <p style={{ color: 'var(--text-muted)', lineHeight: '1.5' }}>
            {item.facilitatorNotes || item.explanation}
          </p>
          {(item.context || item.workplaceContext || item.cricketContext) && (
            <p style={{ color: 'var(--text-light)', marginTop: '6px', fontStyle: 'italic' }}>
              💡 Workplace Context: {item.context || item.workplaceContext || item.cricketContext}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
