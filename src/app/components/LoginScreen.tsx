import { useState } from 'react';
import { Heart, User, Shield, Video, Building2 } from 'lucide-react';
import careQuestIcon from '../assets/carequest-logo-icon.png';
import careQuestWordmark from '../assets/carequest-wordmark.png';

interface LoginScreenProps {
  onLogin: (username: string, role: string) => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [username, setUsername] = useState('');

  const roles = [
    {
      id: 'child',
      name: 'Child',
      icon: <Heart size={32} />,
      color: '#FF6B9D',
      gradient: 'linear-gradient(135deg, #FFE5EC 0%, #FFC2D1 100%)',
      description: 'Join fun learning sessions'
    },
    {
      id: 'parent',
      name: 'Parent/Guardian',
      icon: <Shield size={32} />,
      color: '#10B981',
      gradient: 'linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%)',
      description: 'Monitor and approve activities'
    },
    {
      id: 'host',
      name: 'Host',
      icon: <Video size={32} />,
      color: '#8B5CF6',
      gradient: 'linear-gradient(135deg, #EDE9FE 0%, #DDD6FE 100%)',
      description: 'Lead learning sessions'
    },
    {
      id: 'hospital',
      name: 'Hospital/Clinic',
      icon: <Building2 size={32} />,
      color: '#3B82F6',
      gradient: 'linear-gradient(135deg, #DBEAFE 0%, #BFDBFE 100%)',
      description: 'Manage patient access'
    }
  ];

  const handleRoleSelect = (roleId: string) => {
    setSelectedRole(roleId);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (username.trim() && selectedRole) {
      onLogin(username.trim(), selectedRole);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #EBF8FF 0%, #E0F2FE 50%, #FFF7ED 100%)',
        fontFamily: '"Plus Jakarta Sans", sans-serif',
        padding: '40px 20px'
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          padding: '46px 40px',
          borderRadius: '32px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
          maxWidth: '900px',
          width: '100%',
          textAlign: 'center'
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '22px'
          }}
        >
          <img
            src={careQuestIcon}
            alt="CareQuest icon"
            style={{
              width: '108px',
              height: '108px',
              objectFit: 'contain',
              marginBottom: '12px'
            }}
          />

          <img
            src={careQuestWordmark}
            alt="CareQuest"
            style={{
              width: '260px',
              maxWidth: '100%',
              height: 'auto',
              objectFit: 'contain',
              display: 'block'
            }}
          />
        </div>

        <p
          style={{
            color: '#64748B',
            margin: '0 0 38px',
            fontSize: '17px',
            lineHeight: '1.6'
          }}
        >
          Safe learning, creativity & connection during recovery
        </p>

        {!selectedRole ? (
          <>
            <h3
              style={{
                fontSize: '18px',
                fontWeight: '700',
                color: '#1E293B',
                marginBottom: '24px'
              }}
            >
              How would you like to join?
            </h3>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '16px',
                marginBottom: '20px'
              }}
            >
              {roles.map((role) => (
                <div
                  key={role.id}
                  onClick={() => handleRoleSelect(role.id)}
                  style={{
                    background: role.gradient,
                    borderRadius: '20px',
                    padding: '28px 20px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    border: '2px solid transparent',
                    textAlign: 'center'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-6px)';
                    e.currentTarget.style.boxShadow = `0 12px 24px ${role.color}30`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div
                    style={{
                      color: role.color,
                      marginBottom: '12px',
                      display: 'flex',
                      justifyContent: 'center'
                    }}
                  >
                    {role.icon}
                  </div>

                  <h4
                    style={{
                      fontSize: '16px',
                      fontWeight: '800',
                      color: '#1E293B',
                      marginBottom: '6px'
                    }}
                  >
                    {role.name}
                  </h4>

                  <p
                    style={{
                      fontSize: '13px',
                      color: '#64748B',
                      margin: 0,
                      lineHeight: '1.4'
                    }}
                  >
                    {role.description}
                  </p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '24px',
                padding: '16px',
                background: roles.find((role) => role.id === selectedRole)?.gradient,
                borderRadius: '16px'
              }}
            >
              <div style={{ color: roles.find((role) => role.id === selectedRole)?.color }}>
                {roles.find((role) => role.id === selectedRole)?.icon}
              </div>

              <div style={{ textAlign: 'left' }}>
                <p style={{ margin: 0, fontSize: '14px', color: '#64748B' }}>
                  Joining as
                </p>

                <p
                  style={{
                    margin: 0,
                    fontSize: '18px',
                    fontWeight: '800',
                    color: '#1E293B'
                  }}
                >
                  {roles.find((role) => role.id === selectedRole)?.name}
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSelectedRole(null);
                  setUsername('');
                }}
                style={{
                  marginLeft: 'auto',
                  background: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '6px 12px',
                  fontSize: '13px',
                  fontWeight: '700',
                  color: '#64748B',
                  cursor: 'pointer'
                }}
              >
                Change
              </button>
            </div>

            <div
              style={{
                position: 'relative',
                marginBottom: '20px'
              }}
            >
              <User
                style={{
                  position: 'absolute',
                  left: '18px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#94A3B8'
                }}
                size={20}
              />

              <input
                type="text"
                placeholder="Enter your name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{
                  width: '100%',
                  padding: '16px 16px 16px 50px',
                  borderRadius: '14px',
                  border: '2px solid #E2E8F0',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'border-color 0.3s'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#14B8A6';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#E2E8F0';
                }}
              />
            </div>

            <button
              type="submit"
              disabled={!username.trim()}
              style={{
                width: '100%',
                padding: '16px',
                background: username.trim()
                  ? 'linear-gradient(135deg, #14B8A6 0%, #06B6D4 100%)'
                  : '#CBD5E1',
                color: 'white',
                border: 'none',
                borderRadius: '14px',
                fontSize: '16px',
                fontWeight: '800',
                cursor: username.trim() ? 'pointer' : 'not-allowed',
                transition: 'all 0.3s',
                boxShadow: username.trim()
                  ? '0 4px 12px rgba(20, 184, 166, 0.3)'
                  : 'none'
              }}
              onMouseEnter={(e) => {
                if (username.trim()) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(20, 184, 166, 0.4)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = username.trim()
                  ? '0 4px 12px rgba(20, 184, 166, 0.3)'
                  : 'none';
              }}
            >
              Continue to CareQuest
            </button>
          </form>
        )}

        <p
          style={{
            marginTop: '32px',
            color: '#94A3B8',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px'
          }}
        >
          <Shield size={16} />
          Safe, secure & parent-approved
        </p>
      </div>
    </div>
  );
}