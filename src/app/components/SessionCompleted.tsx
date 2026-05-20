import { Star, ArrowLeft, ChevronRight } from 'lucide-react';

interface SessionCompletedProps {
  username: string;
  ageGroup: string;
  onBack: () => void;
}

export function SessionCompleted({ username, ageGroup, onBack }: SessionCompletedProps) {
  const isYoung = ageGroup === 'young';

  const lessonTitle = isYoung
    ? 'Design a Logo for a Kindness Project'
    : 'Design a Logo for a Cause';

  const hostName = isYoung ? 'Mentor Priya' : 'Mentor Sarah';

  const feedbackText = isYoung
    ? `${username}, your logo was colorful, thoughtful and full of kindness. I loved how clearly you showed care through your design.`
    : `${username}, you brought creativity, empathy and strong teamwork to your logo idea. Your work can make a real difference.`;

  const nextActivity = isYoung
    ? 'Make a Kindness Poster'
    : 'Make a Kindness Campaign';

  const nextDesc = isYoung
    ? 'Create a simple poster that encourages others to be kind and helpful.'
    : 'Create a poster, short video or campaign idea to spread kindness in your community.';

  const reflectionQ1 = 'What did you learn today?';
  const reflectionQ2 = 'How did you feel after the session?';

  const tags = isYoung
    ? ['Creativity', 'Kindness', 'Teamwork']
    : ['Design', 'Teamwork', 'Empathy'];

  const emojis = ['😄', '😊', '😐', '😕', '😢'];
  const emojiLabels = ['Excited', 'Happy', 'Good', 'Okay', 'Tired'];

  const impactItems = [
    { label: 'Confidence', value: 'High', color: '#10B981' },
    { label: 'Creativity', value: 'Excellent', color: '#3B82F6' },
    { label: 'Teamwork', value: 'Great', color: '#8B5CF6' },
    { label: 'Participation', value: 'Excellent', color: '#F59E0B' }
  ];

  return (
    <div
      style={{
        animation: 'fadeIn 0.5s ease',
        fontFamily: '"Plus Jakarta Sans", sans-serif',
        padding: '40px',
        maxWidth: '1400px',
        margin: '0 auto'
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px'
        }}
      >
        <div>
          <h2
            style={{
              margin: 0,
              fontSize: '28px',
              fontWeight: '800',
              color: '#1E293B'
            }}
          >
            🎉 Session Completed!
          </h2>

          <p
            style={{
              margin: '6px 0 0',
              color: '#64748B',
              fontSize: '15px'
            }}
          >
            Amazing job, {username}! You did something meaningful today.
          </p>
        </div>

        <button
          onClick={onBack}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            borderRadius: '12px',
            border: '2px solid #E2E8F0',
            backgroundColor: 'white',
            color: '#64748B',
            fontWeight: 'bold',
            cursor: 'pointer',
            fontSize: '14px',
            transition: 'all 0.3s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#3B82F6';
            e.currentTarget.style.color = '#3B82F6';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#E2E8F0';
            e.currentTarget.style.color = '#64748B';
          }}
        >
          <ArrowLeft size={16} />
          Back to My Activities
        </button>
      </div>

      {/* Top row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '20px',
          marginBottom: '20px'
        }}
      >
        {/* Session card */}
        <div
          style={{
            background: 'linear-gradient(135deg, #3B82F6, #1D4ED8)',
            borderRadius: '24px',
            padding: '30px',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            gap: '20px'
          }}
        >
          <div style={{ fontSize: '80px', lineHeight: 1 }}>🏆</div>

          <div>
            <span
              style={{
                backgroundColor: '#EF4444',
                padding: '4px 12px',
                borderRadius: '20px',
                fontSize: '11px',
                fontWeight: 'bold'
              }}
            >
              LIVE SESSION
            </span>

            <h3
              style={{
                margin: '10px 0 6px',
                fontSize: '20px',
                fontWeight: 'bold'
              }}
            >
              {lessonTitle}
            </h3>

            <p style={{ margin: 0, opacity: 0.8, fontSize: '13px' }}>
              Creative Arts • Beginner
            </p>

            <p style={{ margin: '6px 0 0', opacity: 0.8, fontSize: '13px' }}>
              🎤 Hosted by {hostName}
            </p>

            <div
              style={{
                marginTop: '14px',
                backgroundColor: 'rgba(16,185,129,0.2)',
                border: '1px solid rgba(16,185,129,0.4)',
                borderRadius: '10px',
                padding: '8px 14px',
                fontSize: '13px',
                display: 'inline-block'
              }}
            >
              ✅ You attended the entire session. Great consistency!
            </div>
          </div>
        </div>

        {/* Badge earned */}
        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '24px',
            padding: '30px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
            textAlign: 'center'
          }}
        >
          <p
            style={{
              margin: '0 0 16px',
              fontWeight: 'bold',
              color: '#1E293B',
              fontSize: '16px'
            }}
          >
            🏅 Badge Earned
          </p>

          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #8B5CF6, #EC4899)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '36px',
              margin: '0 auto 16px'
            }}
          >
            🎨
          </div>

          <p
            style={{
              margin: '0 0 6px',
              fontWeight: 'bold',
              color: '#1E293B',
              fontSize: '17px'
            }}
          >
            Creative Explorer
          </p>

          <p
            style={{
              margin: '0 0 14px',
              color: '#64748B',
              fontSize: '13px'
            }}
          >
            Awarded for designing a unique logo and sharing your ideas.
          </p>

          <div
            style={{
              backgroundColor: '#FEF9C3',
              borderRadius: '10px',
              padding: '8px 16px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Star size={16} fill="#F59E0B" color="#F59E0B" />
            <span style={{ fontWeight: 'bold', color: '#92400E' }}>
              +20 Stars
            </span>
          </div>
        </div>
      </div>

      {/* Middle row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '20px',
          marginBottom: '20px'
        }}
      >
        {/* Host feedback */}
        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '24px',
            padding: '24px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
          }}
        >
          <p
            style={{
              margin: '0 0 16px',
              fontWeight: 'bold',
              color: '#1E293B',
              fontSize: '15px'
            }}
          >
            💬 Host Feedback
          </p>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '12px'
            }}
          >
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: '#3B82F6',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold'
              }}
            >
              {hostName.charAt(0)}
            </div>

            <div>
              <p
                style={{
                  margin: 0,
                  fontWeight: 'bold',
                  fontSize: '14px',
                  color: '#1E293B'
                }}
              >
                {hostName}
              </p>

              <p style={{ margin: 0, fontSize: '12px', color: '#64748B' }}>
                Session Host
              </p>
            </div>
          </div>

          <p
            style={{
              margin: 0,
              color: '#475569',
              fontSize: '14px',
              lineHeight: '1.6',
              fontStyle: 'italic'
            }}
          >
            “{feedbackText}”
          </p>

          <div style={{ marginTop: '14px', fontSize: '20px' }}>❤️</div>
        </div>

        {/* Reflection */}
        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '24px',
            padding: '24px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
          }}
        >
          <p
            style={{
              margin: '0 0 16px',
              fontWeight: 'bold',
              color: '#1E293B',
              fontSize: '15px'
            }}
          >
            💭 Your Reflection
          </p>

          <p
            style={{
              margin: '0 0 10px',
              fontSize: '13px',
              fontWeight: 'bold',
              color: '#475569'
            }}
          >
            1. {reflectionQ1}
          </p>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              marginBottom: '16px'
            }}
          >
            {tags.map((tag, i) => (
              <span
                key={tag}
                style={{
                  backgroundColor:
                    i === 0 ? '#EFF6FF' : i === 1 ? '#F0FDF4' : '#FFF7ED',
                  color: i === 0 ? '#3B82F6' : i === 1 ? '#10B981' : '#F59E0B',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          <p
            style={{
              margin: '0 0 10px',
              fontSize: '13px',
              fontWeight: 'bold',
              color: '#475569'
            }}
          >
            2. {reflectionQ2}
          </p>

          <div style={{ display: 'flex', gap: '10px' }}>
            {emojis.map((emoji, i) => (
              <div key={emoji} style={{ textAlign: 'center' }}>
                <div
                  style={{
                    fontSize: '22px',
                    cursor: 'pointer',
                    filter: i === 0 ? 'none' : 'grayscale(50%)'
                  }}
                >
                  {emoji}
                </div>

                <p style={{ margin: '4px 0 0', fontSize: '10px', color: '#94A3B8' }}>
                  {emojiLabels[i]}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Next activity */}
        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '24px',
            padding: '24px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
          }}
        >
          <p
            style={{
              margin: '0 0 16px',
              fontWeight: 'bold',
              color: '#1E293B',
              fontSize: '15px'
            }}
          >
            🚀 Suggested Next Activity
          </p>

          <div
            style={{
              background: 'linear-gradient(135deg, #F0F9FF, #E0F2FE)',
              borderRadius: '16px',
              padding: '16px',
              marginBottom: '16px'
            }}
          >
            <div style={{ fontSize: '30px', marginBottom: '8px' }}>📣</div>

            <p
              style={{
                margin: '0 0 6px',
                fontWeight: 'bold',
                color: '#1E293B',
                fontSize: '15px'
              }}
            >
              {nextActivity}
            </p>

            <span
              style={{
                backgroundColor: '#DCFCE7',
                color: '#16A34A',
                padding: '2px 10px',
                borderRadius: '20px',
                fontSize: '11px',
                fontWeight: 'bold'
              }}
            >
              Beginner
            </span>

            <p
              style={{
                margin: '10px 0 0',
                color: '#64748B',
                fontSize: '13px',
                lineHeight: '1.5'
              }}
            >
              {nextDesc}
            </p>

            <p style={{ margin: '8px 0 0', color: '#94A3B8', fontSize: '12px' }}>
              ⏱ 40 mins • 👤 8–12
            </p>
          </div>

          <button
            onClick={onBack}
            style={{
              width: '100%',
              padding: '12px',
              background: 'linear-gradient(135deg, #3B82F6, #1D4ED8)',
              border: 'none',
              borderRadius: '12px',
              color: 'white',
              fontWeight: 'bold',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              fontSize: '14px',
              transition: 'opacity 0.3s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.9';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '1';
            }}
          >
            Join Activity <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Bottom row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '20px',
          marginBottom: '20px'
        }}
      >
        {/* Progress */}
        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '24px',
            padding: '24px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
          }}
        >
          <p
            style={{
              margin: '0 0 16px',
              fontWeight: 'bold',
              color: '#1E293B',
              fontSize: '15px'
            }}
          >
            📈 Your Progress This Week
          </p>

          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
              <div key={day} style={{ textAlign: 'center', flex: 1 }}>
                <div
                  style={{
                    height: '40px',
                    borderRadius: '8px',
                    backgroundColor: i < 5 ? '#3B82F6' : '#E2E8F0',
                    opacity: i === 4 ? 1 : 0.5 + i * 0.1,
                    marginBottom: '6px'
                  }}
                />

                <p style={{ margin: 0, fontSize: '10px', color: '#94A3B8' }}>
                  {day}
                </p>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '20px' }}>
            <div>
              <p
                style={{
                  margin: 0,
                  fontSize: '28px',
                  fontWeight: 'bold',
                  color: '#1E293B'
                }}
              >
                5
              </p>

              <p style={{ margin: 0, fontSize: '12px', color: '#64748B' }}>
                of 7
              </p>
            </div>

            <div style={{ borderLeft: '1px solid #E2E8F0', paddingLeft: '20px' }}>
              <p style={{ margin: '0 0 4px', fontSize: '13px', color: '#64748B' }}>
                🔥 Streak: 3 days
              </p>

              <p style={{ margin: 0, fontSize: '13px', color: '#64748B' }}>
                ⭐ Best: 5 days
              </p>
            </div>
          </div>
        </div>

        {/* Impact */}
        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '24px',
            padding: '24px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
          }}
        >
          <p
            style={{
              margin: '0 0 16px',
              fontWeight: 'bold',
              color: '#1E293B',
              fontSize: '15px'
            }}
          >
            ✨ Your Impact Today
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {impactItems.map((item) => (
              <div
                key={item.label}
                style={{
                  backgroundColor: '#F8FAFC',
                  borderRadius: '12px',
                  padding: '14px',
                  borderLeft: `4px solid ${item.color}`
                }}
              >
                <p style={{ margin: '0 0 4px', fontSize: '12px', color: '#94A3B8' }}>
                  {item.label}
                </p>

                <p
                  style={{
                    margin: 0,
                    fontWeight: 'bold',
                    color: item.color,
                    fontSize: '14px'
                  }}
                >
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, #0F172A, #1E3A5F)',
          borderRadius: '24px',
          padding: '24px 30px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: 'white'
        }}
      >
        <div>
          <p
            style={{
              margin: '0 0 4px',
              fontSize: '18px',
              fontWeight: 'bold'
            }}
          >
            🌍 You make the world a better place!
          </p>

          <p style={{ margin: 0, opacity: 0.7, fontSize: '14px' }}>
            Keep learning, creating and inspiring others.
          </p>
        </div>

        <button
          onClick={onBack}
          style={{
            padding: '12px 24px',
            borderRadius: '12px',
            backgroundColor: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.2)',
            color: 'white',
            fontWeight: 'bold',
            cursor: 'pointer',
            fontSize: '14px',
            transition: 'all 0.3s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
          }}
        >
          Back to Dashboard →
        </button>
      </div>
    </div>
  );
}