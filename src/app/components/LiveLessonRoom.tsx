import { useState } from 'react';
import { X, Video, Mic, Camera, Monitor, Send, User } from 'lucide-react';

interface LiveLessonRoomProps {
  onBack: () => void;
  ageGroup: string;
}

interface ParticipantProps {
  name: string;
  active?: boolean;
}

function Participant({ name, active }: ParticipantProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
      <div style={{ 
        width: '32px', 
        height: '32px', 
        backgroundColor: active ? '#3B82F6' : '#E2E8F0', 
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: active ? 'white' : '#94A3B8'
      }}>
        <User size={16} />
      </div>
      <span style={{ 
        fontSize: '14px', 
        fontWeight: active ? 'bold' : 'normal',
        color: '#1E293B'
      }}>
        {name}
      </span>
    </div>
  );
}

interface ControlBtnProps {
  icon: React.ReactNode;
  color?: string;
  active?: boolean;
}

function ControlBtn({ icon, color = 'rgba(255,255,255,0.1)', active = true }: ControlBtnProps) {
  return (
    <button 
      style={{ 
        width: '45px', 
        height: '45px', 
        borderRadius: '12px', 
        border: 'none', 
        backgroundColor: color === 'rgba(255,255,255,0.1)' ? 'rgba(255,255,255,0.1)' : color, 
        color: 'white', 
        cursor: 'pointer', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        transition: '0.2s',
        opacity: active ? 1 : 0.5
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 
          color === 'rgba(255,255,255,0.1)' ? 'rgba(255,255,255,0.2)' : color;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = color;
      }}
    >
      {icon}
    </button>
  );
}

export function LiveLessonRoom({ onBack, ageGroup }: LiveLessonRoomProps) {
  const [message, setMessage] = useState('');

  const getLessonTitle = () => {
    switch (ageGroup) {
      case 'young':
        return 'Na żywo: Rysujemy kolorowe logo!';
      case 'teen':
        return 'Na żywo: Projektowanie logo dla organizacji';
      case 'advanced':
        return 'Live: Professional Brand Identity Workshop';
      default:
        return 'Na żywo: Projektowanie logo';
    }
  };

  const participants = ageGroup === 'advanced' 
    ? ['Mentor Sarah (Host)', 'You', 'Alex', 'Jordan', 'Casey', 'Morgan']
    : ['Mentor Priya (Host)', 'Ty', 'Ania', 'Kuba', 'Zosia', 'Bartek'];

  return (
    <div style={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column', 
      animation: 'fadeIn 0.5s ease' 
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        backgroundColor: '#0F172A', 
        padding: '15px 25px', 
        borderRadius: '20px', 
        color: 'white', 
        marginBottom: '20px' 
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{ 
            width: '10px', 
            height: '10px', 
            backgroundColor: '#EF4444', 
            borderRadius: '50%', 
            animation: 'pulse 1.5s infinite' 
          }}></div>
          <h3 style={{ margin: 0, fontSize: '16px' }}>{getLessonTitle()}</h3>
        </div>
        <button 
          onClick={onBack} 
          style={{ 
            backgroundColor: '#EF4444', 
            border: 'none', 
            color: 'white', 
            padding: '8px 15px', 
            borderRadius: '10px', 
            fontWeight: 'bold', 
            cursor: 'pointer', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px',
            transition: 'all 0.3s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#DC2626';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#EF4444';
          }}
        >
          <X size={18}/> Opuść pokój
        </button>
      </div>

      <div style={{ flex: 1, display: 'flex', gap: '20px' }}>
        {/* OKNO WIDEO */}
        <div style={{ 
          flex: 3, 
          backgroundColor: '#1E293B', 
          borderRadius: '30px', 
          position: 'relative', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          overflow: 'hidden', 
          border: '4px solid #3B82F6' 
        }}>
          <div style={{ textAlign: 'center', color: 'white' }}>
            <Video size={80} style={{ marginBottom: '20px', opacity: 0.2 }} />
            <p style={{ fontSize: '20px', fontWeight: 'bold', opacity: 0.5 }}>
              Przestrzeń na stream wideo
            </p>
            <p style={{ fontSize: '14px', opacity: 0.3 }}>
              Tutaj wyświetla się lekcja prowadzona przez mentora
            </p>
          </div>
          
          {/* Panel kontrolny na dole */}
          <div style={{ 
            position: 'absolute', 
            bottom: '20px', 
            left: '50%', 
            transform: 'translateX(-50%)', 
            display: 'flex', 
            gap: '15px', 
            backgroundColor: 'rgba(15, 23, 42, 0.9)', 
            padding: '12px 25px', 
            borderRadius: '20px', 
            backdropFilter: 'blur(10px)' 
          }}>
            <ControlBtn icon={<Mic size={20}/>} />
            <ControlBtn icon={<Camera size={20}/>} />
            <ControlBtn icon={<Monitor size={20}/>} color="#3B82F6" />
          </div>
        </div>

        {/* CZAT / LISTA UCZESTNIKÓW */}
        <div style={{ 
          flex: 1, 
          backgroundColor: 'white', 
          borderRadius: '30px', 
          padding: '20px', 
          boxShadow: '0 10px 20px rgba(0,0,0,0.05)', 
          display: 'flex', 
          flexDirection: 'column' 
        }}>
          <h4 style={{ 
            margin: '0 0 20px 0', 
            borderBottom: '1px solid #F1F5F9', 
            paddingBottom: '10px',
            color: '#1E293B',
            fontSize: '16px',
            fontWeight: 'bold'
          }}>
            Uczestnicy ({participants.length})
          </h4>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {participants.map((participant, i) => (
              <Participant 
                key={i} 
                name={participant} 
                active={i === 0 || participant === 'Ty' || participant === 'You'}
              />
            ))}
          </div>
          <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input 
                type="text" 
                placeholder="Napisz wiadomość..." 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && message.trim()) {
                    setMessage('');
                  }
                }}
                style={{ 
                  flex: 1,
                  padding: '12px', 
                  borderRadius: '12px', 
                  border: '1px solid #E2E8F0', 
                  outline: 'none',
                  fontSize: '14px'
                }} 
              />
              <button
                onClick={() => {
                  if (message.trim()) {
                    setMessage('');
                  }
                }}
                disabled={!message.trim()}
                style={{
                  backgroundColor: message.trim() ? '#3B82F6' : '#E2E8F0',
                  color: 'white',
                  border: 'none',
                  padding: '0 15px',
                  borderRadius: '12px',
                  cursor: message.trim() ? 'pointer' : 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s'
                }}
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes pulse {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: 0.5;
            }
          }
        `}
      </style>
    </div>
  );
}
