import { useState, type CSSProperties, type FormEvent } from 'react';
import { Heart, User, Shield, Video, Building2, Sparkles } from 'lucide-react';
import careQuestIcon from '../assets/carequest-logo-icon.png';
import careQuestWordmark from '../assets/carequest-wordmark.png';

interface LoginScreenProps {
  onLogin: (username: string, role: string) => void;
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

  @keyframes blobDriftThree {
    0% {
      transform: translate3d(0, 0, 0) scale(1) rotate(0deg);
      border-radius: 47% 53% 43% 57% / 61% 42% 58% 39%;
      opacity: 0.58;
    }
    30% {
      transform: translate3d(34px, -26px, 0) scale(1.1) rotate(8deg);
      border-radius: 59% 41% 54% 46% / 45% 60% 40% 55%;
      opacity: 0.85;
    }
    60% {
      transform: translate3d(12px, 24px, 0) scale(1.16) rotate(14deg);
      border-radius: 41% 59% 60% 40% / 57% 43% 57% 43%;
      opacity: 0.72;
    }
    100% {
      transform: translate3d(0, 0, 0) scale(1) rotate(0deg);
      border-radius: 47% 53% 43% 57% / 61% 42% 58% 39%;
      opacity: 0.58;
    }
  }

  @keyframes blobDriftFour {
    0% {
      transform: translate3d(0, 0, 0) scale(1) rotate(0deg);
      border-radius: 55% 45% 52% 48% / 43% 57% 43% 57%;
      opacity: 0.48;
    }
    35% {
      transform: translate3d(-25px, -34px, 0) scale(1.08) rotate(-7deg);
      border-radius: 42% 58% 40% 60% / 61% 39% 61% 39%;
      opacity: 0.76;
    }
    70% {
      transform: translate3d(18px, -14px, 0) scale(1.13) rotate(-11deg);
      border-radius: 61% 39% 58% 42% / 48% 54% 46% 52%;
      opacity: 0.64;
    }
    100% {
      transform: translate3d(0, 0, 0) scale(1) rotate(0deg);
      border-radius: 55% 45% 52% 48% / 43% 57% 43% 57%;
      opacity: 0.48;
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

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [username, setUsername] = useState('');

  const roles = [
    {
      id: 'child',
      name: 'Child',
      icon: <Heart size={32} />,
      color: theme.blue,
      gradient:
        'linear-gradient(135deg, rgba(241,247,255,0.96) 0%, rgba(232,247,255,0.9) 100%)',
      border: '#BFDFFF',
      description: 'Join safe learning sessions'
    },
    {
      id: 'parent',
      name: 'Parent/Guardian',
      icon: <Shield size={32} />,
      color: '#12C99B',
      gradient:
        'linear-gradient(135deg, rgba(240,255,250,0.96) 0%, rgba(230,252,245,0.9) 100%)',
      border: '#B7F2DE',
      description: 'Monitor and approve activities'
    },
    {
      id: 'host',
      name: 'Host',
      icon: <Video size={32} />,
      color: '#2F7BEA',
      gradient:
        'linear-gradient(135deg, rgba(244,248,255,0.96) 0%, rgba(234,243,255,0.9) 100%)',
      border: '#C9DCFF',
      description: 'Lead guided sessions'
    },
    {
      id: 'hospital',
      name: 'Hospital/Clinic',
      icon: <Building2 size={32} />,
      color: theme.navy,
      gradient:
        'linear-gradient(135deg, rgba(246,250,255,0.96) 0%, rgba(237,247,250,0.9) 100%)',
      border: '#D3E3EE',
      description: 'Manage safe access'
    }
  ];

  const selectedRoleData = roles.find((role) => role.id === selectedRole);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (username.trim() && selectedRole) {
      onLogin(username.trim(), selectedRole);
    }
  };

  return (
    <div style={pageStyle}>
      <style>{backgroundAnimations}</style>

      <div style={animatedMeshStyle} />
      <div style={liquidLayerStyle}>
        <div style={blobOneStyle} />
        <div style={blobTwoStyle} />
        <div style={blobThreeStyle} />
        <div style={blobFourStyle} />
      </div>

      <div style={cardStyle}>
        <div style={logoWrapperStyle}>
          <div style={logoIconBoxStyle}>
            <img
              src={careQuestIcon}
              alt="CareQuest icon"
              style={{
                width: '96px',
                height: '96px',
                objectFit: 'contain'
              }}
            />
          </div>

          <img
            src={careQuestWordmark}
            alt="CareQuest"
            style={{
              width: '272px',
              maxWidth: '100%',
              height: 'auto',
              objectFit: 'contain',
              display: 'block'
            }}
          />
        </div>

        <div style={badgeStyle}>
          <Sparkles size={16} />
          Safe learning space
        </div>

        <p style={subtitleStyle}>
          Safe learning, creativity & connection during recovery
        </p>

        {!selectedRole ? (
          <>
            <h3 style={sectionTitleStyle}>
              How would you like to join?
            </h3>

            <div style={rolesGridStyle}>
              {roles.map((role) => (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => setSelectedRole(role.id)}
                  style={{
                    ...roleCardStyle,
                    background: role.gradient,
                    borderColor: role.border
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-6px)';
                    e.currentTarget.style.boxShadow =
                      '0 18px 36px rgba(16, 42, 86, 0.13)';
                    e.currentTarget.style.borderColor = role.color;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow =
                      '0 10px 24px rgba(16, 42, 86, 0.07)';
                    e.currentTarget.style.borderColor = role.border;
                  }}
                >
                  <div
                    style={{
                      ...roleIconStyle,
                      color: role.color
                    }}
                  >
                    {role.icon}
                  </div>

                  <h4 style={roleTitleStyle}>
                    {role.name}
                  </h4>

                  <p style={roleDescriptionStyle}>
                    {role.description}
                  </p>
                </button>
              ))}
            </div>
          </>
        ) : (
          <form onSubmit={handleSubmit} style={formStyle}>
            <div
              style={{
                ...selectedRoleStyle,
                background: selectedRoleData?.gradient,
                borderColor: selectedRoleData?.border
              }}
            >
              <div
                style={{
                  ...selectedRoleIconStyle,
                  color: selectedRoleData?.color
                }}
              >
                {selectedRoleData?.icon}
              </div>

              <div style={{ textAlign: 'left' }}>
                <p style={smallLabelStyle}>
                  Joining as
                </p>

                <p style={selectedRoleNameStyle}>
                  {selectedRoleData?.name}
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSelectedRole(null);
                  setUsername('');
                }}
                style={changeButtonStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.98)';
                  e.currentTarget.style.color = theme.blue;
                  e.currentTarget.style.borderColor = '#BFDFFF';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.86)';
                  e.currentTarget.style.color = theme.muted;
                  e.currentTarget.style.borderColor = '#DCEAF5';
                }}
              >
                Change
              </button>
            </div>

            <div style={inputWrapperStyle}>
              <User
                style={{
                  position: 'absolute',
                  left: '18px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#8EA6BD'
                }}
                size={20}
              />

              <input
                type="text"
                placeholder="Enter your name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={inputStyle}
                onFocus={(e) => {
                  e.target.style.borderColor = theme.aqua;
                  e.target.style.boxShadow =
                    '0 0 0 4px rgba(59, 224, 246, 0.16)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = theme.border;
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            <button
              type="submit"
              disabled={!username.trim()}
              style={{
                ...submitButtonStyle,
                background: username.trim()
                  ? theme.primaryGradient
                  : '#C7D7E5',
                cursor: username.trim() ? 'pointer' : 'not-allowed',
                boxShadow: username.trim()
                  ? '0 14px 26px rgba(59, 130, 246, 0.26)'
                  : 'none'
              }}
              onMouseEnter={(e) => {
                if (username.trim()) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow =
                    '0 18px 34px rgba(59, 130, 246, 0.33)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = username.trim()
                  ? '0 14px 26px rgba(59, 130, 246, 0.26)'
                  : 'none';
              }}
            >
              Continue to CareQuest
            </button>
          </form>
        )}

        <p style={footerNoteStyle}>
          <Shield size={16} />
          Safe, secure & parent-approved
        </p>
      </div>
    </div>
  );
}

