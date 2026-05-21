import { useEffect, useState, type CSSProperties } from 'react';
import { CheckCircle2, Loader2, Video, Users, PenLine } from 'lucide-react';
import careQuestIcon from '../assets/carequest-logo-icon.png';

interface JoiningScreenProps {
  onFinished: () => void;
}

const theme = {
  blue: '#3B82F6',
  aqua: '#3BE0F6',
  mint: '#1BF5A9',
  navy: '#102A56',
  text: '#1E293B',
  muted: '#64748B',
  border: '#DDEAF5',

  pageBg:
    'linear-gradient(135deg, #F7FBFF 0%, #EEF9FF 45%, #F3FFFA 100%)',

  primaryGradient: 'linear-gradient(135deg, #3B82F6 0%, #3BE0F6 100%)',

  glassGradient:
    'linear-gradient(135deg, rgba(255,255,255,0.84) 0%, rgba(247,252,255,0.72) 100%)',

  calmGradient:
    'linear-gradient(135deg, rgba(238,247,255,0.96) 0%, rgba(233,252,255,0.92) 52%, rgba(236,255,248,0.9) 100%)'
};

const joiningSteps = [
  {
    icon: <Video size={18} />,
    text: 'Checking live lesson room'
  },
  {
    icon: <PenLine size={18} />,
    text: 'Preparing your whiteboard'
  },
  {
    icon: <Users size={18} />,
    text: 'Connecting to mentor and group'
  }
];

