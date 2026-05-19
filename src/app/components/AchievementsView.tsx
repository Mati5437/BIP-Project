import { Star } from 'lucide-react';

interface AchievementsViewProps {
  ageGroup: string;
}

export function AchievementsView({ ageGroup }: AchievementsViewProps) {
  const categories = [
    {
      name: ageGroup === 'advanced' ? 'Creative Mastery' : 'Creative Explorer',
      icon: '🎨',
      progress: 85,
      color: '#F0FDF4',
      textColor: '#166534'
    },
    {
      name: ageGroup === 'advanced' ? 'Coding Expert' : 'Coding Ninja',
      icon: '💻',
      progress: 40,
      color: '#EFF6FF',
      textColor: '#1E40AF'
    },
    {
      name: ageGroup === 'advanced' ? 'Leadership' : 'Social Hero',
      icon: '🤝',
      progress: 100,
      color: '#FEFCE8',
      textColor: '#854D0E'
    }
  ];

  const getBadges = () => {
    if (ageGroup === 'young') {
      return [
        { id: 1, title: 'First Lesson!', desc: 'Completed your first lesson', status: 'Unlocked', icon: '🌟', rarity: 'Common' },
        { id: 2, title: 'Young Artist', desc: 'Created your first logo', status: 'Unlocked', icon: '🖋️', rarity: 'Rare' },
        { id: 3, title: 'Weekly Champion', desc: 'Logged in for 7 days in a row', status: 'Unlocked', icon: '🔥', rarity: 'Epic' },
        { id: 4, title: 'Super Helper', desc: 'Helped 3 other students', status: 'Locked', icon: '👑', rarity: 'Legendary' },
        { id: 5, title: 'Quick Learner', desc: 'Completed 3 topics in one day', status: 'Locked', icon: '⚡', rarity: 'Rare' },
        { id: 6, title: 'Bug Detective', desc: 'Found and reported a problem', status: 'Locked', icon: '🐞', rarity: 'Common' }
      ];
    } else if (ageGroup === 'teen') {
      return [
        { id: 1, title: 'First Lesson', desc: 'Completed your first live session', status: 'Unlocked', icon: '🌟', rarity: 'Common' },
        { id: 2, title: 'Logo Master', desc: 'Designed a logo for a charity', status: 'Unlocked', icon: '🖋️', rarity: 'Rare' },
        { id: 3, title: '7-Day Streak', desc: 'Logged in for 7 days in a row', status: 'Unlocked', icon: '🔥', rarity: 'Epic' },
        { id: 4, title: 'Community Leader', desc: 'Helped 5 other students', status: 'Locked', icon: '👑', rarity: 'Legendary' },
        { id: 5, title: 'Quick Learner', desc: 'Completed 3 topics in one day', status: 'Locked', icon: '⚡', rarity: 'Rare' },
        { id: 6, title: 'Bug Hunter', desc: 'Reported a problem or fixed code', status: 'Locked', icon: '🐞', rarity: 'Common' }
      ];
    } else {
      return [
        { id: 1, title: 'First Professional Session', desc: 'Completed your first advanced workshop', status: 'Unlocked', icon: '🌟', rarity: 'Common' },
        { id: 2, title: 'Brand Identity Expert', desc: 'Created a complete brand identity', status: 'Unlocked', icon: '🖋️', rarity: 'Rare' },
        { id: 3, title: '30-Day Commitment', desc: 'Logged in for 30 consecutive days', status: 'Unlocked', icon: '🔥', rarity: 'Epic' },
        { id: 4, title: 'Mentor Status', desc: 'Helped 10 other students succeed', status: 'Locked', icon: '👑', rarity: 'Legendary' },
        { id: 5, title: 'Speed Runner', desc: 'Completed 5 advanced courses in one week', status: 'Locked', icon: '⚡', rarity: 'Rare' },
        { id: 6, title: 'Code Contributor', desc: 'Contributed to open source project', status: 'Locked', icon: '🐞', rarity: 'Common' }
      ];
    }
  };

  const badges = getBadges();

  return (
    <div style={{ padding: '40px', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: '40px'
      }}>
        <div>
          <h2 style={{
            fontSize: '32px',
            fontWeight: '800',
            color: '#1E293B',
            margin: 0,
            marginBottom: '8px'
          }}>
            My Achievements 🏆
          </h2>
          <p style={{ color: '#64748B', margin: 0, fontSize: '16px' }}>
            Track your progress and collect unique badges!
          </p>
        </div>
        <div style={{
          background: 'linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 100%)',
          padding: '20px 28px',
          borderRadius: '16px',
          textAlign: 'center',
          border: '2px solid #FED7AA'
        }}>
          <span style={{ fontSize: '14px', fontWeight: '700', color: '#92400E', display: 'block', marginBottom: '4px' }}>
            Total Care Coins
          </span>
          <div style={{
            fontSize: '32px',
            fontWeight: '800',
            color: '#F59E0B',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            justifyContent: 'center'
          }}>
            <span>⭐</span> 120
          </div>
        </div>
      </div>

      {/* PROGRESS TRACKERS */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '20px',
        marginBottom: '40px'
      }}>
        {categories.map((cat, i) => (
          <div
            key={i}
            style={{
              backgroundColor: 'white',
              padding: '28px',
              borderRadius: '20px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
              transition: 'all 0.3s',
              border: '2px solid #F1F5F9'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)';
              e.currentTarget.style.borderColor = cat.textColor;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.06)';
              e.currentTarget.style.borderColor = '#F1F5F9';
            }}
          >
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              marginBottom: '15px' 
            }}>
              <span style={{ fontSize: '24px' }}>{cat.icon}</span>
              <span style={{ 
                fontWeight: 'bold', 
                color: cat.textColor, 
                fontSize: '14px', 
                backgroundColor: cat.color, 
                padding: '4px 10px', 
                borderRadius: '10px' 
              }}>
                {cat.progress}%
              </span>
            </div>
            <h4 style={{ margin: '0 0 10px 0', color: '#1E293B' }}>{cat.name}</h4>
            <div style={{ 
              width: '100%', 
              height: '8px', 
              backgroundColor: '#F1F5F9', 
              borderRadius: '10px', 
              overflow: 'hidden' 
            }}>
              <div style={{ 
                width: `${cat.progress}%`, 
                height: '100%', 
                backgroundColor: cat.textColor, 
                borderRadius: '10px', 
                transition: 'width 1s ease-in-out' 
              }}></div>
            </div>
          </div>
        ))}
      </div>

      {/* BADGE GRID */}
      <h3 style={{
        fontSize: '22px',
        fontWeight: '700',
        marginBottom: '20px',
        color: '#1E293B'
      }}>
        Badge Collection
      </h3>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: '20px'
      }}>
        {badges.map((badge) => (
          <div
            key={badge.id}
            style={{
              backgroundColor: 'white',
              padding: '28px',
              borderRadius: '20px',
              textAlign: 'center',
              position: 'relative',
              opacity: badge.status === 'Locked' ? 0.5 : 1,
              filter: badge.status === 'Locked' ? 'grayscale(0.8)' : 'none',
              border: badge.status === 'Unlocked' ? '3px solid #14B8A6' : '2px dashed #CBD5E1',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              boxShadow: badge.status === 'Unlocked' ? '0 4px 12px rgba(20, 184, 166, 0.15)' : 'none'
            }}
            onMouseEnter={(e) => {
              if (badge.status === 'Unlocked') {
                e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(20, 184, 166, 0.25)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              if (badge.status === 'Unlocked') {
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(20, 184, 166, 0.15)';
              }
            }}
          >
            {badge.status === 'Locked' && (
              <div style={{ 
                position: 'absolute', 
                top: '15px', 
                right: '15px', 
                fontSize: '14px' 
              }}>
                🔒
              </div>
            )}
            
            <div style={{ 
              width: '80px', 
              height: '80px', 
              backgroundColor: '#F8FAFC', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              fontSize: '40px', 
              margin: '0 auto 15px auto', 
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)' 
            }}>
              {badge.icon}
            </div>
            
            <h5 style={{ 
              margin: '0 0 5px 0', 
              fontSize: '16px', 
              color: '#0F172A' 
            }}>
              {badge.title}
            </h5>
            <p style={{ 
              margin: 0, 
              fontSize: '12px', 
              color: '#64748B', 
              lineHeight: '1.4' 
            }}>
              {badge.desc}
            </p>
            
            <div style={{ marginTop: '15px' }}>
              <span style={{
                fontSize: '10px',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                color: badge.rarity === 'Legendary' ? '#7C3AED' :
                       badge.rarity === 'Epic' ? '#DB2777' : '#64748B'
              }}>
                {badge.rarity}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
