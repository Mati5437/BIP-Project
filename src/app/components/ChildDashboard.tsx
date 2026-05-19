import { Smile, Meh, Frown, Battery, BatteryMedium, BatteryLow, Sparkles, Clock, Users, Award, Zap } from 'lucide-react';
import { useState } from 'react';
import { getMockUser, saveEnergyLevel, type EnergyLevel } from '../mock/mockDatabase';

interface ChildDashboardProps {
  username: string;
  ageGroup: string;
  onJoinSession: () => void;
  onBrowseActivities: () => void;
}

export function ChildDashboard({ username, ageGroup, onJoinSession, onBrowseActivities }: ChildDashboardProps) {
  const savedUser = getMockUser(username, 'child');

  const [energyLevel, setEnergyLevel] = useState<string | null>(
    savedUser?.energyPopupCompleted ? savedUser.energyLevel ?? null : null
  );

  const energyOptions = [
    { id: 'high', label: 'Full of Energy!', icon: <Battery size={28} />, color: '#10B981', emoji: '😄' },
    { id: 'medium', label: 'Feeling Good', icon: <BatteryMedium size={28} />, color: '#F59E0B', emoji: '😊' },
    { id: 'low', label: 'Taking it Easy', icon: <BatteryLow size={28} />, color: '#FF6B9D', emoji: '😌' }
  ];

  const upcomingSession = {
    title: ageGroup === 'young' ? 'Design a Logo for a Kindness Project' : 'Mini Startup Challenge: Invent a helpful product',
    host: 'Sarah Chen',
    time: 'Today at 3:00 PM',
    duration: ageGroup === 'young' ? '20 min' : '45 min',
    participants: 8,
    energy: 'medium'
  };

  const suggestedActivities = ageGroup === 'young' ? [
    { title: 'Create a Short Story', duration: '15 min', energy: 'low', icon: '📖', color: '#A78BFA' },
    { title: 'Music & Rhythm Challenge', duration: '20 min', energy: 'medium', icon: '🎵', color: '#F59E0B' },
    { title: 'Draw Your Happy Place', duration: '25 min', energy: 'low', icon: '🎨', color: '#FF6B9D' }
  ] : [
    { title: 'Build Your First Website', duration: '45 min', energy: 'medium', icon: '💻', color: '#3B82F6' },
    { title: 'Design a Helpful Robot', duration: '30 min', energy: 'low', icon: '🤖', color: '#8B5CF6' },
    { title: 'Creative Math Puzzle', duration: '20 min', energy: 'high', icon: '🧮', color: '#14B8A6' }
  ];

  return (
    <div style={{
      padding: '40px',
      maxWidth: '1400px',
      margin: '0 auto'
    }}>
      {/* Greeting */}
      <div style={{
        marginBottom: '32px'
      }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: '800',
          color: '#1E293B',
          marginBottom: '8px'
        }}>
          Welcome back, {username}! 👋
        </h1>
        <p style={{
          fontSize: '16px',
          color: '#64748B'
        }}>
          Ready for some fun learning today?
        </p>
      </div>

      {/* Energy Check */}
      {!energyLevel && (
        <div style={{
          background: 'linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 100%)',
          borderRadius: '24px',
          padding: '32px',
          marginBottom: '32px',
          border: '2px solid #FED7AA'
        }}>
          <h3 style={{
            fontSize: '20px',
            fontWeight: '700',
            color: '#1E293B',
            marginBottom: '8px'
          }}>
            How are you feeling today?
          </h3>
          <p style={{
            fontSize: '15px',
            color: '#64748B',
            marginBottom: '24px'
          }}>
            This helps us suggest the perfect activities for you!
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '16px'
          }}>
            {energyOptions.map((option) => (
              <div
                key={option.id}
                onClick={() => {
                  saveEnergyLevel(username, option.id as EnergyLevel);
                  setEnergyLevel(option.id);
                }}
                style={{
                  background: 'white',
                  borderRadius: '16px',
                  padding: '24px',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  border: '2px solid #E2E8F0',
                  textAlign: 'center'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = option.color;
                  e.currentTarget.style.boxShadow = `0 8px 16px ${option.color}20`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = '#E2E8F0';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ fontSize: '40px', marginBottom: '12px' }}>{option.emoji}</div>
                <div style={{ color: option.color, marginBottom: '8px' }}>{option.icon}</div>
                <p style={{ fontSize: '15px', fontWeight: '600', color: '#1E293B', margin: 0 }}>
                  {option.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '24px',
        marginBottom: '32px'
      }}>
        {/* Upcoming Live Session */}
        <div style={{
          background: 'linear-gradient(135deg, #14B8A6 0%, #06B6D4 100%)',
          borderRadius: '24px',
          padding: '32px',
          color: 'white',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: '-40px',
            right: '-40px',
            width: '200px',
            height: '200px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '50%'
          }} />

          <div style={{
            background: 'rgba(255,255,255,0.2)',
            display: 'inline-block',
            padding: '8px 16px',
            borderRadius: '100px',
            fontSize: '13px',
            fontWeight: '700',
            marginBottom: '16px'
          }}>
            🔴 LIVE SESSION SOON
          </div>

          <h2 style={{
            fontSize: '24px',
            fontWeight: '800',
            marginBottom: '12px',
            position: 'relative'
          }}>
            {upcomingSession.title}
          </h2>

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: '24px',
            position: 'relative'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Users size={16} />
              <span style={{ fontSize: '14px' }}>with {upcomingSession.host}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Clock size={16} />
              <span style={{ fontSize: '14px' }}>{upcomingSession.time}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Zap size={16} />
              <span style={{ fontSize: '14px' }}>{upcomingSession.duration}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Users size={16} />
              <span style={{ fontSize: '14px' }}>{upcomingSession.participants} kids joining</span>
            </div>
          </div>

          <button
            onClick={onJoinSession}
            style={{
              background: 'white',
              color: '#14B8A6',
              border: 'none',
              borderRadius: '14px',
              padding: '14px 28px',
              fontSize: '16px',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.3s',
              position: 'relative'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Join Live Session
          </button>
        </div>

        {/* Stats Card */}
        <div style={{
          background: 'white',
          borderRadius: '24px',
          padding: '32px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.06)'
        }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '700',
            color: '#1E293B',
            marginBottom: '24px'
          }}>
            Your Progress
          </h3>

          <div style={{
            background: 'linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 100%)',
            borderRadius: '16px',
            padding: '20px',
            marginBottom: '16px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '36px', marginBottom: '8px' }}>⭐</div>
            <div style={{ fontSize: '28px', fontWeight: '800', color: '#F59E0B', marginBottom: '4px' }}>120</div>
            <div style={{ fontSize: '13px', color: '#64748B', fontWeight: '600' }}>Care Coins</div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)',
            borderRadius: '16px',
            padding: '20px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '36px', marginBottom: '8px' }}>🏆</div>
            <div style={{ fontSize: '28px', fontWeight: '800', color: '#10B981', marginBottom: '4px' }}>5</div>
            <div style={{ fontSize: '13px', color: '#64748B', fontWeight: '600' }}>Badges Earned</div>
          </div>
        </div>
      </div>

      {/* Suggested Activities */}
      <div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <h3 style={{
            fontSize: '20px',
            fontWeight: '700',
            color: '#1E293B'
          }}>
            {energyLevel ? 'Perfect for your energy level' : 'Suggested Activities'}
          </h3>
          <button
            onClick={onBrowseActivities}
            style={{
              background: 'transparent',
              border: '2px solid #E2E8F0',
              borderRadius: '12px',
              padding: '10px 20px',
              fontSize: '14px',
              fontWeight: '600',
              color: '#64748B',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#14B8A6';
              e.currentTarget.style.color = '#14B8A6';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#E2E8F0';
              e.currentTarget.style.color = '#64748B';
            }}
          >
            Browse All Activities
          </button>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '20px'
        }}>
          {suggestedActivities.map((activity, index) => (
            <div
              key={index}
              style={{
                background: 'white',
                borderRadius: '20px',
                padding: '24px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                cursor: 'pointer',
                transition: 'all 0.3s',
                border: '2px solid transparent'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)';
                e.currentTarget.style.borderColor = activity.color;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.06)';
                e.currentTarget.style.borderColor = 'transparent';
              }}
            >
              <div style={{
                fontSize: '48px',
                marginBottom: '16px'
              }}>
                {activity.icon}
              </div>

              <h4 style={{
                fontSize: '16px',
                fontWeight: '700',
                color: '#1E293B',
                marginBottom: '12px',
                minHeight: '48px'
              }}>
                {activity.title}
              </h4>

              <div style={{
                display: 'flex',
                gap: '12px',
                flexWrap: 'wrap'
              }}>
                <div style={{
                  background: '#F8FAFC',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#64748B',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <Clock size={14} />
                  {activity.duration}
                </div>
                <div style={{
                  background: activity.energy === 'low' ? '#FFF7ED' : activity.energy === 'medium' ? '#FEF3C7' : '#DCFCE7',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: activity.energy === 'low' ? '#F59E0B' : activity.energy === 'medium' ? '#F59E0B' : '#10B981'
                }}>
                  {activity.energy === 'low' ? '😌 Easy' : activity.energy === 'medium' ? '😊 Moderate' : '😄 Active'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
