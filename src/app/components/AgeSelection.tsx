import { GraduationCap, Sparkles, Rocket } from 'lucide-react';

interface AgeSelectionProps {
  username: string;
  onAgeSelect: (ageGroup: string) => void;
}

export function AgeSelection({ username, onAgeSelect }: AgeSelectionProps) {
  const ageGroups = [
    {
      id: 'young',
      range: '7-10 lat',
      title: 'Młody Odkrywca',
      description: 'Proste i kolorowe lekcje dostosowane do Twojego wieku',
      icon: <Sparkles size={40} />,
      color: '#FCD34D',
      gradient: 'linear-gradient(135deg, #FEF3C7 0%, #FCD34D 100%)'
    },
    {
      id: 'teen',
      range: '11-14 lat',
      title: 'Mądry Uczeń',
      description: 'Ciekawe tematy i wyzwania na Twoim poziomie',
      icon: <GraduationCap size={40} />,
      color: '#60A5FA',
      gradient: 'linear-gradient(135deg, #DBEAFE 0%, #60A5FA 100%)'
    },
    {
      id: 'advanced',
      range: '15-18 lat',
      title: 'Ambitny Ekspert',
      description: 'Zaawansowane treści i prawdziwe projekty',
      icon: <Rocket size={40} />,
      color: '#A78BFA',
      gradient: 'linear-gradient(135deg, #EDE9FE 0%, #A78BFA 100%)'
    }
  ];

  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: '"Plus Jakarta Sans", sans-serif',
      padding: '40px 20px'
    }}>
      <div style={{ 
        maxWidth: '1000px', 
        width: '100%',
        textAlign: 'center'
      }}>
        <h1 style={{ 
          fontSize: '42px', 
          fontWeight: 'bold', 
          color: 'white', 
          marginBottom: '15px',
          textShadow: '0 4px 6px rgba(0,0,0,0.2)'
        }}>
          Cześć, {username}! 👋
        </h1>
        
        <p style={{ 
          fontSize: '20px', 
          color: 'rgba(255,255,255,0.9)', 
          marginBottom: '50px' 
        }}>
          Wybierz swoją grupę wiekową, aby dopasować treści do Twoich potrzeb
        </p>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '30px' 
        }}>
          {ageGroups.map((group) => (
            <div
              key={group.id}
              onClick={() => onAgeSelect(group.id)}
              style={{
                background: group.gradient,
                borderRadius: '30px',
                padding: '40px 30px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px) scale(1.05)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
              }}
            >
              <div style={{ 
                width: '80px', 
                height: '80px', 
                backgroundColor: 'white', 
                borderRadius: '20px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                margin: '0 auto 20px',
                color: group.color
              }}>
                {group.icon}
              </div>

              <div style={{ 
                backgroundColor: 'white', 
                display: 'inline-block', 
                padding: '8px 20px', 
                borderRadius: '20px', 
                marginBottom: '15px',
                fontSize: '14px',
                fontWeight: 'bold',
                color: group.color
              }}>
                {group.range}
              </div>

              <h3 style={{ 
                fontSize: '24px', 
                fontWeight: 'bold', 
                color: '#1E293B', 
                marginBottom: '10px' 
              }}>
                {group.title}
              </h3>

              <p style={{ 
                color: '#475569', 
                fontSize: '15px',
                lineHeight: '1.6'
              }}>
                {group.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
