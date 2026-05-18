import { Home, Video, Trophy, MessageSquare, Star, LogOut } from 'lucide-react';

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
}

function MenuBtn({ icon, label, active, onClick, badge }: MenuBtnProps) {
  return (
    <button 
      onClick={onClick} 
      style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '15px', 
        padding: '12px 20px', 
        borderRadius: '15px', 
        border: 'none', 
        width: '100%', 
        cursor: 'pointer', 
        backgroundColor: active ? '#3B82F6' : 'transparent', 
        color: active ? 'white' : '#94A3B8', 
        fontWeight: active ? 'bold' : '500',
        transition: 'all 0.3s'
      }}
    >
      {icon} 
      <span style={{ flex: 1, textAlign: 'left' }}>{label}</span>
      {badge && (
        <span style={{ 
          backgroundColor: '#EF4444', 
          color: 'white', 
          fontSize: '10px', 
          padding: '2px 8px', 
          borderRadius: '20px' 
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
      backgroundColor: '#0A2E6E', 
      color: 'white', 
      padding: '30px 20px', 
      display: 'flex', 
      flexDirection: 'column',
      height: '100vh'
    }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '12px', 
        marginBottom: '40px', 
        paddingLeft: '10px' 
      }}>
        <div style={{ 
          width: '40px', 
          height: '40px', 
          backgroundColor: 'white', 
          borderRadius: '12px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          color: '#0A2E6E', 
          fontWeight: 'bold' 
        }}>
          C
        </div>
        <h1 style={{ fontSize: '20px', fontWeight: 'bold', margin: 0 }}>CareQuest</h1>
      </div>

      <div style={{ 
        backgroundColor: 'rgba(255,255,255,0.1)', 
        padding: '15px', 
        borderRadius: '15px', 
        marginBottom: '30px',
        textAlign: 'center'
      }}>
        <p style={{ margin: 0, fontSize: '12px', opacity: 0.7 }}>Zalogowany jako</p>
        <p style={{ margin: '5px 0 0 0', fontWeight: 'bold', fontSize: '16px' }}>{username}</p>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
        <MenuBtn 
          active={activeTab === 'home'} 
          onClick={() => onTabChange('home')} 
          icon={<Home size={20}/>} 
          label="Strona główna" 
        />
        <MenuBtn 
          active={activeTab === 'live_session'} 
          onClick={() => onTabChange('live_session')} 
          icon={<Video size={20}/>} 
          label="Lekcje na żywo" 
        />
        <MenuBtn 
          active={activeTab === 'achievements'} 
          onClick={() => onTabChange('achievements')} 
          icon={<Trophy size={20}/>} 
          label="Osiągnięcia" 
        />
        <MenuBtn 
          active={activeTab === 'messages'} 
          onClick={() => onTabChange('messages')} 
          icon={<MessageSquare size={20}/>} 
          label="Wiadomości" 
          badge="3" 
        />
      </nav>
      
      <div style={{ 
        backgroundColor: 'rgba(255,255,255,0.05)', 
        padding: '20px', 
        borderRadius: '24px',
        marginBottom: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ 
            backgroundColor: '#FFD700', 
            width: '36px', 
            height: '36px', 
            borderRadius: '50%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            color: '#000' 
          }}>
            <Star size={18} fill="currentColor"/>
          </div>
          <div>
            <p style={{ margin: 0, fontSize: '10px', opacity: 0.6, fontWeight: 'bold' }}>
              MONETY TROSKI
            </p>
            <p style={{ margin: 0, fontWeight: 'bold', fontSize: '18px' }}>240</p>
          </div>
        </div>
      </div>

      <button
        onClick={onLogout}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          padding: '12px',
          backgroundColor: 'rgba(239, 68, 68, 0.2)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          borderRadius: '12px',
          color: '#FCA5A5',
          cursor: 'pointer',
          fontWeight: 'bold',
          transition: 'all 0.3s'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#EF4444';
          e.currentTarget.style.color = 'white';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.2)';
          e.currentTarget.style.color = '#FCA5A5';
        }}
      >
        <LogOut size={18} />
        Wyloguj
      </button>
    </div>
  );
}
