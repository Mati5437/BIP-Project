import { type CSSProperties } from 'react';
import { Sparkles, Star, Heart } from 'lucide-react';
import { saveAgeGroup, type AgeGroup } from '../mock/mockDatabase';

interface AgeSelectionProps {
  username: string;
  onAgeSelect: (ageGroup: 'young' | 'teen' | 'advanced') => void;
}

const theme = {
  blue: '#3B82F6',
  aqua: '#3BE0F6',
  mint: '#1BF5A9',
  navy: '#102A56',
  text: '#1E293B',
  muted: '#64748B',
  pageBg: 'linear-gradient(135deg, #F7FBFF 0%, #EEF9FF 45%, #F3FFFA 100%)',
  primaryGradient: 'linear-gradient(135deg, #3B82F6 0%, #3BE0F6 100%)',
  glassGradient:
    'linear-gradient(135deg, rgba(255,255,255,0.86) 0%, rgba(247,252,255,0.74) 100%)',
  calmGradient:
    'linear-gradient(135deg, rgba(238,247,255,0.96) 0%, rgba(233,252,255,0.92) 52%, rgba(236,255,248,0.9) 100%)'
};

const backgroundAnimations = `
  @keyframes meshShift {
    0% {
      transform: scale(1) translate3d(0, 0, 0);
      opacity: 0.48;
    }
    50% {
      transform: scale(1.08) translate3d(18px, -12px, 0);
      opacity: 0.72;
    }
    100% {
      transform: scale(1) translate3d(0, 0, 0);
      opacity: 0.48;
    }
  }

  @keyframes blobDriftOne {
    0% {
      transform: translate3d(0, 0, 0) scale(1) rotate(0deg);
      border-radius: 45% 55% 60% 40% / 42% 44% 56% 58%;
    }
    25% {
      transform: translate3d(55px, 25px, 0) scale(1.08) rotate(6deg);
      border-radius: 58% 42% 48% 52% / 54% 38% 62% 46%;
    }
    50% {
      transform: translate3d(20px, 65px, 0) scale(1.14) rotate(12deg);
      border-radius: 40% 60% 44% 56% / 63% 38% 62% 37%;
    }
    75% {
      transform: translate3d(-28px, 35px, 0) scale(1.05) rotate(4deg);
      border-radius: 52% 48% 61% 39% / 40% 61% 39% 60%;
    }
    100% {
      transform: translate3d(0, 0, 0) scale(1) rotate(0deg);
      border-radius: 45% 55% 60% 40% / 42% 44% 56% 58%;
    }
  }

  @keyframes blobDriftTwo {
    0% {
      transform: translate3d(0, 0, 0) scale(1) rotate(0deg);
      border-radius: 60% 40% 46% 54% / 45% 61% 39% 55%;
    }
    25% {
      transform: translate3d(-40px, -22px, 0) scale(1.07) rotate(-8deg);
      border-radius: 44% 56% 36% 64% / 54% 42% 58% 46%;
    }
    50% {
      transform: translate3d(-70px, 18px, 0) scale(1.15) rotate(-14deg);
      border-radius: 55% 45% 58% 42% / 36% 59% 41% 64%;
    }
    75% {
      transform: translate3d(-18px, 48px, 0) scale(1.06) rotate(-6deg);
      border-radius: 39% 61% 49% 51% / 58% 40% 60% 42%;
    }
    100% {
      transform: translate3d(0, 0, 0) scale(1) rotate(0deg);
      border-radius: 60% 40% 46% 54% / 45% 61% 39% 55%;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition: none !important;
    }
  }
`;

