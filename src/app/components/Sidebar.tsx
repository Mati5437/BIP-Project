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
    'linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(247,252,255,0.9) 100%)',
  softCareQuest:
    'linear-gradient(135deg, rgba(238,247,255,0.96) 0%, rgba(233,252,255,0.92) 52%, rgba(236,255,248,0.9) 100%)'
};

const navTones = {
  home: {
    accent: '#3B82F6',
    gradient: 'linear-gradient(135deg, #3B82F6 0%, #3BE0F6 100%)',
    soft: 'linear-gradient(135deg, rgba(239,246,255,0.92) 0%, rgba(236,254,255,0.82) 100%)',
    iconBg: 'rgba(59, 130, 246, 0.11)',
    border: 'rgba(147, 197, 253, 0.55)',
    borderStrong: 'rgba(59, 130, 246, 0.42)',
    shadow: 'rgba(59, 130, 246, 0.22)'
  },
  schedule: {
    accent: '#0891B2',
    gradient: 'linear-gradient(135deg, #3BE0F6 0%, #1BF5A9 100%)',
    soft: 'linear-gradient(135deg, rgba(236,254,255,0.92) 0%, rgba(236,255,248,0.82) 100%)',
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
        boxShadow: active ? `0 13px 26px ${tone.shadow}` : 'none'
      }}
      onMouseEnter={(e) => {
        if (!active) {
          e.currentTarget.style.background = tone.soft;
          e.currentTarget.style.color = theme.text;
          e.currentTarget.style.transform = 'translateX(4px)';
          e.currentTarget.style.boxShadow = `0 12px 24px ${tone.shadow}`;
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

      <span style={{ flex: 1, textAlign: 'left' }}>
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
    'avatar-sunny': { emoji: '😊', background: '#EFF6FF' },
    'avatar-artist': { emoji: '🎨', background: '#E9FCFF' },
    'avatar-robot': { emoji: '🤖', background: '#F0FFFA' },
    'avatar-space': { emoji: '🚀', background: '#EAF3FF' }
  };

  const getFrameStyle = () => {
    if (equippedFrame === 'rainbow-frame') return '4px solid #3BE0F6';
    if (equippedFrame === 'gold-frame') return '4px solid #F5C451';
    if (equippedFrame === 'heart-frame') return '4px solid #3B82F6';

    return '4px solid rgba(59, 224, 246, 0.72)';
  };

  const avatar = avatarMap[equippedAvatar] ?? avatarMap['avatar-sunny'];

  return (
    <aside style={sidebarStyle}>
      <div style={topGlowStyle} />
      <div style={bottomGlowStyle} />

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

      <nav style={navStyle}>
        <MenuBtn
          active={activeTab === 'home'}
          onClick={() => onTabChange('home')}
          icon={<Home size={20} />}
          label="Home"
          tone={navTones.home}
        />

        <MenuBtn
          active={activeTab === 'schedule'}
          onClick={() => onTabChange('schedule')}
          icon={<CalendarDays size={20} />}
          label="Schedule"
          tone={navTones.schedule}
        />

        <MenuBtn
          active={activeTab === 'activities'}
          onClick={() => onTabChange('activities')}
          icon={<Sparkles size={20} />}
          label="Activities"
          tone={navTones.activities}
        />

        <MenuBtn
          active={activeTab === 'shop'}
          onClick={() => onTabChange('shop')}
          icon={<ShoppingBag size={20} />}
          label="Shop"
          tone={navTones.shop}
        />

        <MenuBtn
          active={activeTab === 'achievements'}
          onClick={() => onTabChange('achievements')}
          icon={<Trophy size={20} />}
          label="Achievements"
          tone={navTones.achievements}
        />

        <MenuBtn
          active={activeTab === 'messages'}
          onClick={() => onTabChange('messages')}
          icon={<MessageSquare size={20} />}
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
          e.currentTarget.style.transform = 'translateY(-3px)';
          e.currentTarget.style.boxShadow = '0 16px 30px rgba(245, 196, 81, 0.24)';
          e.currentTarget.style.borderColor = 'rgba(245, 196, 81, 0.95)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 12px 24px rgba(16, 42, 86, 0.08)';
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
          e.currentTarget.style.boxShadow = '0 14px 26px rgba(239, 68, 68, 0.18)';
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
  backdropFilter: 'blur(24px)',
  WebkitBackdropFilter: 'blur(24px)',
  padding: '22px 16px',
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  boxShadow: '8px 0 32px rgba(16, 42, 86, 0.08)',
  borderRight: '1px solid rgba(221, 234, 245, 0.78)',
  overflow: 'hidden',
  position: 'relative',
  fontFamily: '"Plus Jakarta Sans", sans-serif'
};

const topGlowStyle: CSSProperties = {
  position: 'absolute',
  top: '-165px',
  left: '-125px',
  width: '330px',
  height: '330px',
  borderRadius: '999px',
  background:
    'radial-gradient(circle, rgba(59, 224, 246, 0.22) 0%, rgba(59, 130, 246, 0.12) 46%, transparent 72%)',
  filter: 'blur(16px)',
  pointerEvents: 'none'
};

const bottomGlowStyle: CSSProperties = {
  position: 'absolute',
  bottom: '-170px',
  right: '-150px',
  width: '330px',
  height: '330px',
  borderRadius: '999px',
  background:
    'radial-gradient(circle, rgba(27, 245, 169, 0.18) 0%, rgba(245, 196, 81, 0.08) 45%, transparent 74%)',
  filter: 'blur(18px)',
  pointerEvents: 'none'
};

const logoWrapperStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '86px',
  marginBottom: '8px',
  padding: 0,
  overflow: 'hidden',
  position: 'relative',
  zIndex: 1
};

const logoStyle: CSSProperties = {
  width: '235px',
  maxWidth: '100%',
  height: 'auto',
  objectFit: 'contain',
  display: 'block',
  transform: 'translateY(-6px)'
};

const userCardStyle: CSSProperties = {
  background: theme.softCareQuest,
  padding: '16px',
  borderRadius: '22px',
  marginBottom: '22px',
  textAlign: 'center',
  border: '1px solid rgba(191, 223, 255, 0.88)',
  boxShadow: '0 14px 28px rgba(16, 42, 86, 0.08)',
  position: 'relative',
  zIndex: 1
};

const avatarStyle = (border: string, background: string): CSSProperties => ({
  width: '62px',
  height: '62px',
  background,
  borderRadius: '50%',
  border,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto 12px',
  fontSize: '30px',
  boxShadow: '0 10px 22px rgba(59, 130, 246, 0.16)'
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
  fontSize: '17px',
  color: theme.text
};

const navStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '7px',
  flex: 1,
  overflowY: 'auto',
  paddingRight: '2px',
  position: 'relative',
  zIndex: 1
};

const menuButtonStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '12px 13px',
  borderRadius: '17px',
  border: '1px solid transparent',
  width: '100%',
  cursor: 'pointer',
  fontWeight: '850',
  fontSize: '15px',
  transition: 'all 0.25s ease',
  position: 'relative',
  fontFamily: 'inherit'
};

