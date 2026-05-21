import type { ReactNode, CSSProperties } from 'react';
import {
  Home,
  Sparkles,
  Trophy,
  MessageSquare,
  LogOut,
  ShoppingBag,
  CalendarDays
} from 'lucide-react';
import { getMockUser } from '../mock/mockDatabase';
import careQuestFullLogo from '../assets/carequest-logo-full.png';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  username: string;
  onLogout: () => void;
}

interface NavTone {
  accent: string;
  gradient: string;
  soft: string;
  iconBg: string;
  border: string;
  borderStrong: string;
  shadow: string;
}

interface MenuBtnProps {
  icon: ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
  badge?: string;
  tone: NavTone;
}

const theme = {
  blue: '#3B82F6',
  aqua: '#3BE0F6',
  mint: '#1BF5A9',
  navy: '#102A56',
  text: '#1E293B',
  muted: '#64748B',
  border: '#DDEAF5',
  sidebarGlass:
    'linear-gradient(180deg, rgba(255,255,255,0.94) 0%, rgba(247,252,255,0.88) 100%)',
  softCareQuest:
    'linear-gradient(135deg, rgba(238,247,255,0.96) 0%, rgba(233,252,255,0.92) 52%, rgba(236,255,248,0.9) 100%)'
};

const sidebarAnimationStyles = `
  [data-carequest-sidebar-nav] {
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  [data-carequest-sidebar-nav]::-webkit-scrollbar {
    display: none;
  }

  @keyframes sidebarLiquidOne {
    0%, 100% {
      transform: translate3d(0, 0, 0) scale(1) rotate(0deg);
      border-radius: 48% 52% 61% 39% / 45% 58% 42% 55%;
      opacity: 0.72;
    }

    50% {
      transform: translate3d(22px, 20px, 0) scale(1.08) rotate(8deg);
      border-radius: 59% 41% 45% 55% / 58% 41% 59% 42%;
      opacity: 0.95;
    }
  }

  @keyframes sidebarLiquidTwo {
    0%, 100% {
      transform: translate3d(0, 0, 0) scale(1) rotate(0deg);
      border-radius: 58% 42% 47% 53% / 41% 57% 43% 59%;
      opacity: 0.54;
    }

    50% {
      transform: translate3d(-18px, -18px, 0) scale(1.1) rotate(-8deg);
      border-radius: 40% 60% 58% 42% / 61% 39% 61% 39%;
      opacity: 0.82;
    }
  }

  @keyframes sidebarLiquidThree {
    0%, 100% {
      transform: translate3d(0, 0, 0) scale(1);
      opacity: 0.38;
    }

    50% {
      transform: translate3d(12px, -16px, 0) scale(1.12);
      opacity: 0.62;
    }
  }

  @keyframes softAvatarFloat {
    0%, 100% {
      transform: translateY(0);
    }

    50% {
      transform: translateY(-3px);
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

const navTones = {
  home: {
    accent: '#3B82F6',
    gradient: 'linear-gradient(135deg, #3B82F6 0%, #3BE0F6 100%)',
    soft: 'linear-gradient(135deg, rgba(239,246,255,0.92) 0%, rgba(236,254,255,0.84) 100%)',
    iconBg: 'rgba(59, 130, 246, 0.11)',
    border: 'rgba(147, 197, 253, 0.55)',
    borderStrong: 'rgba(59, 130, 246, 0.42)',
    shadow: 'rgba(59, 130, 246, 0.22)'
  },
  schedule: {
    accent: '#0891B2',
    gradient: 'linear-gradient(135deg, #3BE0F6 0%, #1BF5A9 100%)',
    soft: 'linear-gradient(135deg, rgba(236,254,255,0.92) 0%, rgba(236,255,248,0.84) 100%)',
    iconBg: 'rgba(59, 224, 246, 0.13)',
    border: 'rgba(103, 232, 249, 0.5)',
    borderStrong: 'rgba(59, 224, 246, 0.48)',
    shadow: 'rgba(59, 224, 246, 0.22)'
  },
  activities: {
    accent: '#7C3AED',
    gradient: 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)',
    soft: 'linear-gradient(135deg, rgba(245,243,255,0.95) 0%, rgba(239,246,255,0.86) 100%)',
    iconBg: 'rgba(139, 92, 246, 0.11)',
    border: 'rgba(196, 181, 253, 0.55)',
    borderStrong: 'rgba(139, 92, 246, 0.42)',
    shadow: 'rgba(139, 92, 246, 0.22)'
  },
  shop: {
    accent: '#DB2777',
    gradient: 'linear-gradient(135deg, #FF6B9D 0%, #8B5CF6 100%)',
    soft: 'linear-gradient(135deg, rgba(253,242,248,0.94) 0%, rgba(245,243,255,0.86) 100%)',
    iconBg: 'rgba(255, 107, 157, 0.11)',
    border: 'rgba(251, 207, 232, 0.62)',
    borderStrong: 'rgba(255, 107, 157, 0.42)',
    shadow: 'rgba(255, 107, 157, 0.2)'
  },
  achievements: {
    accent: '#D97706',
    gradient: 'linear-gradient(135deg, #F5C451 0%, #FFB86B 100%)',
    soft: 'linear-gradient(135deg, rgba(255,251,235,0.96) 0%, rgba(255,247,237,0.88) 100%)',
    iconBg: 'rgba(245, 196, 81, 0.15)',
    border: 'rgba(253, 230, 138, 0.66)',
    borderStrong: 'rgba(245, 196, 81, 0.52)',
    shadow: 'rgba(245, 196, 81, 0.24)'
  },
  messages: {
    accent: '#E11D48',
    gradient: 'linear-gradient(135deg, #FF6B9D 0%, #3BE0F6 100%)',
    soft: 'linear-gradient(135deg, rgba(255,241,247,0.94) 0%, rgba(236,254,255,0.84) 100%)',
    iconBg: 'rgba(255, 107, 157, 0.12)',
    border: 'rgba(251, 207, 232, 0.58)',
    borderStrong: 'rgba(255, 107, 157, 0.42)',
    shadow: 'rgba(255, 107, 157, 0.2)'
  }
};

function MenuBtn({
  icon,
  label,
  active,
  onClick,
  badge,
  tone
}: MenuBtnProps) {
  return (
    <button
      onClick={onClick}
      style={{
        ...menuButtonStyle,
        background: active ? tone.gradient : 'transparent',
        color: active ? 'white' : theme.muted,
        borderColor: active ? tone.borderStrong : 'transparent',
        boxShadow: active ? `0 12px 24px ${tone.shadow}` : 'none'
      }}
      onMouseEnter={(e) => {
        if (!active) {
          e.currentTarget.style.background = tone.soft;
          e.currentTarget.style.color = theme.text;
          e.currentTarget.style.transform = 'translateX(3px)';
          e.currentTarget.style.boxShadow = `0 10px 20px ${tone.shadow}`;
          e.currentTarget.style.borderColor = tone.border;
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          e.currentTarget.style.background = 'transparent';
          e.currentTarget.style.color = theme.muted;
          e.currentTarget.style.transform = 'translateX(0)';
          e.currentTarget.style.boxShadow = 'none';
          e.currentTarget.style.borderColor = 'transparent';
        }
      }}
    >
      <span style={menuIconStyle(tone, active)}>
        {icon}
      </span>

      <span style={menuLabelStyle}>
        {label}
      </span>

      {badge && (
        <span style={badgeStyle}>
          {badge}
        </span>
      )}
    </button>
  );
}

export function Sidebar({
  activeTab,
  onTabChange,
  username,
  onLogout
}: SidebarProps) {
  const userData = getMockUser(username, 'child');

  const stars = userData?.careCoins ?? 240;
  const equippedAvatar = userData?.equippedAvatar ?? 'avatar-sunny';
  const equippedFrame = userData?.equippedFrame ?? 'none';

  const avatarMap: Record<string, { emoji: string; background: string }> = {
    'avatar-sunny': { emoji: '😊', background: '#FEF3C7' },
    'avatar-artist': { emoji: '🎨', background: '#FCE7F3' },
    'avatar-robot': { emoji: '🤖', background: '#EDE9FE' },
    'avatar-space': { emoji: '🚀', background: '#DBEAFE' },
    'avatar-gamer': { emoji: '🎮', background: '#E0F2FE' },
    'avatar-dj': { emoji: '🎧', background: '#F5F3FF' },
    'avatar-cat': { emoji: '🐱', background: '#ECFEFF' },
    'avatar-detective': { emoji: '🔍', background: '#EFF6FF' },
    'avatar-wizard': { emoji: '🔮', background: '#FAF5FF' },
    'avatar-phoenix': { emoji: '🔥', background: '#FFF7ED' }
  };

  const getFrameStyle = () => {
    if (equippedFrame === 'rainbow-frame' || equippedFrame === 'frame-rainbow') {
      return '5px solid #FF6B9D';
    }

    if (equippedFrame === 'gold-frame' || equippedFrame === 'frame-gold') {
      return '5px solid #F59E0B';
    }

    if (equippedFrame === 'heart-frame' || equippedFrame === 'frame-heart') {
      return '5px solid #EC4899';
    }

    return '5px solid #E2E8F0';
  };

  const avatar = avatarMap[equippedAvatar] ?? avatarMap['avatar-sunny'];

  return (
    <aside style={sidebarStyle}>
      <style>{sidebarAnimationStyles}</style>

      <div style={liquidOneStyle} />
      <div style={liquidTwoStyle} />
      <div style={liquidThreeStyle} />

      <div style={logoWrapperStyle}>
        <img
          src={careQuestFullLogo}
          alt="CareQuest logo"
          style={logoStyle}
        />
      </div>

      <div style={userCardStyle}>
        <div style={avatarStyle(getFrameStyle(), avatar.background)}>
          {avatar.emoji}
        </div>

        <p style={welcomeTextStyle}>
          Welcome back
        </p>

        <p style={usernameStyle}>
          {username}
        </p>
      </div>

      <nav data-carequest-sidebar-nav="true" style={navStyle}>
        <MenuBtn
          active={activeTab === 'home'}
          onClick={() => onTabChange('home')}
          icon={<Home size={19} />}
          label="Home"
          tone={navTones.home}
        />

        <MenuBtn
          active={activeTab === 'schedule'}
          onClick={() => onTabChange('schedule')}
          icon={<CalendarDays size={19} />}
          label="Schedule"
          tone={navTones.schedule}
        />

        <MenuBtn
          active={activeTab === 'activities'}
          onClick={() => onTabChange('activities')}
          icon={<Sparkles size={19} />}
          label="Activities"
          tone={navTones.activities}
        />

        <MenuBtn
          active={activeTab === 'shop'}
          onClick={() => onTabChange('shop')}
          icon={<ShoppingBag size={19} />}
          label="Shop"
          tone={navTones.shop}
        />

        <MenuBtn
          active={activeTab === 'achievements'}
          onClick={() => onTabChange('achievements')}
          icon={<Trophy size={19} />}
          label="Achievements"
          tone={navTones.achievements}
        />

        <MenuBtn
          active={activeTab === 'messages'}
          onClick={() => onTabChange('messages')}
          icon={<MessageSquare size={19} />}
          label="Messages"
          badge="3"
          tone={navTones.messages}
        />
      </nav>

      <button
        onClick={() => onTabChange('shop')}
        style={{
          ...starsCardStyle,
          borderColor: activeTab === 'shop'
            ? 'rgba(245, 196, 81, 0.95)'
            : 'rgba(245, 196, 81, 0.48)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 14px 26px rgba(245, 196, 81, 0.22)';
          e.currentTarget.style.borderColor = 'rgba(245, 196, 81, 0.95)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 10px 22px rgba(16, 42, 86, 0.08)';
          e.currentTarget.style.borderColor = activeTab === 'shop'
            ? 'rgba(245, 196, 81, 0.95)'
            : 'rgba(245, 196, 81, 0.48)';
        }}
      >
        <div style={starIconStyle}>
          ⭐
        </div>

        <div>
          <p style={starLabelStyle}>
            Stars
          </p>

          <p style={starCountStyle}>
            {stars}
          </p>
        </div>
      </button>

      <button
        onClick={onLogout}
        style={logoutButtonStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#EF4444';
          e.currentTarget.style.color = 'white';
          e.currentTarget.style.borderColor = '#EF4444';
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 12px 22px rgba(239, 68, 68, 0.18)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(254, 242, 242, 0.9)';
          e.currentTarget.style.color = '#EF4444';
          e.currentTarget.style.borderColor = '#FEE2E2';
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        <LogOut size={18} />
        Log Out
      </button>
    </aside>
  );
}

const sidebarStyle: CSSProperties = {
  width: '280px',
  background: theme.sidebarGlass,
  backdropFilter: 'blur(26px)',
  WebkitBackdropFilter: 'blur(26px)',
  padding: '18px 16px',
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  boxShadow: '8px 0 34px rgba(16, 42, 86, 0.09)',
  borderRight: '1px solid rgba(221, 234, 245, 0.78)',
  overflow: 'hidden',
  position: 'relative',
  fontFamily: '"Plus Jakarta Sans", sans-serif',
  boxSizing: 'border-box',
  isolation: 'isolate'
};

const liquidOneStyle: CSSProperties = {
  position: 'absolute',
  top: '-145px',
  left: '-140px',
  width: '340px',
  height: '340px',
  background:
    'radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.28) 0%, rgba(59, 224, 246, 0.16) 46%, transparent 74%)',
  filter: 'blur(14px)',
  animation: 'sidebarLiquidOne 13s ease-in-out infinite',
  pointerEvents: 'none',
  zIndex: 0
};

const liquidTwoStyle: CSSProperties = {
  position: 'absolute',
  bottom: '-155px',
  right: '-155px',
  width: '350px',
  height: '350px',
  background:
    'radial-gradient(circle at 45% 45%, rgba(27, 245, 169, 0.22) 0%, rgba(59, 224, 246, 0.13) 48%, transparent 75%)',
  filter: 'blur(16px)',
  animation: 'sidebarLiquidTwo 16s ease-in-out infinite',
  pointerEvents: 'none',
  zIndex: 0
};

const liquidThreeStyle: CSSProperties = {
  position: 'absolute',
  top: '42%',
  left: '-90px',
  width: '190px',
  height: '190px',
  background:
    'radial-gradient(circle, rgba(139, 92, 246, 0.13) 0%, rgba(59, 130, 246, 0.08) 52%, transparent 74%)',
  filter: 'blur(14px)',
  animation: 'sidebarLiquidThree 11s ease-in-out infinite',
  pointerEvents: 'none',
  zIndex: 0
};

const logoWrapperStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '70px',
  marginBottom: '8px',
  padding: 0,
  overflow: 'hidden',
  position: 'relative',
  zIndex: 1,
  flexShrink: 0
};

const logoStyle: CSSProperties = {
  width: '220px',
  maxWidth: '100%',
  height: 'auto',
  objectFit: 'contain',
  display: 'block',
  transform: 'translateY(-4px)'
};

const userCardStyle: CSSProperties = {
  background: theme.softCareQuest,
  padding: '14px',
  borderRadius: '22px',
  marginBottom: '18px',
  textAlign: 'center',
  border: '1px solid rgba(191, 223, 255, 0.88)',
  boxShadow:
    '0 14px 28px rgba(16, 42, 86, 0.08), inset 0 1px 0 rgba(255,255,255,0.8)',
  position: 'relative',
  zIndex: 1,
  flexShrink: 0,
  boxSizing: 'border-box'
};

const avatarStyle = (border: string, background: string): CSSProperties => ({
  width: '58px',
  height: '58px',
  background,
  borderRadius: '50%',
  border,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto 10px',
  fontSize: '28px',
  boxShadow:
    '0 10px 22px rgba(59, 130, 246, 0.14), inset 0 1px 0 rgba(255,255,255,0.75)',
  boxSizing: 'border-box',
  animation: 'softAvatarFloat 4s ease-in-out infinite'
});

const welcomeTextStyle: CSSProperties = {
  margin: '0 0 4px',
  fontSize: '12px',
  color: theme.muted,
  fontWeight: '700'
};

const usernameStyle: CSSProperties = {
  margin: 0,
  fontWeight: '900',
  fontSize: '16px',
  color: theme.text
};

const navStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
  flex: 1,
  minHeight: 0,
  overflowY: 'auto',
  overflowX: 'hidden',
  paddingRight: 0,
  position: 'relative',
  zIndex: 1,
  boxSizing: 'border-box'
};

const menuButtonStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '11px',
  padding: '10px 12px',
  borderRadius: '16px',
  border: '1px solid transparent',
  width: '100%',
  minHeight: '50px',
  cursor: 'pointer',
  fontWeight: '850',
  fontSize: '15px',
  transition: 'all 0.25s ease',
  position: 'relative',
  fontFamily: 'inherit',
  boxSizing: 'border-box',
  flexShrink: 0
};

const menuIconStyle = (tone: NavTone, active: boolean): CSSProperties => ({
  width: '34px',
  height: '34px',
  borderRadius: '12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: active ? 'rgba(255,255,255,0.22)' : tone.iconBg,
  color: active ? 'white' : tone.accent,
  boxShadow: active ? 'inset 0 1px 0 rgba(255,255,255,0.26)' : 'none',
  transition: 'all 0.25s ease',
  flexShrink: 0,
  boxSizing: 'border-box'
});

const menuLabelStyle: CSSProperties = {
  flex: 1,
  textAlign: 'left',
  minWidth: 0,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
};

const badgeStyle: CSSProperties = {
  minWidth: '22px',
  height: '22px',
  borderRadius: '999px',
  background: 'linear-gradient(135deg, #FF6B9D 0%, #8B5CF6 100%)',
  color: 'white',
  fontSize: '11px',
  fontWeight: '900',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 8px 16px rgba(255, 107, 157, 0.24)',
  flexShrink: 0
};

const starsCardStyle: CSSProperties = {
  background:
    'linear-gradient(135deg, rgba(255, 251, 235, 0.98) 0%, rgba(254, 243, 199, 0.88) 46%, rgba(255, 247, 237, 0.9) 100%)',
  padding: '14px',
  borderRadius: '20px',
  marginTop: '14px',
  marginBottom: '14px',
  border: '1px solid rgba(245, 196, 81, 0.48)',
  cursor: 'pointer',
  textAlign: 'left',
  transition: 'all 0.25s ease',
  boxShadow: '0 10px 22px rgba(16, 42, 86, 0.08)',
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  position: 'relative',
  zIndex: 1,
  fontFamily: 'inherit',
  overflow: 'hidden',
  flexShrink: 0,
  boxSizing: 'border-box',
  width: '100%'
};

const starIconStyle: CSSProperties = {
  width: '48px',
  height: '48px',
  borderRadius: '16px',
  background:
    'linear-gradient(135deg, rgba(255,255,255,0.88) 0%, rgba(254, 243, 199, 0.72) 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '27px',
  boxShadow:
    '0 10px 20px rgba(245, 196, 81, 0.22), inset 0 1px 0 rgba(255,255,255,0.9)',
  border: '1px solid rgba(245, 196, 81, 0.35)',
  flexShrink: 0,
  boxSizing: 'border-box'
};

const starLabelStyle: CSSProperties = {
  margin: 0,
  fontSize: '11px',
  color: '#92400E',
  fontWeight: '900',
  textTransform: 'uppercase',
  letterSpacing: '0.5px'
};

const starCountStyle: CSSProperties = {
  margin: 0,
  fontWeight: '900',
  fontSize: '22px',
  color: '#D97706'
};

const logoutButtonStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px',
  padding: '12px',
  minHeight: '52px',
  background: 'rgba(254, 242, 242, 0.9)',
  border: '2px solid #FEE2E2',
  borderRadius: '15px',
  color: '#EF4444',
  cursor: 'pointer',
  fontWeight: '900',
  fontSize: '15px',
  transition: 'all 0.25s ease',
  position: 'relative',
  zIndex: 1,
  fontFamily: 'inherit',
  flexShrink: 0,
  boxSizing: 'border-box',
  width: '100%'
};