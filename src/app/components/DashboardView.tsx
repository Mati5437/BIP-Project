import { Search, Bell, Briefcase, Palette, Code, Megaphone, TrendingUp } from 'lucide-react';
import { TopicCard } from './TopicCard';

interface DashboardViewProps {
  username: string;
  ageGroup: string;
  onJoin: () => void;
  onTopic: (topic: string) => void;
}

export function DashboardView({ username, ageGroup, onJoin, onTopic }: DashboardViewProps) {
  // Adapt session title to age group
  const getLiveSessionTitle = () => {
    switch (ageGroup) {
      case 'young':
        return 'Draw a Colorful Logo!';
      case 'teen':
        return 'Design a Logo for a Charity';
      case 'advanced':
        return 'Design a Professional Brand Identity';
      default:
        return 'Design a Logo';
    }
  };

  const getLiveSessionDescription = () => {
    switch (ageGroup) {
      case 'young':
        return 'Join the colorful drawing fun!';
      case 'teen':
        return 'Join a creative session with your peers!';
      case 'advanced':
        return 'Join an advanced design workshop with industry professionals';
      default:
        return 'Join a live session';
    }
  };

  return (
    <div className="animate-fade">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: '800' }}>Hi, {username}! 👋</h2>
        <div style={{ display: 'flex', gap: '15px' }}>
          <div style={{ position: 'relative' }}>
            <Search
              style={{
                position: 'absolute',
                left: '15px',
                top: '12px',
                color: '#94A3B8'
              }}
              size={18}
            />
            <input
              type="text"
              placeholder="Search activities..."
              style={{
                padding: '12px 45px',
                borderRadius: '15px',
                border: '1px solid #E2E8F0',
                width: '250px',
                outline: 'none'
              }}
            />
          </div>
          <div style={{ 
            padding: '12px', 
            backgroundColor: 'white', 
            borderRadius: '15px', 
            border: '1px solid #E2E8F0',
            cursor: 'pointer'
          }}>
            <Bell size={20} color="#64748B"/>
          </div>
        </div>
      </div>

      {/* LIVE SESSION CARD */}
      <div style={{
        background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
        borderRadius: '35px',
        padding: '50px',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        marginBottom: '40px'
      }}>
        <span style={{
          backgroundColor: '#EF4444',
          padding: '6px 15px',
          borderRadius: '20px',
          fontSize: '11px',
          fontWeight: 'bold'
        }}>
          LIVE
        </span>
        <h3 style={{ fontSize: '36px', fontWeight: 'bold', margin: '20px 0 10px' }}>
          {getLiveSessionTitle()}
        </h3>
        <p style={{ marginBottom: '30px', opacity: 0.9 }}>
          {getLiveSessionDescription()}
        </p>
        
        <button 
          onClick={onJoin} 
          style={{ 
            backgroundColor: 'white', 
            color: '#1D4ED8', 
            padding: '15px 30px', 
            borderRadius: '15px', 
            fontWeight: 'bold', 
            border: 'none', 
            cursor: 'pointer', 
            fontSize: '16px',
            transition: 'all 0.3s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          Join Online Lesson Now
        </button>
        
        <div style={{ 
          position: 'absolute', 
          right: '50px', 
          top: '50%', 
          transform: 'translateY(-50%)', 
          fontSize: '150px', 
          opacity: 0.1 
        }}>
          🎨
        </div>
      </div>

      <h3 style={{ marginBottom: '20px', fontSize: '20px', fontWeight: 'bold' }}>
        Browse Topics
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '20px' }}>
        <TopicCard
          icon={<Briefcase size={32}/>}
          label="Business"
          color="#EFF6FF"
          onClick={() => onTopic('business')}
        />
        <TopicCard
          icon={<Palette size={32}/>}
          label="Design"
          color="#F0FDF4"
          onClick={() => onTopic('design')}
        />
        <TopicCard
          icon={<Code size={32}/>}
          label="Coding"
          color="#FFF7ED"
          onClick={() => onTopic('coding')}
        />
        <TopicCard
          icon={<Megaphone size={32}/>}
          label="Marketing"
          color="#FAF5FF"
          onClick={() => onTopic('marketing')}
        />
        <TopicCard
          icon={<TrendingUp size={32}/>}
          label="Finance"
          color="#FEFCE8"
          onClick={() => onTopic('finance')}
        />
      </div>
    </div>
  );
}
