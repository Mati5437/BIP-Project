import { useState, useRef, useEffect, type CSSProperties } from 'react';
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
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
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

// ─── 24h Timeline (left column) ──────────────────────────────────────────────
const HOUR_HEIGHT = 56;
const HOURS = Array.from({ length: 24 }, (_, i) => i);

function TimelineColumn({
  sessions,
  enrolledSessionIds,
  onCancel,
  onJoinSession,
}: {
  sessions: CourseSession[];
  enrolledSessionIds: string[];
  onCancel: (s: CourseSession) => void;
  onJoinSession: () => void;
}) {
  const nowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    nowRef.current?.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }, []);

  const now = new Date();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  function topForDate(iso: string) {
    const d = new Date(iso);
    return (d.getHours() * 60 + d.getMinutes()) / 60 * HOUR_HEIGHT;
  }
  function heightForSession(s: CourseSession) {
    return Math.max(s.durationMinutes / 60 * HOUR_HEIGHT, 36);
  }

  const enrolled = sessions.filter(s => enrolledSessionIds.includes(s.id));

  return (
    <div style={{ overflowY: 'auto', maxHeight: '62vh', position: 'relative' }}>
      <div style={{ display: 'flex', minHeight: `${24 * HOUR_HEIGHT}px` }}>
        {/* Time gutter */}
        <div style={{ width: '52px', flexShrink: 0, borderRight: '1px solid #F1F5F9' }}>
          {HOURS.map(h => (
            <div key={h} style={{ height: `${HOUR_HEIGHT}px`, display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end', paddingRight: '8px', paddingTop: '5px' }}>
              <span style={{ fontSize: '10px', color: '#94A3B8', fontWeight: '700' }}>
                {h === 0 ? '12AM' : h < 12 ? `${h}AM` : h === 12 ? '12PM' : `${h - 12}PM`}
              </span>
            </div>
          ))}
        </div>

        {/* Grid + events */}
        <div style={{ flex: 1, position: 'relative' }}>
          {HOURS.map(h => (
            <div key={h} style={{ height: `${HOUR_HEIGHT}px`, borderBottom: '1px solid #F8FAFC' }} />
          ))}

          {/* Current time line */}
          <div
            ref={nowRef}
            style={{ position: 'absolute', top: `${nowMinutes / 60 * HOUR_HEIGHT + 20}px`, left: 0, right: 0, height: '2px', background: '#EF4444', zIndex: 10, display: 'flex', alignItems: 'center' }}
          >
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#EF4444', marginLeft: '-4px', flexShrink: 0 }} />
          </div>

          {/* Session blocks */}
          {enrolled.map(session => {
            const top = topForDate(session.startTime);
            const height = heightForSession(session);
            const status = getSessionStatus(session);
            const isLive = status === 'live';

            return (
              <div
                key={session.id}
                style={{
                  position: 'absolute',
                  top: `${top}px`,
                  left: '4px',
                  right: '4px',
                  height: `${height}px`,
                  borderRadius: '10px',
                  background: isLive
                    ? `linear-gradient(135deg, ${session.color}EE, ${session.color}AA)`
                    : `${session.color}18`,
                  border: `2px solid ${session.color}${isLive ? 'FF' : '55'}`,
                  padding: '5px 8px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  overflow: 'hidden',
                  zIndex: 5,
                  boxShadow: isLive ? `0 4px 12px ${session.color}44` : 'none',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '4px' }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexWrap: 'nowrap', overflow: 'hidden' }}>
                      {isLive && (
                        <span style={{ fontSize: '9px', fontWeight: '900', color: 'white', background: '#EF4444', borderRadius: '999px', padding: '1px 5px', flexShrink: 0 }}>● LIVE</span>
                      )}
                      <p style={{ margin: 0, fontWeight: '900', fontSize: '11px', color: isLive ? 'white' : '#1E293B', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {session.icon} {session.title}
                      </p>
                    </div>
                    {height > 48 && (
                      <p style={{ margin: '1px 0 0', fontSize: '10px', color: isLive ? 'rgba(255,255,255,0.85)' : '#64748B', fontWeight: '700' }}>
                        {formatSessionTime(session.startTime)} – {formatSessionTime(session.endTime)}
                      </p>
                    )}
                  </div>
                  {isLive ? (
                    <button onClick={onJoinSession} style={{ border: 'none', borderRadius: '8px', padding: '3px 7px', background: 'white', color: session.color, fontWeight: '900', fontSize: '10px', cursor: 'pointer', flexShrink: 0, display: 'flex', alignItems: 'center', gap: '3px' }}>
                      <PlayCircle size={11} /> Join
                    </button>
                  ) : height > 44 ? (
                    <button onClick={() => onCancel(session)} style={{ border: 'none', borderRadius: '8px', padding: '3px 7px', background: '#FEF2F2', color: '#EF4444', fontWeight: '900', fontSize: '10px', cursor: 'pointer', flexShrink: 0, display: 'flex', alignItems: 'center', gap: '3px' }}>
                      <XCircle size={11} />
                    </button>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Enrolled card list (right column) ───────────────────────────────────────
function EnrolledCardList({
  sessions,
  enrolledSessionIds,
  onCancel,
  onJoinSession,
  getEnergyLabel,
}: {
  sessions: CourseSession[];
  enrolledSessionIds: string[];
  onCancel: (s: CourseSession) => void;
  onJoinSession: () => void;
  getEnergyLabel: (e: string) => string;
}) {
  const enrolled = sessions
    .filter(s => enrolledSessionIds.includes(s.id))
    .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());

  if (enrolled.length === 0) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: '200px', color: '#94A3B8', textAlign: 'center', padding: '24px' }}>
        <div style={{ fontSize: '40px', marginBottom: '10px' }}>🗓️</div>
        <p style={{ fontWeight: '900', color: '#1E293B', margin: '0 0 4px' }}>No sessions enrolled</p>
        <p style={{ fontSize: '13px', margin: 0 }}>Switch to All lessons to enroll.</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', overflowY: 'auto', maxHeight: '62vh', paddingRight: '2px' }}>
      {enrolled.map(session => {
        const status = getSessionStatus(session);
        const isLive = status === 'live';
        return (
          <div key={session.id} style={{ background: 'white', borderRadius: '18px', padding: '18px', border: isLive ? `2px solid ${session.color}` : '2px solid #14B8A6', boxShadow: isLive ? `0 4px 16px ${session.color}22` : '0 2px 8px rgba(15,23,42,0.05)', position: 'relative', overflow: 'hidden' }}>
            {isLive && (
              <div style={{ position: 'absolute', top: '12px', right: '12px', background: '#EF4444', color: 'white', borderRadius: '999px', padding: '4px 8px', fontSize: '11px', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'white' }} />LIVE
              </div>
            )}
            {!isLive && (
              <div style={{ position: 'absolute', top: '12px', right: '12px', background: '#DCFCE7', color: '#15803D', borderRadius: '999px', padding: '4px 8px', fontSize: '11px', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <CheckCircle2 size={12} />Enrolled
              </div>
            )}
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: session.color + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', flexShrink: 0 }}>{session.icon}</div>
              <div style={{ flex: 1, minWidth: 0, paddingRight: '70px' }}>
                <p style={{ margin: '0 0 2px', fontSize: '12px', color: session.color, fontWeight: '900' }}>{session.topic}</p>
                <h3 style={{ margin: '0 0 6px', fontSize: '15px', color: '#1E293B', fontWeight: '900', lineHeight: 1.3 }}>{session.title}</h3>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <span style={miniInfoStyle}><Clock size={11} />{formatSessionTime(session.startTime)} – {formatSessionTime(session.endTime)}</span>
                  <span style={miniInfoStyle}><Users size={11} />{session.participants}/{session.capacity}</span>
                  <span style={miniInfoStyle}><Zap size={11} />{getEnergyLabel(session.energy)}</span>
                  <span style={miniInfoStyle}><Star size={11} />{session.difficulty}</span>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #F1F5F9' }}>
              <span style={{ fontSize: '12px', color: '#64748B' }}>Host: <strong style={{ color: '#1E293B' }}>{session.host}</strong></span>
              {isLive ? (
                <button onClick={onJoinSession} style={{ ...primaryButtonStyle, padding: '8px 14px', fontSize: '13px' }}><PlayCircle size={14} />Join</button>
              ) : (
                <button onClick={() => onCancel(session)} style={{ ...secondaryDangerButtonStyle, padding: '8px 14px', fontSize: '13px' }}><XCircle size={14} />Cancel</button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export function ScheduleView({ username, ageGroup, onJoinSession }: ScheduleViewProps) {
  const [userData, setUserData] = useState(() => getMockUser(username, 'child'));
  const [filter, setFilter] = useState<ScheduleFilter>('all');
  const [calendarOffset, setCalendarOffset] = useState(0);
  const [sessions] = useState(() => getCourseSessions(ageGroup));
  const todayKey = getDateKey(new Date());
  const [selectedDateKey, setSelectedDateKey] = useState(todayKey);

  const enrolledSessionIds = userData?.enrolledSessionIds ?? ['live-kindness-logo', 'hospital-calm-1'];
  const calendarDays = getCalendarDays(calendarOffset);
  const activeSessions = sessions.filter((session) => getSessionStatus(session) === 'live');

  const myNextSession = sessions
  .filter((session) => enrolledSessionIds.includes(session.id))
  .filter((session) => getSessionStatus(session) === 'upcoming')
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
    <div style={{ padding: '32px', maxWidth: '1200px', margin: '0 auto' }}>

      {/* Header + Active Now */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.35fr 1fr', gap: '20px', marginBottom: '24px' }}>
        <div style={{ background: 'linear-gradient(135deg, #0A2E6E 0%, #14B8A6 100%)', borderRadius: '24px', padding: '28px', color: 'white', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', right: '-50px', top: '-50px', width: '180px', height: '180px', borderRadius: '50%', background: 'rgba(255,255,255,0.12)' }} />
          <CalendarDays size={32} />
          <h1 style={{ margin: '12px 0 8px', fontSize: '28px', fontWeight: '900', position: 'relative' }}>My Schedule</h1>
          <p style={{ margin: 0, lineHeight: 1.6, opacity: 0.92, fontSize: '14px', position: 'relative' }}>
            Check today's live lessons, enroll in upcoming activities and manage your learning plan.
          </p>
        </div>

        <div style={{ background: 'white', borderRadius: '24px', padding: '22px', boxShadow: '0 6px 20px rgba(15,23,42,0.06)', border: '1px solid #E2E8F0' }}>
          <p style={{ margin: '0 0 10px', color: '#64748B', fontSize: '13px', fontWeight: '800' }}>Active now</p>
          {activeSessions.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {activeSessions.map((session) => {
                const enrolled = enrolledSessionIds.includes(session.id);
                return (
                  <div key={session.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', background: '#F0FDFA', borderRadius: '12px', padding: '10px 12px', border: '1px solid #99F6E4' }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ margin: 0, fontWeight: '900', fontSize: '13px', color: '#1E293B', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{session.icon} {session.title}</p>
                      <p style={{ margin: '2px 0 0', fontSize: '11px', color: '#64748B' }}>{formatSessionTime(session.startTime)} – {formatSessionTime(session.endTime)}</p>
                    </div>
                    <button onClick={() => { if (!enrolled) handleEnroll(session); onJoinSession(); }} style={{ ...primaryButtonStyle, padding: '7px 12px', fontSize: '12px' }}>
                      <PlayCircle size={13} />Join
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <p style={{ margin: 0, color: '#94A3B8', fontSize: '13px' }}>No live sessions right now.</p>
          )}
          {myNextSession && (
            <div style={{ marginTop: '14px', paddingTop: '14px', borderTop: '1px solid #E2E8F0' }}>
              <p style={{ margin: '0 0 6px', fontSize: '12px', color: '#64748B', fontWeight: '800' }}>Your next enrolled session</p>
              <p style={{ margin: 0, fontSize: '13px', color: '#1E293B', fontWeight: '900' }}>{myNextSession.icon} {myNextSession.title}</p>
              <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#64748B' }}>{formatSessionTime(myNextSession.startTime)} – {formatSessionTime(myNextSession.endTime)}</p>
            </div>
          )}
        </div>
      </div>

      {/* Weekly Calendar */}
      <div style={{ background: 'white', borderRadius: '22px', padding: '18px', boxShadow: '0 6px 20px rgba(15,23,42,0.06)', border: '1px solid #E2E8F0', marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '17px', color: '#1E293B', fontWeight: '900' }}>Weekly Calendar</h2>
            <p style={{ margin: '3px 0 0', color: '#64748B', fontSize: '13px' }}>Select a day to see available lessons.</p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => setCalendarOffset(p => p - 7)} style={smallIconButtonStyle}><ChevronLeft size={16} /></button>
            <button onClick={() => setCalendarOffset(0)} style={{ ...smallTextButtonStyle, background: calendarOffset === 0 ? '#DBEAFE' : '#F8FAFC', color: calendarOffset === 0 ? '#2563EB' : '#64748B' }}>Today</button>
            <button onClick={() => setCalendarOffset(p => p + 7)} style={smallIconButtonStyle}><ChevronRight size={16} /></button>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px' }}>
          {calendarDays.map((day) => {
            const dayKey = getDateKey(day);
            const isSelected = selectedDateKey === dayKey;
            const isToday = todayKey === dayKey;
            const daySessions = sessions.filter(s => getDateKey(s.startTime) === dayKey);
            const dayEnrolledCount = daySessions.filter(s => enrolledSessionIds.includes(s.id)).length;
            const dayLiveCount = daySessions.filter(s => getSessionStatus(s) === 'live').length;
            return (
              <button key={dayKey} onClick={() => setSelectedDateKey(dayKey)} style={{ border: isSelected ? '2px solid #14B8A6' : '1px solid #E2E8F0', background: isSelected ? '#F0FDFA' : 'white', borderRadius: '16px', padding: '12px 6px', cursor: 'pointer', textAlign: 'center', transition: 'all 0.25s ease', minHeight: '100px' }}>
                <p style={{ margin: 0, fontSize: '11px', color: isToday ? '#14B8A6' : '#64748B', fontWeight: '900' }}>{formatDayName(day)}</p>
                <div style={{ margin: '6px auto', width: '36px', height: '36px', borderRadius: '50%', background: isToday ? '#DBEAFE' : '#F8FAFC', color: isToday ? '#2563EB' : '#1E293B', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '15px' }}>{formatDayNumber(day)}</div>
                <p style={{ margin: 0, fontSize: '10px', color: '#94A3B8', fontWeight: '700' }}>{formatMonth(day)}</p>
                <div style={{ marginTop: '6px', display: 'flex', justifyContent: 'center', gap: '3px', flexWrap: 'wrap' }}>
                  {daySessions.length > 0 && <span style={calendarBadgeStyle}>{daySessions.length}</span>}
                  {dayEnrolledCount > 0 && <span style={{ ...calendarBadgeStyle, background: '#DCFCE7', color: '#15803D' }}>{dayEnrolledCount} mine</span>}
                  {dayLiveCount > 0 && <span style={{ ...calendarBadgeStyle, background: '#FEE2E2', color: '#EF4444' }}>live</span>}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
        {[{ id: 'all', label: 'All lessons' }, { id: 'my', label: 'My plan' }, { id: 'live', label: 'Live now' }].map((item) => (
          <button key={item.id} onClick={() => setFilter(item.id as ScheduleFilter)} style={{ border: 'none', borderRadius: '12px', padding: '10px 16px', background: filter === item.id ? 'linear-gradient(135deg, #14B8A6 0%, #06B6D4 100%)' : 'white', color: filter === item.id ? 'white' : '#64748B', fontWeight: '900', cursor: 'pointer', boxShadow: '0 4px 12px rgba(15,23,42,0.06)', fontSize: '14px' }}>
            {item.label}
          </button>
        ))}
      </div>

      {/* My Plan → two-column layout */}
      {filter === 'my' ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          {/* Left: timeline */}
          <div style={{ background: 'white', borderRadius: '20px', border: '1px solid #E2E8F0', boxShadow: '0 4px 12px rgba(15,23,42,0.05)', overflow: 'hidden' }}>
            <div style={{ padding: '14px 16px', borderBottom: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CalendarDays size={16} color="#14B8A6" />
              <span style={{ fontWeight: '900', fontSize: '13px', color: '#1E293B' }}>Daily Timeline</span>
            </div>
            <TimelineColumn
              sessions={sessionsForSelectedDay}
              enrolledSessionIds={enrolledSessionIds}
              onCancel={handleCancel}
              onJoinSession={onJoinSession}
            />
          </div>

          {/* Right: enrolled cards */}
          <div style={{ background: 'white', borderRadius: '20px', border: '1px solid #E2E8F0', boxShadow: '0 4px 12px rgba(15,23,42,0.05)', padding: '14px 16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', paddingBottom: '14px', borderBottom: '1px solid #F1F5F9' }}>
              <CheckCircle2 size={16} color="#14B8A6" />
              <span style={{ fontWeight: '900', fontSize: '13px', color: '#1E293B' }}>Enrolled Sessions</span>
              <span style={{ marginLeft: 'auto', fontSize: '12px', color: '#64748B', fontWeight: '700' }}>
                {sessionsForSelectedDay.filter(s => enrolledSessionIds.includes(s.id)).length} sessions
              </span>
            </div>
            <EnrolledCardList
              sessions={sessionsForSelectedDay}
              enrolledSessionIds={enrolledSessionIds}
              onCancel={handleCancel}
              onJoinSession={onJoinSession}
              getEnergyLabel={getEnergyLabel}
            />
          </div>
        </div>
      ) : (
        <>
          <h2 style={{ margin: '0 0 14px', fontSize: '20px', fontWeight: '900', color: '#1E293B' }}>Lessons for selected day</h2>
          {filteredSessions.length === 0 ? (
            <div style={{ background: 'white', borderRadius: '20px', padding: '32px', textAlign: 'center', boxShadow: '0 4px 12px rgba(15,23,42,0.05)', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '48px', marginBottom: '12px' }}>🗓️</div>
              <h3 style={{ margin: '0 0 6px', color: '#1E293B' }}>No lessons here yet</h3>
              <p style={{ margin: 0, color: '#64748B' }}>Try a different day or filter.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
              {filteredSessions.map((session) => {
                const status = getSessionStatus(session);
                const enrolled = enrolledSessionIds.includes(session.id);
                const isFull = session.participants >= session.capacity;
                return (
                  <div key={session.id} style={{ background: 'white', borderRadius: '20px', padding: '20px', boxShadow: '0 4px 12px rgba(15,23,42,0.05)', border: enrolled ? '2px solid #14B8A6' : '1px solid #E2E8F0', position: 'relative', overflow: 'hidden' }}>
                    {status === 'live' && (
                      <div style={liveBadgeStyle}><span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'white' }} />LIVE</div>
                    )}
                    {enrolled && status !== 'live' && (
                      <div style={enrolledBadgeStyle}><CheckCircle2 size={13} />Enrolled</div>
                    )}
                    <div style={{ width: '70px', height: '70px', borderRadius: '20px', background: session.color + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px', marginBottom: '14px' }}>{session.icon}</div>
                    <p style={{ margin: '0 0 6px', fontSize: '12px', color: session.color, fontWeight: '900' }}>{session.topic}</p>
                    <h3 style={{ margin: '0 0 8px', fontSize: '17px', color: '#1E293B', fontWeight: '900', paddingRight: status === 'live' || enrolled ? '80px' : 0 }}>{session.title}</h3>
                    <p style={{ margin: '0 0 14px', color: '#64748B', fontSize: '13px', lineHeight: 1.5, minHeight: '38px' }}>{session.description}</p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '14px' }}>
                      <div style={infoBoxStyle}><Clock size={13} />{formatSessionTime(session.startTime)} – {formatSessionTime(session.endTime)}</div>
                      <div style={infoBoxStyle}><Users size={13} />{session.participants}/{session.capacity}</div>
                      <div style={infoBoxStyle}><Zap size={13} />{getEnergyLabel(session.energy)}</div>
                      <div style={infoBoxStyle}><Star size={13} />{session.difficulty}</div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid #F1F5F9', gap: '10px' }}>
                      <div style={{ fontSize: '12px', color: '#64748B' }}>Host: <strong style={{ color: '#1E293B' }}>{session.host}</strong></div>
                      {status === 'live' && enrolled ? (
                        <button onClick={onJoinSession} style={primaryButtonStyle}><PlayCircle size={15} />Join</button>
                      ) : status === 'live' && !enrolled ? (
                        <button onClick={() => { handleEnroll(session); onJoinSession(); }} style={primaryButtonStyle}><PlayCircle size={15} />Join</button>
                      ) : enrolled ? (
                        <button onClick={() => handleCancel(session)} style={secondaryDangerButtonStyle}><XCircle size={15} />Cancel</button>
                      ) : (
                        <button onClick={() => handleEnroll(session)} disabled={isFull} style={{ ...primaryButtonStyle, background: isFull ? '#CBD5E1' : 'linear-gradient(135deg, #14B8A6 0%, #06B6D4 100%)', cursor: isFull ? 'not-allowed' : 'pointer' }}>
                          <Star size={15} fill="white" />{isFull ? 'Full' : 'Participate'}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}

const miniInfoStyle: CSSProperties = { background: '#F8FAFC', borderRadius: '8px', padding: '4px 7px', fontSize: '11px', color: '#64748B', fontWeight: '700', display: 'inline-flex', alignItems: 'center', gap: '4px' };
const infoBoxStyle: CSSProperties = { background: '#F8FAFC', borderRadius: '10px', padding: '8px 10px', fontSize: '12px', color: '#64748B', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '5px' };
const primaryButtonStyle: CSSProperties = { border: 'none', borderRadius: '12px', padding: '10px 14px', fontSize: '13px', fontWeight: '900', cursor: 'pointer', background: 'linear-gradient(135deg, #14B8A6 0%, #06B6D4 100%)', color: 'white', display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 };
const secondaryDangerButtonStyle: CSSProperties = { border: 'none', borderRadius: '12px', padding: '10px 14px', fontSize: '13px', fontWeight: '900', cursor: 'pointer', background: '#FEF2F2', color: '#EF4444', display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 };
const smallIconButtonStyle: CSSProperties = { width: '36px', height: '36px', borderRadius: '10px', border: 'none', background: '#F8FAFC', color: '#64748B', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' };
const smallTextButtonStyle: CSSProperties = { height: '36px', borderRadius: '10px', border: 'none', padding: '0 12px', fontWeight: '900', cursor: 'pointer', fontSize: '13px' };
const calendarBadgeStyle: CSSProperties = { background: '#DBEAFE', color: '#2563EB', borderRadius: '999px', padding: '2px 6px', fontSize: '9px', fontWeight: '900' };
const liveBadgeStyle: CSSProperties = { position: 'absolute', top: '14px', right: '14px', background: '#EF4444', color: 'white', borderRadius: '999px', padding: '5px 9px', fontSize: '11px', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '5px' };
const enrolledBadgeStyle: CSSProperties = { position: 'absolute', top: '14px', right: '14px', background: '#DCFCE7', color: '#15803D', borderRadius: '999px', padding: '5px 9px', fontSize: '11px', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '4px' };