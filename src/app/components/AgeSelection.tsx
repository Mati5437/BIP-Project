import { Sparkles, Star, Heart } from 'lucide-react';
import { saveAgeGroup, type AgeGroup } from '../mock/mockDatabase';

interface AgeSelectionProps {
  username: string;
  onAgeSelect: (ageGroup: string) => void;
}

export function AgeSelection({ username, onAgeSelect }: AgeSelectionProps) {
  const ageGroups = [
    {
      id: 'young',
      range: '8–10 years',
      title: 'Creative Explorer',
      emoji: '🌟',
      description: 'Fun activities with stories, art, music and kindness challenges',
      icon: <Heart size={40} />,
      color: '#FF6B9D',
      gradient: 'linear-gradient(135deg, #FFF1F7 0%, #FFE5EC 100%)',
      borderColor: '#FFB3D1'
    },
    {
      id: 'teen',
      range: '10–15 years',
      title: 'Future Builder',
      emoji: '🚀',
      description: 'Learn entrepreneurship, design, coding, teamwork and real projects',
      icon: <Star size={40} />,
      color: '#14B8A6',
      gradient: 'linear-gradient(135deg, #F0FDFA 0%, #CCFBF1 100%)',
      borderColor: '#5EEAD4'
    }
  ];

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #EBF8FF 0%, #E0F2FE 50%, #FFF7ED 100%)',
      fontFamily: '"Plus Jakarta Sans", sans-serif',
      padding: '40px 20px'
    }}>
      <div style={{
        maxWidth: '900px',
        width: '100%',
        textAlign: 'center'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '24px',
          padding: '40px',
          marginBottom: '32px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.06)'
        }}>
          <div style={{
            fontSize: '56px',
            marginBottom: '16px'
          }}>
            👋
          </div>
          <h1 style={{
            fontSize: '38px',
            fontWeight: '800',
            background: 'linear-gradient(135deg, #14B8A6 0%, #3B82F6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '12px'
          }}>
            Hi, {username}!
          </h1>

          <p style={{
            fontSize: '18px',
            color: '#64748B',
            lineHeight: '1.6',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Let's find the perfect activities for you.<br />
            Which group fits you best?
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px'
        }}>
          {ageGroups.map((group) => (
            <div
              key={group.id}
              onClick={() => {
                saveAgeGroup(username, group.id as AgeGroup);
                onAgeSelect(group.id);
              }}
              style={{
                background: group.gradient,
                borderRadius: '28px',
                padding: '48px 36px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                border: `3px solid ${group.borderColor}`,
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)';
              }}
            >
              <div style={{
                fontSize: '64px',
                marginBottom: '16px',
                lineHeight: '1'
              }}>
                {group.emoji}
              </div>

              <div style={{
                backgroundColor: 'white',
                display: 'inline-block',
                padding: '10px 20px',
                borderRadius: '100px',
                marginBottom: '16px',
                fontSize: '14px',
                fontWeight: '700',
                color: group.color,
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
              }}>
                {group.range}
              </div>

              <h3 style={{
                fontSize: '26px',
                fontWeight: '800',
                color: '#1E293B',
                marginBottom: '12px'
              }}>
                {group.title}
              </h3>

              <p style={{
                color: '#475569',
                fontSize: '16px',
                lineHeight: '1.6',
                marginBottom: '24px'
              }}>
                {group.description}
              </p>

              <div style={{
                background: 'white',
                color: group.color,
                padding: '14px 28px',
                borderRadius: '14px',
                fontSize: '15px',
                fontWeight: '700',
                display: 'inline-block',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
              }}>
                Choose This
              </div>

              {/* Decorative circles */}
              <div style={{
                position: 'absolute',
                top: '-20px',
                right: '-20px',
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.3)',
                pointerEvents: 'none'
              }} />
              <div style={{
                position: 'absolute',
                bottom: '-30px',
                left: '-30px',
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.2)',
                pointerEvents: 'none'
              }} />
            </div>
          ))}
        </div>

        <p style={{
          marginTop: '32px',
          color: '#64748B',
          fontSize: '14px'
        }}>
          Don't worry, you can always change this later!
        </p>
      </div>
    </div>
  );
}
