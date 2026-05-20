import type { ReactNode } from 'react';
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

interface MenuBtnProps {
  icon: ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
  badge?: string;
  color?: string;
}

function MenuBtn({
  icon,
  label,
  active,
  onClick,
  badge,
  color = '#14B8A6'
}: MenuBtnProps) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '14px 16px',
        borderRadius: '16px',
        border: 'none',
        width: '100%',
        cursor: 'pointer',
        backgroundColor: active ? color : 'transparent',
        color: active ? 'white' : '#64748B',
        fontWeight: active ? '800' : '700',
        fontSize: '15px',
        transition: 'all 0.25s ease',
        position: 'relative'
      }}
      onMouseEnter={(e) => {
        if (!active) {
          e.currentTarget.style.backgroundColor = '#F8FAFC';
          e.currentTarget.style.color = '#1E293B';
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.color = '#64748B';
        }
      }}
    >
      {icon}

      <span style={{ flex: 1, textAlign: 'left' }}>
        {label}
      </span>

      {badge && (
        <span
          style={{
            backgroundColor: '#FF6B9D',
            color: 'white',
            fontSize: '11px',
            padding: '3px 8px',
            borderRadius: '100px',
            fontWeight: '800'
          }}
        >
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
    'avatar-space': { emoji: '🚀', background: '#DBEAFE' }
  };

  const getFrameStyle = () => {
    if (equippedFrame === 'rainbow-frame') return '4px solid #FF6B9D';
    if (equippedFrame === 'gold-frame') return '4px solid #F59E0B';
    if (equippedFrame === 'heart-frame') return '4px solid #EC4899';

    return '4px solid #99F6E4';
  };

  const avatar = avatarMap[equippedAvatar] ?? avatarMap['avatar-sunny'];

  return (
    <div
      style={{
        width: '280px',
        background: 'white',
        padding: '22px 16px',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        boxShadow: '4px 0 12px rgba(0,0,0,0.04)',
        borderRight: '1px solid #F1F5F9',
        overflow: 'hidden'
      }}
    >
      {/* Logo */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '86px',
          marginBottom: '1px',
          padding: 0,
          overflow: 'hidden'
        }}
      >
        <img
          src={careQuestFullLogo}
          alt="CareQuest logo"
          style={{
            width: '235px',
            maxWidth: '100%',
            height: 'auto',
            objectFit: 'contain',
            display: 'block',
            transform: 'translateY(-6px)'
          }}
        />
      </div>

      {/* User Card */}
      <div
        style={{
          background: 'linear-gradient(135deg, #F0FDFA 0%, #CCFBF1 100%)',
          padding: '16px',
          borderRadius: '18px',
          marginBottom: '22px',
          textAlign: 'center',
          border: '2px solid #99F6E4'
        }}
      >
        <div
          style={{
            width: '62px',
            height: '62px',
            background: avatar.background,
            borderRadius: '50%',
            border: getFrameStyle(),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 12px',
            fontSize: '30px',
            boxShadow: '0 4px 12px rgba(20, 184, 166, 0.18)'
          }}
        >
          {avatar.emoji}
        </div>

        <p
          style={{
            margin: 0,
            fontSize: '12px',
            color: '#64748B',
            marginBottom: '4px'
          }}
        >
          Welcome back
        </p>

        <p
          style={{
            margin: 0,
            fontWeight: '900',
            fontSize: '17px',
            color: '#1E293B'
          }}
        >
          {username}
        </p>
      </div>

      {/* Navigation */}
      <nav
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          flex: 1,
          overflowY: 'auto',
          paddingRight: '2px'
        }}
      >
        <MenuBtn
          active={activeTab === 'home'}
          onClick={() => onTabChange('home')}
          icon={<Home size={20} />}
          label="Home"
          color="#14B8A6"
        />

        <MenuBtn
          active={activeTab === 'schedule'}
          onClick={() => onTabChange('schedule')}
          icon={<CalendarDays size={20} />}
          label="Schedule"
          color="#0EA5E9"
        />

        <MenuBtn
          active={activeTab === 'activities'}
          onClick={() => onTabChange('activities')}
          icon={<Sparkles size={20} />}
          label="Activities"
          color="#3B82F6"
        />

        <MenuBtn
          active={activeTab === 'shop'}
          onClick={() => onTabChange('shop')}
          icon={<ShoppingBag size={20} />}
          label="Shop"
          color="#14B8A6"
        />

        <MenuBtn
          active={activeTab === 'achievements'}
          onClick={() => onTabChange('achievements')}
          icon={<Trophy size={20} />}
          label="Achievements"
          color="#F59E0B"
        />

        <MenuBtn
          active={activeTab === 'messages'}
          onClick={() => onTabChange('messages')}
          icon={<MessageSquare size={20} />}
          label="Messages"
          badge="3"
          color="#8B5CF6"
        />
      </nav>

      {/* Stars Card */}
      <button
        onClick={() => onTabChange('shop')}
        style={{
          background: 'linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 100%)',
          padding: '20px',
          borderRadius: '18px',
          marginTop: '16px',
          marginBottom: '16px',
          border: activeTab === 'shop' ? '2px solid #F59E0B' : '2px solid #FED7AA',
          cursor: 'pointer',
          textAlign: 'left',
          transition: 'all 0.25s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 8px 18px rgba(245, 158, 11, 0.18)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}
        >
          <div style={{ fontSize: '32px' }}>
            ⭐
          </div>

          <div>
            <p
              style={{
                margin: 0,
                fontSize: '11px',
                color: '#92400E',
                fontWeight: '800',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}
            >
              Stars
            </p>

            <p
              style={{
                margin: 0,
                fontWeight: '900',
                fontSize: '22px',
                color: '#F59E0B'
              }}
            >
              {stars}
            </p>
          </div>
        </div>
      </button>

      {/* Logout Button */}
      <button
        onClick={onLogout}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          padding: '14px',
          backgroundColor: '#FEF2F2',
          border: '2px solid #FEE2E2',
          borderRadius: '14px',
          color: '#EF4444',
          cursor: 'pointer',
          fontWeight: '800',
          fontSize: '15px',
          transition: 'all 0.25s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#EF4444';
          e.currentTarget.style.color = 'white';
          e.currentTarget.style.borderColor = '#EF4444';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#FEF2F2';
          e.currentTarget.style.color = '#EF4444';
          e.currentTarget.style.borderColor = '#FEE2E2';
        }}
      >
        <LogOut size={18} />
        Log Out
      </button>
    </div>
  );
}