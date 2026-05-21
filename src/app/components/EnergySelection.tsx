import { type CSSProperties } from 'react';
import { Battery, BatteryMedium, BatteryLow, Sparkles } from 'lucide-react';
import { saveEnergyLevel, type EnergyLevel } from '../mock/mockDatabase';

interface EnergySelectionProps {
  username: string;
  onEnergySelect: (energyLevel: EnergyLevel) => void;
}

const theme = {
  blue: '#3B82F6',
  aqua: '#3BE0F6',
  mint: '#1BF5A9',
  navy: '#102A56',
  text: '#1E293B',
  muted: '#64748B',
  border: '#DDEAF5',
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

export function EnergySelection({ username, onEnergySelect }: EnergySelectionProps) {
  const energyOptions = [
    {
      id: 'high' as EnergyLevel,
      label: 'Full of Energy!',
      emoji: '😄',
      description: 'I feel ready for active challenges and group work.',
      icon: <Battery size={42} />,
      color: theme.blue,
      gradient:
        'linear-gradient(135deg, rgba(241,247,255,0.96) 0%, rgba(232,247,255,0.9) 100%)',
      borderColor: '#BFDFFF'
    },
    {
      id: 'medium' as EnergyLevel,
      label: 'Feeling Good',
      emoji: '😊',
      description: 'I want something balanced, creative and not too tiring.',
      icon: <BatteryMedium size={42} />,
      color: theme.aqua,
      gradient:
        'linear-gradient(135deg, rgba(233,252,255,0.96) 0%, rgba(238,247,255,0.9) 100%)',
      borderColor: '#BDEFFF'
    },
    {
      id: 'low' as EnergyLevel,
      label: 'Taking it Easy',
      emoji: '😌',
      description: 'I prefer calm activities with simple steps today.',
      icon: <BatteryLow size={42} />,
      color: '#12C99B',
      gradient:
        'linear-gradient(135deg, rgba(240,255,250,0.96) 0%, rgba(230,252,245,0.9) 100%)',
      borderColor: '#B7F2DE'
    }
  ];

  const handleSelect = (energyLevel: EnergyLevel) => {
    saveEnergyLevel(username, energyLevel);
    onEnergySelect(energyLevel);
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
            <Sparkles size={34} />
          </div>

          <h1 style={titleStyle}>
            How are you feeling today?
          </h1>

          <p style={subtitleStyle}>
            This helps us suggest activities that match your energy level.
          </p>
        </div>

        <div style={cardsGridStyle}>
          {energyOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => handleSelect(option.id)}
              style={{
                ...optionCardStyle,
                background: option.gradient,
                borderColor: option.borderColor
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px) scale(1.015)';
                e.currentTarget.style.boxShadow = '0 22px 44px rgba(16, 42, 86, 0.14)';
                e.currentTarget.style.borderColor = option.color;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 12px 28px rgba(16, 42, 86, 0.08)';
                e.currentTarget.style.borderColor = option.borderColor;
              }}
            >
              <div style={emojiStyle}>
                {option.emoji}
              </div>

              <div
                style={{
                  ...batteryIconStyle,
                  color: option.color
                }}
              >
                {option.icon}
              </div>

              <h3 style={cardTitleStyle}>
                {option.label}
              </h3>

              <p style={cardTextStyle}>
                {option.description}
              </p>

              <div
                style={{
                  ...chooseButtonStyle,
                  color: option.color
                }}
              >
                Choose This
              </div>
            </button>
          ))}
        </div>

        <p style={footerTextStyle}>
          You can update your energy level later.
        </p>
      </div>
    </div>
  );
}

const pageStyle: CSSProperties = {
  minHeight: '100vh',
  background: theme.pageBg,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '40px 20px',
  fontFamily: '"Plus Jakarta Sans", sans-serif',
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
  maxWidth: '1050px',
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
  marginBottom: '28px',
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
  color: theme.blue,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 16px 34px rgba(59, 130, 246, 0.15)',
  border: '1px solid rgba(191, 223, 255, 0.9)'
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
  maxWidth: '620px',
  margin: '0 auto'
};

const cardsGridStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
  gap: '22px'
};

const optionCardStyle: CSSProperties = {
  borderRadius: '28px',
  padding: '40px 28px',
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
  fontSize: '56px',
  marginBottom: '14px'
};

const batteryIconStyle: CSSProperties = {
  marginBottom: '16px',
  display: 'flex',
  justifyContent: 'center'
};

const cardTitleStyle: CSSProperties = {
  fontSize: '24px',
  fontWeight: '900',
  color: theme.text,
  margin: '0 0 12px'
};

const cardTextStyle: CSSProperties = {
  color: '#475569',
  fontSize: '15px',
  lineHeight: '1.6',
  margin: '0 0 24px'
};

const chooseButtonStyle: CSSProperties = {
  background: 'rgba(255,255,255,0.84)',
  padding: '13px 24px',
  borderRadius: '14px',
  fontSize: '15px',
  fontWeight: '900',
  display: 'inline-block',
  boxShadow: '0 8px 18px rgba(16, 42, 86, 0.08)'
};

const footerTextStyle: CSSProperties = {
  marginTop: '28px',
  color: theme.muted,
  fontSize: '14px',
  fontWeight: '700'
};