const pageStyle: CSSProperties = {
  minHeight: '100vh',
  background: theme.pageBg,
  fontFamily: '"Plus Jakarta Sans", sans-serif',
  padding: '40px 20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
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

const blobFourStyle: CSSProperties = {
  position: 'absolute',
  width: '260px',
  height: '260px',
  left: '16%',
  bottom: '10%',
  background:
    'radial-gradient(circle at 50% 50%, rgba(59, 224, 246, 0.18) 0%, rgba(27, 245, 169, 0.12) 56%, transparent 100%)',
  animation: 'blobDriftFour 13s ease-in-out infinite',
  mixBlendMode: 'screen'
};

const cardStyle: CSSProperties = {
  background: theme.glassGradient,
  backdropFilter: 'blur(28px)',
  WebkitBackdropFilter: 'blur(28px)',
  padding: '46px 40px',
  borderRadius: '34px',
  boxShadow:
    '0 28px 80px rgba(16, 42, 86, 0.16), inset 0 1px 0 rgba(255,255,255,0.95)',
  maxWidth: '930px',
  width: '100%',
  textAlign: 'center',
  border: '1px solid rgba(255,255,255,0.82)',
  position: 'relative',
  overflow: 'hidden',
  zIndex: 2
};

const logoWrapperStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '16px',
  position: 'relative'
};

