import { useState } from 'react';
import { CalendarDays, Clock, PlayCircle } from 'lucide-react';
import { getMockUser } from '../mock/mockDatabase';
import {
  formatSessionTime,
  getCourseSessions,
  getSessionStatus
} from '../mock/courseSessions';

interface MiniScheduleCardProps {
  username: string;
  ageGroup: string;
  onOpenSchedule: () => void;
  onJoinSession: () => void;
}

export function MiniScheduleCard({
  username,
  ageGroup,
  onOpenSchedule,
  onJoinSession
}: MiniScheduleCardProps) {
  const [sessions] = useState(() => getCourseSessions(ageGroup));
  const user = getMockUser(username, 'child');
  const enrolledSessionIds = user?.enrolledSessionIds ?? [];

  const liveSession = sessions.find((session) => getSessionStatus(session) === 'live');

  const nextEnrolledSession = sessions
    .filter((session) => enrolledSessionIds.includes(session.id))
    .filter((session) => getSessionStatus(session) !== 'finished')
    .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())[0];

  const sessionToShow = nextEnrolledSession ?? liveSession;

  return (
    <div style={{
      background: 'white',
      borderRadius: '24px',
      padding: '24px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
      border: '1px solid #E2E8F0',
      marginBottom: '24px'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <CalendarDays size={22} color="#14B8A6" />
          <h3 style={{
            margin: 0,
            fontSize: '18px',
            fontWeight: '900',
            color: '#1E293B'
          }}>
            Today’s Schedule
          </h3>
        </div>

        <button
          onClick={onOpenSchedule}
          style={{
            border: 'none',
            background: 'transparent',
            color: '#2563EB',
            fontWeight: '900',
            cursor: 'pointer'
          }}
        >
          View all
        </button>
      </div>

      {sessionToShow ? (
        <div style={{
          background: '#F8FAFC',
          borderRadius: '18px',
          padding: '16px',
          border: '1px solid #E2E8F0',
          display: 'flex',
          alignItems: 'center',
          gap: '14px'
        }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '18px',
            background: sessionToShow.color + '22',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '30px',
            flexShrink: 0
          }}>
            {sessionToShow.icon}
          </div>

          <div style={{ flex: 1 }}>
            <p style={{
              margin: 0,
              color: getSessionStatus(sessionToShow) === 'live' ? '#EF4444' : '#64748B',
              fontSize: '12px',
              fontWeight: '900'
            }}>
              {getSessionStatus(sessionToShow) === 'live' ? '● LIVE NOW' : 'NEXT SESSION'}
            </p>

            <h4 style={{
              margin: '4px 0',
              color: '#1E293B',
              fontSize: '15px',
              fontWeight: '900'
            }}>
              {sessionToShow.title}
            </h4>

            <p style={{
              margin: 0,
              color: '#64748B',
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              gap: '5px'
            }}>
              <Clock size={14} />
              {formatSessionTime(sessionToShow.startTime)} - {formatSessionTime(sessionToShow.endTime)}
            </p>
          </div>

          {getSessionStatus(sessionToShow) === 'live' && (
            <button
              onClick={onJoinSession}
              style={{
                border: 'none',
                borderRadius: '14px',
                padding: '12px 16px',
                background: 'linear-gradient(135deg, #14B8A6 0%, #06B6D4 100%)',
                color: 'white',
                fontWeight: '900',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '7px'
              }}
            >
              <PlayCircle size={17} />
              Join
            </button>
          )}
        </div>
      ) : (
        <div style={{
          background: '#F8FAFC',
          borderRadius: '18px',
          padding: '16px',
          color: '#64748B',
          fontSize: '14px'
        }}>
          No sessions planned yet. Open schedule to enroll in a course.
        </div>
      )}
    </div>
  );
}