export function AgeSelection({ username, onAgeSelect }: AgeSelectionProps) {
  const ageGroups = [
    {
      id: 'young' as const,
      range: '8–10 years',
      title: 'Creative Explorer',
      emoji: '🌟',
      description: 'Simple, playful activities with stories, art, music and kindness challenges.',
      // icon: <Heart size={40} />,
      color: theme.blue,
      gradient:
        'linear-gradient(135deg, rgba(241,247,255,0.96) 0%, rgba(232,247,255,0.9) 100%)',
      borderColor: '#BFDFFF'
    },
    {
      id: 'teen' as const,
      range: '10–15 years',
      title: 'Future Builder',
      emoji: '🚀',
      description: 'Explore entrepreneurship, design, coding, teamwork and real project ideas.',
      // icon: <Star size={40} />,
      color: '#12C99B',
      gradient:
        'linear-gradient(135deg, rgba(240,255,250,0.96) 0%, rgba(230,252,245,0.9) 100%)',
      borderColor: '#B7F2DE'
    }
  ];

  const handleSelect = (ageGroup: AgeGroup) => {
    saveAgeGroup(username, ageGroup);
    onAgeSelect(ageGroup);
  };

  return (
    <div style={pageStyle}>
      <style>{backgroundAnimations}</style>

      <div style={animatedMeshStyle} />
      <div style={liquidLayerStyle}>
        <div style={blobOneStyle} />
        <div style={blobTwoStyle} />
      </div>

      <div style={contentStyle}>
        <div style={headerCardStyle}>
          <div style={iconBubbleStyle}>
            👋
          </div>

          <h1 style={titleStyle}>
            Hi, {username}!
          </h1>

          <p style={subtitleStyle}>
            Let’s find the perfect activities for you.
            <br />
            Which group fits you best?
          </p>
        </div>

        <div style={cardsGridStyle}>
          {ageGroups.map((group) => (
            <button
              key={group.id}
              type="button"
              onClick={() => handleSelect(group.id)}
              style={{
                ...groupCardStyle,
                background: group.gradient,
                borderColor: group.borderColor
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px) scale(1.015)';
                e.currentTarget.style.boxShadow = '0 22px 44px rgba(16, 42, 86, 0.14)';
                e.currentTarget.style.borderColor = group.color;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 12px 28px rgba(16, 42, 86, 0.08)';
                e.currentTarget.style.borderColor = group.borderColor;
              }}
            >
              <div style={emojiStyle}>
                {group.emoji}
              </div>

              <div
                style={{
                  ...rangePillStyle,
                  color: group.color
                }}
              >
                {group.range}
              </div>

              <div
                style={{
                  ...groupIconStyle,
                  color: group.color
                }}
              >
                {group.icon}
              </div>

              <h3 style={cardTitleStyle}>
                {group.title}
              </h3>

              <p style={cardTextStyle}>
                {group.description}
              </p>

              <div
                style={{
                  ...chooseButtonStyle,
                  color: group.color
                }}
              >
                Choose This
              </div>

              <div style={softCircleTopStyle} />
              <div style={softCircleBottomStyle} />
            </button>
          ))}
        </div>

        <p style={footerTextStyle}>
          Don’t worry, you can always change this later.
        </p>
      </div>
    </div>
  );
}

const pageStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  background: theme.pageBg,
  fontFamily: '"Plus Jakarta Sans", sans-serif',
  padding: '40px 20px',
  position: 'relative',
  overflow: 'hidden',
  isolation: 'isolate'
};

const animatedMeshStyle: CSSProperties = {
  position: 'absolute',
  inset: '-12%',
  background:
    'radial-gradient(circle at 18% 20%, rgba(59, 130, 246, 0.20) 0%, transparent 26%), radial-gradient(circle at 80% 18%, rgba(59, 224, 246, 0.18) 0%, transparent 28%), radial-gradient(circle at 52% 82%, rgba(27, 245, 169, 0.16) 0%, transparent 30%)',
  filter: 'blur(22px)',
  animation: 'meshShift 12s ease-in-out infinite',
  pointerEvents: 'none',
  zIndex: 0
};

const liquidLayerStyle: CSSProperties = {
  position: 'absolute',
  inset: 0,
  pointerEvents: 'none',
  zIndex: 0,
  filter: 'blur(18px)'
};

const blobOneStyle: CSSProperties = {
  position: 'absolute',
  width: '520px',
  height: '520px',
  left: '-110px',
  top: '-90px',
  background:
    'radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.34) 0%, rgba(59, 224, 246, 0.20) 44%, rgba(59, 224, 246, 0.08) 70%, transparent 100%)',
  animation: 'blobDriftOne 14s ease-in-out infinite',
  mixBlendMode: 'screen'
};

