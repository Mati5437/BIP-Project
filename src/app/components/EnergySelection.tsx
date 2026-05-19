import { Battery, BatteryMedium, BatteryLow } from 'lucide-react';
import { saveEnergyLevel, type EnergyLevel } from '../mock/mockDatabase';

interface EnergySelectionProps {
  username: string;
  onEnergySelect: (energyLevel: EnergyLevel) => void;
}

export function EnergySelection({ username, onEnergySelect }: EnergySelectionProps) {
  const energyOptions = [
    {
      id: 'high' as EnergyLevel,
      label: 'Full of Energy!',
      emoji: '😄',
      description: 'I feel ready for active challenges and group work.',
      icon: <Battery size={42} />,
      color: '#10B981',
      gradient: 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)',
      borderColor: '#6EE7B7'
    },
    {
      id: 'medium' as EnergyLevel,
      label: 'Feeling Good',
      emoji: '😊',
      description: 'I want something balanced, creative and not too tiring.',
      icon: <BatteryMedium size={42} />,
      color: '#F59E0B',
      gradient: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)',
      borderColor: '#FCD34D'
    },
    {
      id: 'low' as EnergyLevel,
      label: 'Taking it Easy',
      emoji: '😌',
      description: 'I prefer calm activities with simple steps today.',
      icon: <BatteryLow size={42} />,
      color: '#FF6B9D',
      gradient: 'linear-gradient(135deg, #FFF1F7 0%, #FFE5EC 100%)',
      borderColor: '#FFB3D1'
    }
  ];

  const handleSelect = (energyLevel: EnergyLevel) => {
    saveEnergyLevel(username, energyLevel);
    onEnergySelect(energyLevel);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #EBF8FF 0%, #E0F2FE 50%, #FFF7ED 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      fontFamily: '"Plus Jakarta Sans", sans-serif'
    }}>
      <div style={{
        maxWidth: '1050px',
        width: '100%',
        textAlign: 'center'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '28px',
          padding: '42px',
          marginBottom: '28px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.07)'
        }}>
          <div style={{
            fontSize: '64px',
            marginBottom: '16px'
          }}>
            ⚡
          </div>

          <h1 style={{
            fontSize: '38px',
            fontWeight: '800',
            color: '#1E293B',
            marginBottom: '12px'
          }}>
            How are you feeling today?
          </h1>

          <p style={{
            fontSize: '18px',
            color: '#64748B',
            lineHeight: '1.6',
            maxWidth: '620px',
            margin: '0 auto'
          }}>
            This helps us suggest activities that match your energy level.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '22px'
        }}>
          {energyOptions.map((option) => (
            <div
              key={option.id}
              onClick={() => handleSelect(option.id)}
              style={{
                background: option.gradient,
                borderRadius: '26px',
                padding: '40px 28px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                border: `3px solid ${option.borderColor}`,
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.13)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)';
              }}
            >
              <div style={{
                fontSize: '56px',
                marginBottom: '14px'
              }}>
                {option.emoji}
              </div>

              <div style={{
                color: option.color,
                marginBottom: '16px',
                display: 'flex',
                justifyContent: 'center'
              }}>
                {option.icon}
              </div>

              <h3 style={{
                fontSize: '24px',
                fontWeight: '800',
                color: '#1E293B',
                marginBottom: '12px'
              }}>
                {option.label}
              </h3>

              <p style={{
                color: '#475569',
                fontSize: '15px',
                lineHeight: '1.6',
                marginBottom: '24px'
              }}>
                {option.description}
              </p>

              <div style={{
                background: 'white',
                color: option.color,
                padding: '13px 24px',
                borderRadius: '14px',
                fontSize: '15px',
                fontWeight: '800',
                display: 'inline-block',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
              }}>
                Choose This
              </div>
            </div>
          ))}
        </div>

        <p style={{
          marginTop: '28px',
          color: '#64748B',
          fontSize: '14px'
        }}>
          You can change this later in the mock data if needed.
        </p>
      </div>
    </div>
  );
}