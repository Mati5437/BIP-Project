import { Home, Sparkles, Trophy, MessageSquare, Heart, LogOut } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  username: string;
  onLogout: () => void;
}

interface MenuBtnProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
  badge?: string;
  color?: string;
}

function MenuBtn({ icon, label, active, onClick, badge, color = '#14B8A6' }: MenuBtnProps) {
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
        fontWeight: active ? '700' : '600',
        fontSize: '15px',
        transition: 'all 0.3s',
        position: 'relative'
      }}
      onMouseEnter={(e) => {
        if (!active) {
          e.currentTarget.style.backgroundColor = '#F8FAFC';
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          e.currentTarget.style.backgroundColor = 'transparent';
        }
      }}
    >
      {icon}
      <span style={{ flex: 1, textAlign: 'left' }}>{label}</span>
      {badge && (
        <span style={{
          backgroundColor: '#FF6B9D',
          color: 'white',
          fontSize: '11px',
          padding: '3px 8px',
          borderRadius: '100px',
          fontWeight: '700'
        }}>
          {badge}
        </span>
      )}
    </button>
  );
}

export function Sidebar({ activeTab, onTabChange, username, onLogout }: SidebarProps) {
  return (
    <div style={{
      width: '280px',
      background: 'white',
      padding: '24px 16px',
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      boxShadow: '4px 0 12px rgba(0,0,0,0.04)',
      borderRight: '1px solid #F1F5F9'
    }}>
      {/* Logo */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '32px',
        paddingLeft: '8px'
      }}>
        <div style={{
          width: '48px',
          height: '48px',
          background: 'linear-gradient(135deg, #14B8A6 0%, #06B6D4 100%)',
          borderRadius: '14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(20, 184, 166, 0.25)'
        }}>
          <Heart size={26} color="white" fill="white" />
        </div>
        <h1 style={{
          fontSize: '22px',
          fontWeight: '800',
          margin: 0,
          background: 'linear-gradient(135deg, #14B8A6 0%, #06B6D4 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          CareQuest
        </h1>
      </div>

      {/* User Card */}
      <div style={{
        background: 'linear-gradient(135deg, #F0FDFA 0%, #CCFBF1 100%)',
        padding: '16px',
        borderRadius: '16px',
        marginBottom: '24px',
        textAlign: 'center',
        border: '2px solid #99F6E4'
      }}>
        <div style={{
          width: '56px',
          height: '56px',
          background: 'linear-gradient(135deg, #14B8A6 0%, #06B6D4 100%)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 12px',
          fontSize: '24px',
          boxShadow: '0 4px 12px rgba(20, 184, 166, 0.25)'
        }}>
          👋
        </div>
        <p style={{
          margin: 0,
          fontSize: '12px',
          color: '#64748B',
          marginBottom: '4px'
        }}>
          Welcome back
        </p>
        <p style={{
          margin: 0,
          fontWeight: '800',
          fontSize: '17px',
          color: '#1E293B'
        }}>
          {username}
        </p>
      </div>

      {/* Navigation */}
      <nav style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        flex: 1
      }}>
        <MenuBtn
          active={activeTab === 'home'}
          onClick={() => onTabChange('home')}
          icon={<Home size={20} />}
          label="Home"
          color="#14B8A6"
        />
        <MenuBtn
          active={activeTab === 'activities'}
          onClick={() => onTabChange('activities')}
          icon={<Sparkles size={20} />}
          label="Activities"
          color="#3B82F6"
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

      {/* Care Coins Card */}
      <div style={{
        background: 'linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 100%)',
        padding: '20px',
        borderRadius: '18px',
        marginBottom: '16px',
        border: '2px solid #FED7AA'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <div style={{
            fontSize: '32px'
          }}>
            ⭐
          </div>
          <div>
            <p style={{
              margin: 0,
              fontSize: '11px',
              color: '#92400E',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Care Coins
            </p>
            <p style={{
              margin: 0,
              fontWeight: '800',
              fontSize: '22px',
              color: '#F59E0B'
            }}>
              120
            </p>
          </div>
        </div>
      </div>

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
          fontWeight: '700',
          fontSize: '15px',
          transition: 'all 0.3s'
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
