import { Clock, PlayCircle, CalendarDays } from 'lucide-react';
import { getSessionStatus, formatSessionTime, type CourseSession } from '../mock/courseSessions';

interface DailyScheduleCalendarProps {
    sessions: CourseSession[];
    enrolledSessionIds: string[];
    selectedDateKey: string;
    onJoinSession: () => void;
}

function getDateKey(dateIso: string | Date) {
    const date = typeof dateIso === 'string' ? new Date(dateIso) : dateIso;

    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

function getMinutesFromMidnight(dateIso: string) {
    const date = new Date(dateIso);
    return date.getHours() * 60 + date.getMinutes();
}

function getDurationInMinutes(startIso: string, endIso: string) {
    const start = new Date(startIso).getTime();
    const end = new Date(endIso).getTime();

    return Math.max(20, Math.round((end - start) / 60000));
}

export function DailyScheduleCalendar({
    sessions,
    enrolledSessionIds,
    selectedDateKey,
    onJoinSession
}: DailyScheduleCalendarProps) {
    const dayStartHour = 8;
    const dayEndHour = 20;
    const hourHeight = 86;

    const enrolledSessionsForDay = sessions
        .filter((session) => enrolledSessionIds.includes(session.id))
        .filter((session) => getDateKey(session.startTime) === selectedDateKey)
        .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());

    const totalHours = dayEndHour - dayStartHour;
    const calendarHeight = totalHours * hourHeight;

    const hours = Array.from({ length: totalHours + 1 }, (_, index) => dayStartHour + index);

    return (
        <div
            style={{
                background: 'white',
                borderRadius: '26px',
                padding: '24px',
                border: '1px solid #E2E8F0',
                boxShadow: '0 6px 20px rgba(15, 23, 42, 0.06)',
                marginBottom: '26px'
            }}
        >
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '20px'
                }}
            >
                <div>
                    <h2
                        style={{
                            margin: 0,
                            fontSize: '22px',
                            color: '#1E293B',
                            fontWeight: '900',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px'
                        }}
                    >
                        <CalendarDays size={24} color="#14B8A6" />
                        My Day Plan
                    </h2>

                    <p
                        style={{
                            margin: '6px 0 0',
                            color: '#64748B',
                            fontSize: '14px'
                        }}
                    >
                        Timeline with lessons you are enrolled in.
                    </p>
                </div>

                <div
                    style={{
                        background: '#F0FDFA',
                        color: '#0F766E',
                        borderRadius: '999px',
                        padding: '8px 14px',
                        fontSize: '13px',
                        fontWeight: '900'
                    }}
                >
                    {enrolledSessionsForDay.length} planned
                </div>
            </div>

            {enrolledSessionsForDay.length === 0 ? (
                <div
                    style={{
                        background: '#F8FAFC',
                        borderRadius: '20px',
                        padding: '28px',
                        textAlign: 'center',
                        border: '1px dashed #CBD5E1'
                    }}
                >
                    <div style={{ fontSize: '46px', marginBottom: '10px' }}>🗓️</div>

                    <h3
                        style={{
                            margin: '0 0 8px',
                            color: '#1E293B',
                            fontSize: '18px',
                            fontWeight: '900'
                        }}
                    >
                        No enrolled lessons this day
                    </h3>

                    <p
                        style={{
                            margin: 0,
                            color: '#64748B',
                            fontSize: '14px'
                        }}
                    >
                        Enroll in an activity to see it here.
                    </p>
                </div>
            ) : (
                <div
                    style={{
                        position: 'relative',
                        display: 'grid',
                        gridTemplateColumns: '70px 1fr',
                        gap: '16px'
                    }}
                >
                    {/* Hours */}
                    <div
                        style={{
                            position: 'relative',
                            height: `${calendarHeight}px`
                        }}
                    >
                        {hours.map((hour) => (
                            <div
                                key={hour}
                                style={{
                                    position: 'absolute',
                                    top: `${(hour - dayStartHour) * hourHeight - 8}px`,
                                    right: 0,
                                    color: '#94A3B8',
                                    fontSize: '12px',
                                    fontWeight: '800'
                                }}
                            >
                                {String(hour).padStart(2, '0')}:00
                            </div>
                        ))}
                    </div>
                    <DailyScheduleCalendar
                        sessions={sessions}
                        enrolledSessionIds={enrolledSessionIds}
                        selectedDateKey={selectedDateKey}
                        onJoinSession={onJoinSession}
                    />
                    {/* Timeline */}
                    <div
                        style={{
                            position: 'relative',
                            height: `${calendarHeight}px`,
                            borderLeft: '2px solid #E2E8F0',
                            background:
                                'repeating-linear-gradient(to bottom, transparent 0, transparent 85px, #E2E8F0 86px)',
                            borderRadius: '18px',
                            overflow: 'hidden'
                        }}
                    >
                        {enrolledSessionsForDay.map((session) => {
                            const status = getSessionStatus(session);

                            const startMinutes = getMinutesFromMidnight(session.startTime);
                            const duration = getDurationInMinutes(session.startTime, session.endTime);

                            const top = ((startMinutes - dayStartHour * 60) / 60) * hourHeight;
                            const height = Math.max((duration / 60) * hourHeight, 74);

                            const safeTop = Math.max(0, Math.min(top, calendarHeight - height));

                            return (
                                <div
                                    key={session.id}
                                    style={{
                                        position: 'absolute',
                                        top: `${safeTop}px`,
                                        left: '18px',
                                        right: '18px',
                                        minHeight: `${height}px`,
                                        background: status === 'live'
                                            ? 'linear-gradient(135deg, #FEF2F2 0%, #FFF7ED 100%)'
                                            : 'white',
                                        border: status === 'live'
                                            ? '2px solid #EF4444'
                                            : `2px solid ${session.color}`,
                                        borderRadius: '20px',
                                        padding: '16px',
                                        boxShadow: '0 8px 22px rgba(15, 23, 42, 0.10)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '14px'
                                    }}
                                >
                                    <div
                                        style={{
                                            width: '58px',
                                            height: '58px',
                                            borderRadius: '18px',
                                            background: session.color + '22',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '30px',
                                            flexShrink: 0
                                        }}
                                    >
                                        {session.icon}
                                    </div>

                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '8px',
                                                marginBottom: '5px',
                                                flexWrap: 'wrap'
                                            }}
                                        >
                                            <span
                                                style={{
                                                    color: status === 'live' ? '#EF4444' : session.color,
                                                    fontSize: '12px',
                                                    fontWeight: '900'
                                                }}
                                            >
                                                {status === 'live' ? '● LIVE NOW' : session.topic}
                                            </span>

                                            <span
                                                style={{
                                                    background: '#F8FAFC',
                                                    color: '#64748B',
                                                    borderRadius: '999px',
                                                    padding: '3px 8px',
                                                    fontSize: '11px',
                                                    fontWeight: '800'
                                                }}
                                            >
                                                {session.difficulty}
                                            </span>
                                        </div>

                                        <h3
                                            style={{
                                                margin: 0,
                                                color: '#1E293B',
                                                fontSize: '16px',
                                                fontWeight: '900',
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis'
                                            }}
                                        >
                                            {session.title}
                                        </h3>

                                        <p
                                            style={{
                                                margin: '6px 0 0',
                                                color: '#64748B',
                                                fontSize: '13px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '5px'
                                            }}
                                        >
                                            <Clock size={14} />
                                            {formatSessionTime(session.startTime)} - {formatSessionTime(session.endTime)}
                                            {' '}• {session.host}
                                        </p>
                                    </div>

                                    {status === 'live' && (
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
                                                gap: '7px',
                                                flexShrink: 0
                                            }}
                                        >
                                            <PlayCircle size={17} />
                                            Join
                                        </button>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}