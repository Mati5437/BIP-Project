import { Star, Heart, Sparkles, ArrowRight } from 'lucide-react';

interface CompletionFeedbackProps {
  activity: string;
  ageGroup: string;
  onContinue: () => void;
}

export function CompletionFeedback({ activity, ageGroup, onContinue }: CompletionFeedbackProps) {
  const badges = ageGroup === 'young' ? [
    { name: 'Kindness Champion', icon: '💚', description: 'Completed a kindness activity' },
    { name: 'Creative Thinker', icon: '🎨', description: 'Showed amazing creativity!' }
  ] : [
    { name: 'Innovation Star', icon: '💡', description: 'Created an innovative solution' },
    { name: 'Team Player', icon: '🤝', description: 'Collaborated wonderfully' }
  ];

  const suggestions = ageGroup === 'young' ? [
    { title: 'Music & Rhythm Challenge', icon: '🎵', time: '20 min' },
    { title: 'Draw Your Happy Place', icon: '🎨', time: '25 min' }
  ] : [
    { title: 'Build Your First Website', icon: '💻', time: '45 min' },
    { title: 'Design a Helpful Robot', icon: '🤖', time: '30 min' }
  ];

  return (
    <div style={{
      padding: '40px',
      maxWidth: '900px',
      margin: '0 auto',
      textAlign: 'center'
    }}>
      {/* Celebration */}
      <div style={{
        fontSize: '80px',
        marginBottom: '24px',
        animation: 'bounce 1s ease-in-out'
      }}>
        🎉
      </div>

      <h1 style={{
        fontSize: '36px',
        fontWeight: '800',
        background: 'linear-gradient(135deg, #14B8A6 0%, #3B82F6 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: '12px'
      }}>
        Amazing Work!
      </h1>

      <p style={{
        fontSize: '18px',
        color: '#64748B',
        marginBottom: '40px',
        lineHeight: '1.6'
      }}>
        You completed: <strong style={{ color: '#1E293B' }}>{activity}</strong>
      </p>

      {/* Rewards Card */}
      <div style={{
        background: 'linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 100%)',
        borderRadius: '24px',
        padding: '32px',
        marginBottom: '32px',
        border: '3px solid #FED7AA',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '-40px',
          right: '-40px',
          width: '150px',
          height: '150px',
          background: 'rgba(255,255,255,0.4)',
          borderRadius: '50%'
        }} />

        <h2 style={{
          fontSize: '20px',
          fontWeight: '700',
          color: '#1E293B',
          marginBottom: '24px',
          position: 'relative'
        }}>
          You Earned:
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '20px',
          marginBottom: '24px'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '24px',
            position: 'relative'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '8px' }}>⭐</div>
            <div style={{ fontSize: '32px', fontWeight: '800', color: '#F59E0B', marginBottom: '4px' }}>+25</div>
            <div style={{ fontSize: '14px', color: '#64748B', fontWeight: '600' }}>Care Coins</div>
          </div>

          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '24px',
            position: 'relative'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '8px' }}>🏆</div>
            <div style={{ fontSize: '32px', fontWeight: '800', color: '#10B981', marginBottom: '4px' }}>{badges.length}</div>
            <div style={{ fontSize: '14px', color: '#64748B', fontWeight: '600' }}>New Badges</div>
          </div>
        </div>

        {/* Badges */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '16px',
          position: 'relative'
        }}>
          {badges.map((badge, i) => (
            <div
              key={i}
              style={{
                background: 'white',
                borderRadius: '16px',
                padding: '20px',
                textAlign: 'left',
                border: '2px solid #FED7AA'
              }}
            >
              <div style={{
                fontSize: '40px',
                marginBottom: '8px'
              }}>
                {badge.icon}
              </div>
              <h3 style={{
                fontSize: '15px',
                fontWeight: '700',
                color: '#1E293B',
                marginBottom: '4px'
              }}>
                {badge.name}
              </h3>
              <p style={{
                fontSize: '13px',
                color: '#64748B',
                margin: 0,
                lineHeight: '1.4'
              }}>
                {badge.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Host Feedback */}
      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '28px',
        marginBottom: '32px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
        textAlign: 'left'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '16px'
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            background: 'linear-gradient(135deg, #14B8A6 0%, #06B6D4 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px'
          }}>
            👩‍🏫
          </div>
          <div>
            <p style={{ margin: 0, fontSize: '13px', color: '#64748B' }}>Message from</p>
            <p style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#1E293B' }}>Sarah Chen</p>
          </div>
        </div>
        <p style={{
          fontSize: '15px',
          color: '#64748B',
          margin: 0,
          lineHeight: '1.6',
          fontStyle: 'italic'
        }}>
          {ageGroup === 'young'
            ? '"Your kindness logo was so colorful and thoughtful! I loved how you used the heart shape to show caring. Keep spreading kindness!"'
            : '"Your product idea was innovative and practical. I especially liked how you thought about what would truly help others. Great problem-solving skills!"'}
        </p>
      </div>

      {/* Next Activities */}
      <div style={{
        textAlign: 'left',
        marginBottom: '32px'
      }}>
        <h3 style={{
          fontSize: '20px',
          fontWeight: '700',
          color: '#1E293B',
          marginBottom: '16px'
        }}>
          Try These Next:
        </h3>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '16px'
        }}>
          {suggestions.map((suggestion, i) => (
            <div
              key={i}
              style={{
                background: 'white',
                borderRadius: '16px',
                padding: '20px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                cursor: 'pointer',
                transition: 'all 0.3s',
                border: '2px solid transparent'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = '#14B8A6';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'transparent';
              }}
            >
              <div style={{ fontSize: '40px', marginBottom: '12px' }}>{suggestion.icon}</div>
              <h4 style={{
                fontSize: '15px',
                fontWeight: '700',
                color: '#1E293B',
                marginBottom: '8px'
              }}>
                {suggestion.title}
              </h4>
              <p style={{
                fontSize: '13px',
                color: '#64748B',
                margin: 0
              }}>
                {suggestion.time}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Continue Button */}
      <button
        onClick={onContinue}
        style={{
          background: 'linear-gradient(135deg, #14B8A6 0%, #06B6D4 100%)',
          color: 'white',
          border: 'none',
          borderRadius: '16px',
          padding: '18px 40px',
          fontSize: '17px',
          fontWeight: '700',
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          transition: 'all 0.3s',
          boxShadow: '0 4px 12px rgba(20, 184, 166, 0.3)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 8px 20px rgba(20, 184, 166, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(20, 184, 166, 0.3)';
        }}
      >
        Back to Dashboard
        <ArrowRight size={20} />
      </button>

      <style>
        {`
          @keyframes bounce {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-20px);
            }
          }
        `}
      </style>
    </div>
  );
}