const menuIconStyle = (tone: NavTone, active: boolean): CSSProperties => ({
  width: '34px',
  height: '34px',
  borderRadius: '12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: active ? 'rgba(255,255,255,0.20)' : tone.iconBg,
  color: active ? 'white' : tone.accent,
  boxShadow: active ? 'inset 0 1px 0 rgba(255,255,255,0.26)' : 'none',
  transition: 'all 0.25s ease',
  flexShrink: 0
});

const badgeStyle: CSSProperties = {
  minWidth: '23px',
  height: '23px',
  borderRadius: '999px',
  background: 'linear-gradient(135deg, #FF6B9D 0%, #8B5CF6 100%)',
  color: 'white',
  fontSize: '11px',
  fontWeight: '900',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 8px 16px rgba(255, 107, 157, 0.24)'
};

const starsCardStyle: CSSProperties = {
  background:
    'linear-gradient(135deg, rgba(255, 251, 235, 0.98) 0%, rgba(254, 243, 199, 0.88) 46%, rgba(255, 247, 237, 0.9) 100%)',
  padding: '17px',
  borderRadius: '22px',
  marginTop: '16px',
  marginBottom: '16px',
  border: '1px solid rgba(245, 196, 81, 0.48)',
  cursor: 'pointer',
  textAlign: 'left',
  transition: 'all 0.25s ease',
  boxShadow: '0 12px 24px rgba(16, 42, 86, 0.08)',
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  position: 'relative',
  zIndex: 1,
  fontFamily: 'inherit',
  overflow: 'hidden'
};

const starIconStyle: CSSProperties = {
  width: '52px',
  height: '52px',
  borderRadius: '17px',
  background:
    'linear-gradient(135deg, rgba(255,255,255,0.88) 0%, rgba(254, 243, 199, 0.72) 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '29px',
  boxShadow:
    '0 10px 20px rgba(245, 196, 81, 0.22), inset 0 1px 0 rgba(255,255,255,0.9)',
  border: '1px solid rgba(245, 196, 81, 0.35)'
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
  fontSize: '23px',
  color: '#D97706'
};

const logoutButtonStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px',
  padding: '14px',
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
  fontFamily: 'inherit'
};