const joiningAnimations = `
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

  @keyframes blobDriftThree {
    0% {
      transform: translate3d(0, 0, 0) scale(1) rotate(0deg);
      opacity: 0.54;
    }
    50% {
      transform: translate3d(24px, -30px, 0) scale(1.12) rotate(12deg);
      opacity: 0.82;
    }
    100% {
      transform: translate3d(0, 0, 0) scale(1) rotate(0deg);
      opacity: 0.54;
    }
  }

  @keyframes logoPulse {
    0%, 100% {
      transform: scale(1);
      box-shadow:
        0 18px 38px rgba(59, 130, 246, 0.16),
        inset 0 1px 0 rgba(255,255,255,0.9);
    }
    50% {
      transform: scale(1.045);
      box-shadow:
        0 24px 52px rgba(59, 224, 246, 0.24),
        inset 0 1px 0 rgba(255,255,255,0.95);
    }
  }

  @keyframes dotBounce {
    0%, 80%, 100% {
      transform: translateY(0);
      opacity: 0.46;
    }
    40% {
      transform: translateY(-8px);
      opacity: 1;
    }
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes progressGlow {
    0%, 100% {
      filter: brightness(1);
    }
    50% {
      filter: brightness(1.12);
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

export function JoiningScreen({ onFinished }: JoiningScreenProps) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const stepTimer = setInterval(() => {
      setStep((prev) => {
        if (prev < joiningSteps.length) {
          return prev + 1;
        }

        return prev;
      });
    }, 700);

    const finishTimer = setTimeout(() => {
      onFinished();
    }, 2900);

    return () => {
      clearInterval(stepTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinished]);

  const progress = Math.min((step / joiningSteps.length) * 100, 100);

  return (
    <div style={pageStyle}>
      <style>{joiningAnimations}</style>

      <div style={animatedMeshStyle} />

      <div style={liquidLayerStyle}>
        <div style={blobOneStyle} />
        <div style={blobTwoStyle} />
        <div style={blobThreeStyle} />
      </div>

      <div style={cardStyle}>
        <div style={softCircleTopStyle} />
        <div style={softCircleBottomStyle} />

        <div style={logoBoxStyle}>
          <img
            src={careQuestIcon}
            alt="CareQuest"
            style={logoImageStyle}
          />
        </div>

        <h1 style={titleStyle}>
          Joining your live lesson...
        </h1>

        <p style={subtitleStyle}>
          Please wait while we prepare your safe session space.
        </p>

        <div style={dotsRowStyle}>
          {[0, 1, 2].map((dot) => (
            <span
              key={dot}
              style={{
                ...dotStyle,
                animation: `dotBounce 1s ease-in-out ${dot * 0.15}s infinite`
              }}
            />
          ))}
        </div>

        <div style={stepsCardStyle}>
          {joiningSteps.map((item, index) => {
            const completed = step > index;
            const current = step === index;

            return (
              <div
                key={item.text}
                style={{
                  ...stepRowStyle,
                  color: completed ? '#0F766E' : current ? theme.blue : theme.muted
                }}
              >
                <div
                  style={{
                    ...stepIconStyle,
                    background: completed
                      ? 'linear-gradient(135deg, rgba(220,252,231,0.96) 0%, rgba(204,251,241,0.92) 100%)'
                      : current
                        ? 'linear-gradient(135deg, rgba(239,246,255,0.96) 0%, rgba(236,254,255,0.92) 100%)'
                        : '#EFF4F8',
                    color: completed ? '#0F766E' : current ? theme.blue : '#94A3B8',
                    borderColor: completed
                      ? '#B7F2DE'
                      : current
                        ? '#BFDFFF'
                        : '#E2E8F0'
                  }}
                >
                  {completed ? <CheckCircle2 size={19} /> : item.icon}
                </div>

                <span style={stepTextStyle}>
                  {item.text}
                </span>

                {current && !completed && (
                  <Loader2
                    size={18}
                    style={{
                      animation: 'spin 1s linear infinite',
                      color: theme.blue,
                      flexShrink: 0
                    }}
                  />
                )}

                {completed && (
                  <CheckCircle2
                    size={18}
                    style={{
                      color: '#12C99B',
                      flexShrink: 0
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>

        <div style={progressTrackStyle}>
          <div
            style={{
              ...progressFillStyle,
              width: `${progress}%`
            }}
          />
        </div>

        <p style={footerTextStyle}>
          Setting up tools, group space and mentor connection.
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

const blobThreeStyle: CSSProperties = {
  position: 'absolute',
  width: '300px',
  height: '300px',
  left: '56%',
  top: '8%',
  background:
    'radial-gradient(circle at 45% 45%, rgba(59, 130, 246, 0.20) 0%, rgba(16, 42, 86, 0.10) 55%, transparent 100%)',
  animation: 'blobDriftThree 11s ease-in-out infinite',
  mixBlendMode: 'screen'
};

const cardStyle: CSSProperties = {
  width: '100%',
  maxWidth: '570px',
  background: theme.glassGradient,
  backdropFilter: 'blur(28px)',
  WebkitBackdropFilter: 'blur(28px)',
  borderRadius: '34px',
  padding: '46px 44px',
  textAlign: 'center',
  boxShadow:
    '0 28px 80px rgba(16, 42, 86, 0.16), inset 0 1px 0 rgba(255,255,255,0.95)',
  border: '1px solid rgba(255,255,255,0.82)',
  position: 'relative',
  overflow: 'hidden',
  zIndex: 2
};

const softCircleTopStyle: CSSProperties = {
  position: 'absolute',
  width: '190px',
  height: '190px',
  borderRadius: '50%',
  background: 'rgba(59, 224, 246, 0.12)',
  top: '-72px',
  right: '-72px',
  pointerEvents: 'none'
};

const softCircleBottomStyle: CSSProperties = {
  position: 'absolute',
  width: '150px',
  height: '150px',
  borderRadius: '50%',
  background: 'rgba(27, 245, 169, 0.10)',
  bottom: '-58px',
  left: '-48px',
  pointerEvents: 'none'
};

const logoBoxStyle: CSSProperties = {
  width: '116px',
  height: '116px',
  margin: '0 auto 24px',
  borderRadius: '32px',
  background: theme.calmGradient,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  animation: 'logoPulse 1.7s ease-in-out infinite',
  border: '1px solid rgba(191, 223, 255, 0.9)',
  position: 'relative',
  zIndex: 1
};

const logoImageStyle: CSSProperties = {
  width: '82px',
  height: '82px',
  objectFit: 'contain'
};

const titleStyle: CSSProperties = {
  margin: '0 0 10px',
  fontSize: '32px',
  fontWeight: '900',
  color: theme.text,
  position: 'relative',
  zIndex: 1
};

const subtitleStyle: CSSProperties = {
  margin: '0 0 30px',
  fontSize: '16px',
  color: theme.muted,
  lineHeight: 1.6,
  position: 'relative',
  zIndex: 1
};

const dotsRowStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  gap: '9px',
  marginBottom: '30px',
  position: 'relative',
  zIndex: 1
};

const dotStyle: CSSProperties = {
  width: '12px',
  height: '12px',
  borderRadius: '50%',
  background: theme.primaryGradient,
  boxShadow: '0 8px 16px rgba(59, 130, 246, 0.20)'
};

const stepsCardStyle: CSSProperties = {
  background:
    'linear-gradient(135deg, rgba(248,250,252,0.92) 0%, rgba(239,246,255,0.72) 100%)',
  borderRadius: '24px',
  padding: '18px 20px',
  marginBottom: '26px',
  border: '1px solid rgba(221, 234, 245, 0.88)',
  textAlign: 'left',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.82)',
  position: 'relative',
  zIndex: 1
};

const stepRowStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '12px 0',
  fontWeight: '800',
  fontSize: '15px',
  transition: 'all 0.25s ease'
};

const stepIconStyle: CSSProperties = {
  width: '36px',
  height: '36px',
  borderRadius: '13px',
  border: '1px solid',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  transition: 'all 0.25s ease',
  boxShadow: '0 8px 18px rgba(16, 42, 86, 0.06)'
};

const stepTextStyle: CSSProperties = {
  flex: 1
};

const progressTrackStyle: CSSProperties = {
  height: '11px',
  background: 'rgba(226, 232, 240, 0.9)',
  borderRadius: '999px',
  overflow: 'hidden',
  position: 'relative',
  zIndex: 1,
  boxShadow: 'inset 0 1px 2px rgba(16, 42, 86, 0.08)'
};

const progressFillStyle: CSSProperties = {
  height: '100%',
  background: 'linear-gradient(135deg, #3B82F6 0%, #3BE0F6 52%, #1BF5A9 100%)',
  borderRadius: '999px',
  transition: 'width 0.45s ease',
  animation: 'progressGlow 1.8s ease-in-out infinite',
  boxShadow: '0 0 18px rgba(59, 224, 246, 0.35)'
};

const footerTextStyle: CSSProperties = {
  margin: '16px 0 0',
  color: '#7C8AA0',
  fontSize: '13px',
  fontWeight: '700',
  position: 'relative',
  zIndex: 1
};