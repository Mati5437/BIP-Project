import { Star } from 'lucide-react';

interface AchievementsViewProps {
  ageGroup: string;
}

export function AchievementsView({ ageGroup }: AchievementsViewProps) {
  const categories = [
    { 
      name: ageGroup === 'advanced' ? 'Creative Mastery' : 'Kreatywny Odkrywca', 
      icon: '🎨', 
      progress: 85, 
      color: '#F0FDF4', 
      textColor: '#166534' 
    },
    { 
      name: ageGroup === 'advanced' ? 'Coding Expert' : 'Ninja Programowania', 
      icon: '💻', 
      progress: 40, 
      color: '#EFF6FF', 
      textColor: '#1E40AF' 
    },
    { 
      name: ageGroup === 'advanced' ? 'Leadership' : 'Społeczny Bohater', 
      icon: '🤝', 
      progress: 100, 
      color: '#FEFCE8', 
      textColor: '#854D0E' 
    }
  ];

  const getBadges = () => {
    if (ageGroup === 'young') {
      return [
        { id: 1, title: 'Pierwsza lekcja!', desc: 'Ukończyłeś swoją pierwszą lekcję', status: 'Unlocked', icon: '🌟', rarity: 'Zwykła' },
        { id: 2, title: 'Młody Artysta', desc: 'Stworzyłeś swoje pierwsze logo', status: 'Unlocked', icon: '🖋️', rarity: 'Rzadka' },
        { id: 3, title: 'Tygodniowy mistrz', desc: 'Logowałeś się przez 7 dni z rzędu', status: 'Unlocked', icon: '🔥', rarity: 'Epicka' },
        { id: 4, title: 'Super pomocnik', desc: 'Pomogłeś 3 innym uczniom', status: 'Locked', icon: '👑', rarity: 'Legendarna' },
        { id: 5, title: 'Szybki uczeń', desc: 'Ukończyłeś 3 tematy w jeden dzień', status: 'Locked', icon: '⚡', rarity: 'Rzadka' },
        { id: 6, title: 'Detektyw błędów', desc: 'Znalazłeś i zgłosiłeś problem', status: 'Locked', icon: '🐞', rarity: 'Zwykła' }
      ];
    } else if (ageGroup === 'teen') {
      return [
        { id: 1, title: 'Pierwsza lekcja', desc: 'Ukończyłeś swoją pierwszą sesję na żywo', status: 'Unlocked', icon: '🌟', rarity: 'Zwykła' },
        { id: 2, title: 'Mistrz Logo', desc: 'Zaprojektowałeś logo dla organizacji', status: 'Unlocked', icon: '🖋️', rarity: 'Rzadka' },
        { id: 3, title: '7-dniowa passa', desc: 'Logowałeś się przez 7 dni z rzędu', status: 'Unlocked', icon: '🔥', rarity: 'Epicka' },
        { id: 4, title: 'Lider społeczności', desc: 'Pomogłeś 5 innym uczniom', status: 'Locked', icon: '👑', rarity: 'Legendarna' },
        { id: 5, title: 'Szybki uczeń', desc: 'Ukończyłeś 3 tematy w jeden dzień', status: 'Locked', icon: '⚡', rarity: 'Rzadka' },
        { id: 6, title: 'Łowca błędów', desc: 'Zgłosiłeś problem lub naprawiłeś kod', status: 'Locked', icon: '🐞', rarity: 'Zwykła' }
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
    <div style={{ animation: 'fadeIn 0.6s ease', paddingBottom: '40px' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'flex-end', 
        marginBottom: '40px' 
      }}>
        <div>
          <h2 style={{ 
            fontSize: '32px', 
            fontWeight: '900', 
            color: '#0A2E6E', 
            margin: 0 
          }}>
            {ageGroup === 'advanced' ? 'My Achievements 🏆' : 'Moje Osiągnięcia 🏆'}
          </h2>
          <p style={{ color: '#64748B', marginTop: '5px' }}>
            {ageGroup === 'advanced' 
              ? 'Track your progress and collect unique badges!' 
              : 'Śledź swoje postępy i zbieraj unikalne odznaki!'}
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#64748B' }}>
            {ageGroup === 'advanced' ? 'Total Care Coins:' : 'Wszystkie Monety Troski:'}
          </span>
          <h3 style={{ margin: 0, color: '#F59E0B', fontSize: '24px' }}>✨ 240</h3>
        </div>
      </div>

      {/* PROGRESS TRACKERS */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '20px', 
        marginBottom: '40px' 
      }}>
        {categories.map((cat, i) => (
          <div 
            key={i} 
            style={{ 
              backgroundColor: 'white', 
              padding: '25px', 
              borderRadius: '25px', 
              boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 15px 25px -5px rgba(0,0,0,0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0,0,0,0.05)';
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
        fontSize: '20px', 
        fontWeight: 'bold', 
        marginBottom: '20px', 
        color: '#1E293B' 
      }}>
        {ageGroup === 'advanced' ? 'Badge Collection' : 'Kolekcja odznak'}
      </h3>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
        gap: '20px' 
      }}>
        {badges.map((badge) => (
          <div 
            key={badge.id} 
            style={{ 
              backgroundColor: 'white', 
              padding: '25px', 
              borderRadius: '30px', 
              textAlign: 'center', 
              position: 'relative',
              opacity: badge.status === 'Locked' ? 0.6 : 1,
              filter: badge.status === 'Locked' ? 'grayscale(1)' : 'none',
              border: badge.status === 'Unlocked' ? '2px solid #E2E8F0' : '2px dashed #CBD5E1',
              transition: 'transform 0.3s ease',
              cursor: 'pointer'
            }} 
            onMouseEnter={(e) => {
              if (badge.status === 'Unlocked') {
                e.currentTarget.style.transform = 'translateY(-5px)';
              }
            }}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
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
                color: badge.rarity === 'Legendary' || badge.rarity === 'Legendarna' ? '#7C3AED' : 
                       badge.rarity === 'Epic' || badge.rarity === 'Epicka' ? '#DB2777' : '#64748B'
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