const logoIconBoxStyle: CSSProperties = {
  width: '124px',
  height: '124px',
  borderRadius: '32px',
  background: theme.calmGradient,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '12px',
  boxShadow:
    '0 16px 34px rgba(59, 130, 246, 0.15), inset 0 1px 0 rgba(255,255,255,0.9)',
  border: '1px solid rgba(191, 223, 255, 0.9)'
};

const badgeStyle: CSSProperties = {
  width: 'fit-content',
  margin: '0 auto 14px',
  display: 'flex',
  alignItems: 'center',
  gap: '7px',
  padding: '8px 14px',
  borderRadius: '999px',
  background: 'rgba(255,255,255,0.72)',
  color: theme.blue,
  fontSize: '13px',
  fontWeight: '900',
  border: '1px solid #CFEAFF',
  boxShadow: '0 8px 18px rgba(16, 42, 86, 0.06)'
};

const subtitleStyle: CSSProperties = {
  color: theme.muted,
  margin: '0 0 34px',
  fontSize: '17px',
  lineHeight: '1.6'
};

const sectionTitleStyle: CSSProperties = {
  fontSize: '20px',
  fontWeight: '900',
  color: theme.text,
  marginBottom: '24px'
};

const rolesGridStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(185px, 1fr))',
  gap: '18px',
  marginBottom: '20px'
};

const roleCardStyle: CSSProperties = {
  borderRadius: '24px',
  padding: '28px 20px',
  cursor: 'pointer',
  transition: 'all 0.28s ease',
  border: '2px solid',
  textAlign: 'center',
  boxShadow: '0 10px 24px rgba(16, 42, 86, 0.07)',
  backdropFilter: 'blur(14px)',
  WebkitBackdropFilter: 'blur(14px)',
  fontFamily: 'inherit'
};

const roleIconStyle: CSSProperties = {
  width: '62px',
  height: '62px',
  borderRadius: '20px',
  margin: '0 auto 14px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'rgba(255, 255, 255, 0.78)',
  boxShadow: '0 8px 18px rgba(16, 42, 86, 0.08)'
};

const roleTitleStyle: CSSProperties = {
  fontSize: '16px',
  fontWeight: '900',
  color: theme.text,
  margin: '0 0 7px'
};

const roleDescriptionStyle: CSSProperties = {
  fontSize: '13px',
  color: theme.muted,
  margin: 0,
  lineHeight: '1.45',
  fontWeight: '650'
};

const formStyle: CSSProperties = {
  maxWidth: '430px',
  margin: '0 auto'
};

const selectedRoleStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  marginBottom: '24px',
  padding: '16px',
  borderRadius: '20px',
  border: '2px solid',
  boxShadow: '0 10px 22px rgba(16, 42, 86, 0.07)'
};

const selectedRoleIconStyle: CSSProperties = {
  width: '52px',
  height: '52px',
  borderRadius: '16px',
  background: 'rgba(255,255,255,0.82)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0
};

const smallLabelStyle: CSSProperties = {
  margin: 0,
  fontSize: '13px',
  color: theme.muted,
  fontWeight: '800'
};

const selectedRoleNameStyle: CSSProperties = {
  margin: 0,
  fontSize: '18px',
  fontWeight: '900',
  color: theme.text
};

const changeButtonStyle: CSSProperties = {
  marginLeft: 'auto',
  background: 'rgba(255,255,255,0.86)',
  border: '1px solid #DCEAF5',
  borderRadius: '12px',
  padding: '8px 13px',
  fontSize: '13px',
  fontWeight: '900',
  color: theme.muted,
  cursor: 'pointer',
  transition: 'all 0.25s ease',
  fontFamily: 'inherit'
};

const inputWrapperStyle: CSSProperties = {
  position: 'relative',
  marginBottom: '20px'
};

const inputStyle: CSSProperties = {
  width: '100%',
  padding: '16px 16px 16px 50px',
  borderRadius: '16px',
  border: `2px solid ${theme.border}`,
  fontSize: '16px',
  outline: 'none',
  transition: 'all 0.25s ease',
  color: theme.text,
  background: 'rgba(255,255,255,0.9)',
  fontFamily: 'inherit'
};

const submitButtonStyle: CSSProperties = {
  width: '100%',
  padding: '16px',
  color: 'white',
  border: 'none',
  borderRadius: '16px',
  fontSize: '16px',
  fontWeight: '900',
  transition: 'all 0.25s ease',
  fontFamily: 'inherit'
};

const footerNoteStyle: CSSProperties = {
  marginTop: '32px',
  color: '#7C8AA0',
  fontSize: '14px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '6px',
  fontWeight: '700'
};