const blobTwoStyle: CSSProperties = {
  position: 'absolute',
  width: '460px',
  height: '460px',
  right: '-90px',
  bottom: '-70px',
  background:
    'radial-gradient(circle at 50% 40%, rgba(27, 245, 169, 0.26) 0%, rgba(59, 224, 246, 0.18) 45%, rgba(59, 224, 246, 0.08) 72%, transparent 100%)',
  animation: 'blobDriftTwo 16s ease-in-out infinite',
  mixBlendMode: 'screen'
};

const contentStyle: CSSProperties = {
  maxWidth: '900px',
  width: '100%',
  textAlign: 'center',
  position: 'relative',
  zIndex: 2
};

const headerCardStyle: CSSProperties = {
  background: theme.glassGradient,
  backdropFilter: 'blur(28px)',
  WebkitBackdropFilter: 'blur(28px)',
  borderRadius: '34px',
  padding: '42px',
  marginBottom: '32px',
  boxShadow:
    '0 28px 80px rgba(16, 42, 86, 0.14), inset 0 1px 0 rgba(255,255,255,0.95)',
  border: '1px solid rgba(255,255,255,0.82)'
};

const iconBubbleStyle: CSSProperties = {
  width: '88px',
  height: '88px',
  borderRadius: '26px',
  margin: '0 auto 18px',
  background: theme.calmGradient,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 16px 34px rgba(59, 130, 246, 0.15)',
  border: '1px solid rgba(191, 223, 255, 0.9)',
  fontSize: '44px'
};

const titleStyle: CSSProperties = {
  fontSize: '38px',
  fontWeight: '900',
  color: theme.text,
  margin: '0 0 12px'
};

const subtitleStyle: CSSProperties = {
  fontSize: '18px',
  color: theme.muted,
  lineHeight: '1.6',
  maxWidth: '600px',
  margin: '0 auto'
};

const cardsGridStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
  gap: '24px'
};

const groupCardStyle: CSSProperties = {
  borderRadius: '30px',
  padding: '46px 36px',
  cursor: 'pointer',
  transition: 'all 0.28s ease',
  boxShadow: '0 12px 28px rgba(16, 42, 86, 0.08)',
  border: '2px solid',
  position: 'relative',
  overflow: 'hidden',
  textAlign: 'center',
  fontFamily: 'inherit'
};

const emojiStyle: CSSProperties = {
  fontSize: '62px',
  marginBottom: '16px',
  lineHeight: '1'
};

const rangePillStyle: CSSProperties = {
  backgroundColor: 'rgba(255,255,255,0.82)',
  display: 'inline-block',
  padding: '10px 20px',
  borderRadius: '999px',
  marginBottom: '16px',
  fontSize: '14px',
  fontWeight: '900',
  boxShadow: '0 8px 18px rgba(16, 42, 86, 0.08)'
};

const groupIconStyle: CSSProperties = {
  marginBottom: '14px',
  display: 'flex',
  justifyContent: 'center'
};

const cardTitleStyle: CSSProperties = {
  fontSize: '26px',
  fontWeight: '900',
  color: theme.text,
  margin: '0 0 12px'
};

const cardTextStyle: CSSProperties = {
  color: '#475569',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '0 0 24px'
};

const chooseButtonStyle: CSSProperties = {
  background: 'rgba(255,255,255,0.84)',
  padding: '14px 28px',
  borderRadius: '14px',
  fontSize: '15px',
  fontWeight: '900',
  display: 'inline-block',
  boxShadow: '0 8px 18px rgba(16, 42, 86, 0.08)'
};

const softCircleTopStyle: CSSProperties = {
  position: 'absolute',
  top: '-24px',
  right: '-24px',
  width: '110px',
  height: '110px',
  borderRadius: '50%',
  background: 'rgba(255,255,255,0.32)',
  pointerEvents: 'none'
};

const softCircleBottomStyle: CSSProperties = {
  position: 'absolute',
  bottom: '-34px',
  left: '-34px',
  width: '130px',
  height: '130px',
  borderRadius: '50%',
  background: 'rgba(255,255,255,0.22)',
  pointerEvents: 'none'
};

const footerTextStyle: CSSProperties = {
  marginTop: '32px',
  color: theme.muted,
  fontSize: '14px',
  fontWeight: '700'
};