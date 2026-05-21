import { useState, type CSSProperties } from 'react';
import { DailyScheduleCalendar } from './DailyScheduleCalendar';
import {
  CalendarDays,
  Clock,
  Users,
  Zap,
  CheckCircle2,
  PlayCircle,
  XCircle,
  Star,
  ChevronLeft,
  ChevronRight
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

interface ScheduleViewProps {
  username: string;
  ageGroup: string;
  onJoinSession: () => void;
}

type ScheduleFilter = 'all' | 'my' | 'live';

function getDateKey(dateIso: string | Date) {
  const date = typeof dateIso === 'string' ? new Date(dateIso) : dateIso;
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

function getCalendarDays(offset = 0) {
  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() + index + offset);
    return date;
  });
}

function formatDayName(date: Date) {
  return new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date);
}

function formatDayNumber(date: Date) {
  return new Intl.DateTimeFormat('en-US', { day: '2-digit' }).format(date);
}

function formatMonth(date: Date) {
  return new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);
}

export function ScheduleView({ username, ageGroup, onJoinSession }: ScheduleViewProps) {
  const [userData, setUserData] = useState(() => getMockUser(username, 'child'));
  const [filter, setFilter] = useState<ScheduleFilter>('all');
  const [calendarOffset, setCalendarOffset] = useState(0);
  const [sessions] = useState(() => getCourseSessions(ageGroup));
  const todayKey = getDateKey(new Date());
  const [selectedDateKey, setSelectedDateKey] = useState(todayKey);

  const enrolledSessionIds = userData?.enrolledSessionIds ?? [];
  const calendarDays = getCalendarDays(calendarOffset);
  const activeSessions = sessions.filter((session) => getSessionStatus(session) === 'live');

  const myNextSession = sessions
    .filter((session) => enrolledSessionIds.includes(session.id))
    .filter((session) => getSessionStatus(session) !== 'finished')
    .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())[0];

  const sessionsForSelectedDay = sessions.filter((session) => {
    return getDateKey(session.startTime) === selectedDateKey;
  });

  const filteredSessions = sessionsForSelectedDay.filter((session) => {
    const status = getSessionStatus(session);
    const enrolled = enrolledSessionIds.includes(session.id);
    if (filter === 'my') return enrolled;
    if (filter === 'live') return status === 'live';
    return true;
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
    <div style={{ padding: '40px', maxWidth: '1450px', margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.35fr 1fr', gap: '24px', marginBottom: '28px' }}>
        <div style={{ background: 'linear-gradient(135deg, #0A2E6E 0%, #14B8A6 100%)', borderRadius: '28px', padding: '34px', color: 'white', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', right: '-60px', top: '-60px', width: '220px', height: '220px', borderRadius: '50%', background: 'rgba(255,255,255,0.12)' }} />
          <CalendarDays size={38} />
          <h1 style={{ margin: '16px 0 10px', fontSize: '34px', fontWeight: '900', position: 'relative' }}>My Schedule</h1>
          <p style={{ margin: 0, maxWidth: '680px', lineHeight: 1.6, opacity: 0.92, fontSize: '16px', position: 'relative' }}>
            Check today's live lessons, enroll in upcoming activities and manage your learning plan.
          </p>
        </div>

        <div style={{ background: 'white', borderRadius: '28px', padding: '28px', boxShadow: '0 6px 20px rgba(15, 23, 42, 0.06)', border: '1px solid #E2E8F0' }}>
          <p style={{ margin: '0 0 12px 0', color: '#64748B', fontSize: '14px', fontWeight: '800' }}>Active now</p>
          {activeSessions.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {activeSessions.map((session) => {
                const enrolled = enrolledSessionIds.includes(session.id);
                return (
                  <div key={session.id} style={{ background: '#F8FAFC', borderRadius: '18px', padding: '14px', border: enrolled ? '2px solid #14B8A6' : '1px solid #E2E8F0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '48px', height: '48px', borderRadius: '16px', background: session.color + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px' }}>
                        {session.icon}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ margin: 0, fontSize: '14px', color: '#EF4444', fontWeight: '900' }}>● LIVE NOW</p>
                        <h3 style={{ margin: '4px 0 0', fontSize: '15px', color: '#1E293B', fontWeight: '900' }}>{session.title}</h3>
                      </div>
                      <button onClick={() => { if (!enrolled) handleEnroll(session); onJoinSession(); }} style={primaryButtonStyle}>
                        <PlayCircle size={17} /> Join
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div style={{ background: '#F8FAFC', borderRadius: '18px', padding: '18px', border: '1px solid #E2E8F0', color: '#64748B', fontSize: '14px' }}>
              No live sessions at this moment.
            </div>
          )}
          {myNextSession && (
            <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #E2E8F0' }}>
              <p style={{ margin: '0 0 8px', fontSize: '13px', color: '#64748B', fontWeight: '800' }}>Your next enrolled session</p>
              <p style={{ margin: 0, fontSize: '14px', color: '#1E293B', fontWeight: '900' }}>{myNextSession.icon} {myNextSession.title}</p>
              <p style={{ margin: '5px 0 0', fontSize: '13px', color: '#64748B' }}>{formatSessionTime(myNextSession.startTime)} - {formatSessionTime(myNextSession.endTime)}</p>
            </div>
          )}
        </div>
      </div>

      {/* Mini Calendar */}
      <div style={{ background: 'white', borderRadius: '26px', padding: '22px', boxShadow: '0 6px 20px rgba(15, 23, 42, 0.06)', border: '1px solid #E2E8F0', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '20px', color: '#1E293B', fontWeight: '900' }}>Weekly Calendar</h2>
            <p style={{ margin: '4px 0 0', color: '#64748B', fontSize: '14px' }}>Select a day to see available lessons.</p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => setCalendarOffset((prev) => prev - 7)} style={smallIconButtonStyle}><ChevronLeft size={18} /></button>
            <button onClick={() => setCalendarOffset(0)} style={{ ...smallTextButtonStyle, background: calendarOffset === 0 ? '#DBEAFE' : '#F8FAFC', color: calendarOffset === 0 ? '#2563EB' : '#64748B' }}>Today</button>
            <button onClick={() => setCalendarOffset((prev) => prev + 7)} style={smallIconButtonStyle}><ChevronRight size={18} /></button>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '12px' }}>
          {calendarDays.map((day) => {
            const dayKey = getDateKey(day);
            const isSelected = selectedDateKey === dayKey;
            const isToday = todayKey === dayKey;
            const daySessions = sessions.filter((session) => getDateKey(session.startTime) === dayKey);
            const dayEnrolledCount = daySessions.filter((session) => enrolledSessionIds.includes(session.id)).length;
            const dayLiveCount = daySessions.filter((session) => getSessionStatus(session) === 'live').length;
            return (
              <button key={dayKey} onClick={() => setSelectedDateKey(dayKey)} style={{ border: isSelected ? '3px solid #14B8A6' : '1px solid #E2E8F0', background: isSelected ? '#F0FDFA' : 'white', borderRadius: '20px', padding: '16px 10px', cursor: 'pointer', textAlign: 'center', transition: 'all 0.25s ease', minHeight: '118px' }}>
                <p style={{ margin: 0, fontSize: '13px', color: isToday ? '#14B8A6' : '#64748B', fontWeight: '900' }}>{formatDayName(day)}</p>
                <div style={{ margin: '8px auto', width: '42px', height: '42px', borderRadius: '50%', background: isToday ? '#DBEAFE' : '#F8FAFC', color: isToday ? '#2563EB' : '#1E293B', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '18px' }}>{formatDayNumber(day)}</div>
                <p style={{ margin: 0, fontSize: '12px', color: '#94A3B8', fontWeight: '700' }}>{formatMonth(day)}</p>
                <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'center', gap: '5px', flexWrap: 'wrap' }}>
                  {daySessions.length > 0 && <span style={calendarBadgeStyle}>{daySessions.length} lesson{daySessions.length > 1 ? 's' : ''}</span>}
                  {dayEnrolledCount > 0 && <span style={{ ...calendarBadgeStyle, background: '#DCFCE7', color: '#15803D' }}>{dayEnrolledCount} mine</span>}
                  {dayLiveCount > 0 && <span style={{ ...calendarBadgeStyle, background: '#FEE2E2', color: '#EF4444' }}>live</span>}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '24px' }}>
        {[{ id: 'all', label: 'All lessons' }, { id: 'my', label: 'My plan' }, { id: 'live', label: 'Live now' }].map((item) => (
          <button key={item.id} onClick={() => setFilter(item.id as ScheduleFilter)} style={{ border: 'none', borderRadius: '14px', padding: '12px 18px', background: filter === item.id ? 'linear-gradient(135deg, #14B8A6 0%, #06B6D4 100%)' : 'white', color: filter === item.id ? 'white' : '#64748B', fontWeight: '900', cursor: 'pointer', boxShadow: '0 4px 12px rgba(15, 23, 42, 0.06)' }}>
            {item.label}
          </button>
        ))}
      </div>

      <h2 style={{ margin: '0 0 16px', fontSize: '22px', fontWeight: '900', color: '#1E293B' }}>Lessons for selected day</h2>

      {filteredSessions.length === 0 ? (
        <div style={{ background: 'white', borderRadius: '24px', padding: '36px', textAlign: 'center', boxShadow: '0 6px 20px rgba(15, 23, 42, 0.06)', border: '1px solid #E2E8F0' }}>
          <div style={{ fontSize: '56px', marginBottom: '14px' }}>🗓️</div>
          <h3 style={{ margin: '0 0 8px', color: '#1E293B' }}>No lessons here yet</h3>
          <p style={{ margin: 0, color: '#64748B' }}>Try a different day or filter.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(330px, 1fr))', gap: '20px' }}>
          {filteredSessions.map((session) => {
            const status = getSessionStatus(session);
            const enrolled = enrolledSessionIds.includes(session.id);
            const isFull = session.participants >= session.capacity;
            return (
              <div key={session.id} style={{ background: 'white', borderRadius: '24px', padding: '24px', boxShadow: '0 6px 20px rgba(15, 23, 42, 0.06)', border: enrolled ? '3px solid #14B8A6' : '1px solid #E2E8F0', position: 'relative', overflow: 'hidden' }}>
                {status === 'live' && (
                  <div style={liveBadgeStyle}><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'white' }} />LIVE</div>
                )}
                {enrolled && status !== 'live' && (
                  <div style={enrolledBadgeStyle}><CheckCircle2 size={14} />Enrolled</div>
                )}
                <div style={{ width: '82px', height: '82px', borderRadius: '24px', background: session.color + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '42px', marginBottom: '18px' }}>{session.icon}</div>
                <p style={{ margin: '0 0 8px', fontSize: '13px', color: session.color, fontWeight: '900' }}>{session.topic}</p>
                <h3 style={{ margin: '0 0 10px', fontSize: '19px', color: '#1E293B', fontWeight: '900', paddingRight: status === 'live' || enrolled ? '90px' : 0 }}>{session.title}</h3>
                <p style={{ margin: '0 0 18px', color: '#64748B', fontSize: '14px', lineHeight: 1.5, minHeight: '42px' }}>{session.description}</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '18px' }}>
                  <div style={infoBoxStyle}><Clock size={15} />{formatSessionTime(session.startTime)} - {formatSessionTime(session.endTime)}</div>
                  <div style={infoBoxStyle}><Users size={15} />{session.participants}/{session.capacity}</div>
                  <div style={infoBoxStyle}><Zap size={15} />{getEnergyLabel(session.energy)}</div>
                  <div style={infoBoxStyle}><Star size={15} />{session.difficulty}</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid #F1F5F9', gap: '12px' }}>
                  <div style={{ fontSize: '13px', color: '#64748B' }}>Host: <strong style={{ color: '#1E293B' }}>{session.host}</strong></div>
                  {status === 'live' && enrolled ? (
                    <button onClick={onJoinSession} style={primaryButtonStyle}><PlayCircle size={17} />Join</button>
                  ) : status === 'live' && !enrolled ? (
                    <button onClick={() => { handleEnroll(session); onJoinSession(); }} style={primaryButtonStyle}><PlayCircle size={17} />Join</button>
                  ) : enrolled ? (
                    <button onClick={() => handleCancel(session)} style={secondaryDangerButtonStyle}><XCircle size={17} />Cancel</button>
                  ) : (
                    <button onClick={() => handleEnroll(session)} disabled={isFull} style={{ ...primaryButtonStyle, background: isFull ? '#CBD5E1' : 'linear-gradient(135deg, #14B8A6 0%, #06B6D4 100%)', cursor: isFull ? 'not-allowed' : 'pointer' }}>
                      <Star size={17} fill="white" />{isFull ? 'Full' : 'Participate'}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

const infoBoxStyle: CSSProperties = { background: '#F8FAFC', borderRadius: '12px', padding: '9px 10px', fontSize: '13px', color: '#64748B', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' };
const primaryButtonStyle: CSSProperties = { border: 'none', borderRadius: '14px', padding: '11px 15px', fontSize: '14px', fontWeight: '900', cursor: 'pointer', background: 'linear-gradient(135deg, #14B8A6 0%, #06B6D4 100%)', color: 'white', display: 'flex', alignItems: 'center', gap: '7px', flexShrink: 0 };
const secondaryDangerButtonStyle: CSSProperties = { border: 'none', borderRadius: '14px', padding: '11px 15px', fontSize: '14px', fontWeight: '900', cursor: 'pointer', background: '#FEF2F2', color: '#EF4444', display: 'flex', alignItems: 'center', gap: '7px', flexShrink: 0 };
const smallIconButtonStyle: CSSProperties = { width: '40px', height: '40px', borderRadius: '12px', border: 'none', background: '#F8FAFC', color: '#64748B', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' };
const smallTextButtonStyle: CSSProperties = { height: '40px', borderRadius: '12px', border: 'none', padding: '0 14px', fontWeight: '900', cursor: 'pointer' };
const calendarBadgeStyle: CSSProperties = { background: '#DBEAFE', color: '#2563EB', borderRadius: '999px', padding: '3px 7px', fontSize: '10px', fontWeight: '900' };
const liveBadgeStyle: CSSProperties = { position: 'absolute', top: '16px', right: '16px', background: '#EF4444', color: 'white', borderRadius: '999px', padding: '6px 10px', fontSize: '12px', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '6px' };
const enrolledBadgeStyle: CSSProperties = { position: 'absolute', top: '16px', right: '16px', background: '#DCFCE7', color: '#15803D', borderRadius: '999px', padding: '6px 10px', fontSize: '12px', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '5px' };