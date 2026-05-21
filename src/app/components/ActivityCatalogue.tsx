import { useState } from 'react';
import {
  Clock,
  Users,
  ArrowLeft,
  Zap,
  CheckCircle2,
  PlayCircle,
  XCircle,
  Star
} from 'lucide-react';
import {
  cancelSessionEnrollment,
  enrollInSession,
  getMockUser
} from '../mock/mockDatabase';
import {
  formatSessionTime,
  getCourseSessions,
  getSessionStatus,
  type CourseSession
} from '../mock/courseSessions';

interface ActivityCatalogueProps {
  username: string;
  ageGroup: string;
  onBack: () => void;
  onSelectActivity: (activity: CourseSession) => void;
}

export function ActivityCatalogue({
  username,
  ageGroup,
  onBack,
  onSelectActivity
}: ActivityCatalogueProps) {
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [selectedEnergy, setSelectedEnergy] = useState<string>('all');
  const [userData, setUserData] = useState(() => getMockUser(username, 'child'));
  const [sessions] = useState(() => getCourseSessions(ageGroup));

  const enrolledSessionIds = userData?.enrolledSessionIds ?? [];

  const topics = [
    { id: 'all', name: 'All Topics', color: '#64748B' },
    ...Array.from(new Set(sessions.map((session) => session.topic))).map((topic) => ({
      id: topic.toLowerCase(),
      name: topic,
      color: sessions.find((session) => session.topic === topic)?.color ?? '#14B8A6'
    }))
  ];

  const filteredActivities = sessions.filter((session) => {
    const topicMatch =
      selectedTopic === 'all' || session.topic.toLowerCase() === selectedTopic;

    const energyMatch =
      selectedEnergy === 'all' || session.energy === selectedEnergy;

    return topicMatch && energyMatch;
  });

  const handleEnroll = (session: CourseSession) => {
    const updatedUser = enrollInSession(username, session.id);
    setUserData(updatedUser);
  };

  const handleCancel = (session: CourseSession) => {
    const updatedUser = cancelSessionEnrollment(username, session.id);
    setUserData(updatedUser);
  };

  const getEnergyLabel = (energy: string) => {
    if (energy === 'low') return '😌 Calm';
    if (energy === 'medium') return '😊 Balanced';
    return '😄 Active';
  };

  return (
    <div style={{ padding: '40px', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <button
          onClick={onBack}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#14B8A6',
            fontSize: '15px',
            fontWeight: '700',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '16px',
            padding: '8px 0'
          }}
        >
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>

        <h1
          style={{
            fontSize: '34px',
            fontWeight: '900',
            color: '#1E293B',
            marginBottom: '8px'
          }}
        >
          Activity Catalogue
        </h1>

        <p
          style={{
            fontSize: '16px',
            color: '#64748B',
            margin: 0
          }}
        >
          Find activities, check their time and save your place.
        </p>
      </div>

      {/* Filters */}
      <div
        style={{
          background: 'white',
          borderRadius: '24px',
          padding: '24px',
          marginBottom: '32px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
          border: '1px solid #E2E8F0'
        }}
      >
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '900',
            color: '#1E293B',
            marginBottom: '16px'
          }}
        >
          Filter by Topic
        </h3>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
            marginBottom: '24px'
          }}
        >
          {topics.map((topic) => (
            <button
              key={topic.id}
              onClick={() => setSelectedTopic(topic.id)}
              style={{
                background: selectedTopic === topic.id ? topic.color : '#F8FAFC',
                color: selectedTopic === topic.id ? 'white' : '#64748B',
                border: 'none',
                borderRadius: '12px',
                padding: '10px 18px',
                fontSize: '14px',
                fontWeight: '800',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
            >
              {topic.name}
            </button>
          ))}
        </div>

        <h3
          style={{
            fontSize: '16px',
            fontWeight: '900',
            color: '#1E293B',
            marginBottom: '16px'
          }}
        >
          Filter by Energy Level
        </h3>

        <div
          style={{
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap'
          }}
        >
          {[
            { id: 'all', label: 'All Levels' },
            { id: 'low', label: '😌 Calm' },
            { id: 'medium', label: '😊 Balanced' },
            { id: 'high', label: '😄 Active' }
          ].map((level) => (
            <button
              key={level.id}
              onClick={() => setSelectedEnergy(level.id)}
              style={{
                background: selectedEnergy === level.id ? '#14B8A6' : '#F8FAFC',
                color: selectedEnergy === level.id ? 'white' : '#64748B',
                border: 'none',
                borderRadius: '12px',
                padding: '10px 18px',
                fontSize: '14px',
                fontWeight: '800',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
            >
              {level.label}
            </button>
          ))}
        </div>
      </div>

      {/* Activities Grid */}
      <div>
        <p
          style={{
            fontSize: '14px',
            color: '#64748B',
            marginBottom: '20px',
            fontWeight: '700'
          }}
        >
          Showing {filteredActivities.length}{' '}
          {filteredActivities.length === 1 ? 'activity' : 'activities'}
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(330px, 1fr))',
            gap: '20px'
          }}
        >
          {filteredActivities.map((session) => {
            const status = getSessionStatus(session);
            const enrolled = enrolledSessionIds.includes(session.id);
            const isFull = session.participants >= session.capacity;

            return (
              <div
                key={session.id}
                style={{
                  background: 'white',
                  borderRadius: '24px',
                  padding: '28px',
                  boxShadow: '0 6px 20px rgba(15, 23, 42, 0.06)',
                  cursor: 'default',
                  transition: 'all 0.3s',
                  border: enrolled ? '3px solid #14B8A6' : '1px solid #E2E8F0',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(15, 23, 42, 0.06)';
                }}
              >
                {status === 'live' && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '16px',
                      right: '16px',
                      background: '#EF4444',
                      color: 'white',
                      borderRadius: '999px',
                      padding: '6px 10px',
                      fontSize: '12px',
                      fontWeight: '900',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <span
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: 'white'
                      }}
                    />
                    LIVE
                  </div>
                )}

                {enrolled && status !== 'live' && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '16px',
                      right: '16px',
                      background: '#DCFCE7',
                      color: '#15803D',
                      borderRadius: '999px',
                      padding: '6px 10px',
                      fontSize: '12px',
                      fontWeight: '900',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px'
                    }}
                  >
                    <CheckCircle2 size={14} />
                    Enrolled
                  </div>
                )}

                <div
                  style={{
                    width: '86px',
                    height: '86px',
                    borderRadius: '24px',
                    background: session.color + '22',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '46px',
                    marginBottom: '18px'
                  }}
                >
                  {session.icon}
                </div>

                <p
                  style={{
                    margin: '0 0 8px',
                    fontSize: '13px',
                    color: session.color,
                    fontWeight: '900'
                  }}
                >
                  {session.topic}
                </p>

                <h3
                  style={{
                    fontSize: '19px',
                    fontWeight: '900',
                    color: '#1E293B',
                    marginBottom: '10px',
                    paddingRight: status === 'live' || enrolled ? '95px' : 0
                  }}
                >
                  {session.title}
                </h3>

                <p
                  style={{
                    fontSize: '14px',
                    color: '#64748B',
                    marginBottom: '18px',
                    lineHeight: '1.5',
                    minHeight: '42px'
                  }}
                >
                  {session.description}
                </p>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '10px',
                    marginBottom: '18px'
                  }}
                >
                  <div style={infoBoxStyle}>
                    <Clock size={14} />
                    {formatSessionTime(session.startTime)} - {formatSessionTime(session.endTime)}
                  </div>

                  <div style={infoBoxStyle}>
                    <Users size={14} />
                    {session.participants}/{session.capacity} kids
                  </div>

                  <div style={infoBoxStyle}>
                    <Zap size={14} />
                    {getEnergyLabel(session.energy)}
                  </div>

                  <div style={infoBoxStyle}>
                    <Star size={14} />
                    {session.difficulty}
                  </div>
                </div>

                <div
                  style={{
                    paddingTop: '16px',
                    borderTop: '1px solid #F1F5F9',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '12px'
                  }}
                >
                  <p
                    style={{
                      fontSize: '13px',
                      color: '#64748B',
                      margin: 0
                    }}
                  >
                    Hosted by{' '}
                    <strong style={{ color: '#1E293B' }}>{session.host}</strong>
                  </p>

                  {status === 'live' && enrolled ? (
                    <button
                      onClick={() => onSelectActivity(session)}
                      style={primaryButtonStyle}
                    >
                      <PlayCircle size={17} />
                      Join
                    </button>
                  ) : status === 'live' && !enrolled ? (
                    <button
                      onClick={() => {
                        handleEnroll(session);
                        onSelectActivity(session);
                      }}
                      style={primaryButtonStyle}
                    >
                      <PlayCircle size={17} />
                      {/* ✨ 修改点：把原本的 'Join live' 改为 'Join' */}
                      Join
                    </button>
                  ) : enrolled ? (
                    <button
                      onClick={() => handleCancel(session)}
                      style={dangerButtonStyle}
                    >
                      <XCircle size={17} />
                      Cancel
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEnroll(session)}
                      disabled={isFull}
                      style={{
                        ...primaryButtonStyle,
                        background: isFull
                          ? '#CBD5E1'
                          : 'linear-gradient(135deg, #14B8A6 0%, #06B6D4 100%)',
                        cursor: isFull ? 'not-allowed' : 'pointer'
                      }}
                    >
                      <CheckCircle2 size={17} />
                      {/* ✨ 修改点：把原本的 'Enroll' 改为 'Participate' */}
                      {isFull ? 'Full' : 'Participate'}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const infoBoxStyle: React.CSSProperties = {
  background: '#F8FAFC',
  padding: '8px 10px',
  borderRadius: '10px',
  fontSize: '13px',
  fontWeight: '700',
  color: '#64748B',
  display: 'flex',
  alignItems: 'center',
  gap: '5px'
};

const primaryButtonStyle: React.CSSProperties = {
  border: 'none',
  borderRadius: '14px',
  padding: '11px 15px',
  fontSize: '14px',
  fontWeight: '900',
  cursor: 'pointer',
  background: 'linear-gradient(135deg, #14B8A6 0%, #06B6D4 100%)',
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  gap: '7px',
  flexShrink: 0
};

// ✨ 确保加上了这个危险按钮样式的定义，修复报错
const dangerButtonStyle: React.CSSProperties = {
  border: 'none',
  borderRadius: '14px',
  padding: '11px 15px',
  fontSize: '14px',
  fontWeight: '900',
  cursor: 'pointer',
  background: '#FEF2F2',
  color: '#EF4444',
  display: 'flex',
  alignItems: 'center',
  gap: '7px',
  flexShrink: 0
};