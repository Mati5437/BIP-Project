export type SessionEnergy = 'low' | 'medium' | 'high';
export type SessionDifficulty = 'Easy' | 'Medium' | 'Advanced';

export interface CourseSession {
  id: string;
  title: string;
  description: string;
  topic: string;
  ageGroups: string[];
  host: string;
  icon: string;
  color: string;
  startTime: string;
  endTime: string;
  durationMinutes: number;
  energy: SessionEnergy;
  difficulty: SessionDifficulty;
  participants: number;
  capacity: number;
}

function addMinutes(minutes: number) {
  const date = new Date();
  date.setMinutes(date.getMinutes() + minutes);
  return date;
}

export function getCourseSessions(ageGroup: string): CourseSession[] {
  const sessions: CourseSession[] = [
    {
      id: 'live-kindness-logo',
      title: 'Design a Logo for a Kindness Project',
      description: 'Create a friendly visual identity for a cause you care about.',
      topic: 'Creativity',
      ageGroups: ['young', 'teen'],
      host: 'Sarah Chen',
      icon: '🎨',
      color: '#FF6B9D',
      startTime: addMinutes(-12).toISOString(),
      endTime: addMinutes(28).toISOString(),
      durationMinutes: 40,
      energy: 'medium',
      difficulty: 'Easy',
      participants: 8,
      capacity: 12
    },
    {
      id: 'startup-helpful-product',
      title: 'Mini Startup Challenge',
      description: 'Invent a helpful product for children during recovery.',
      topic: 'Entrepreneurship',
      ageGroups: ['teen', 'advanced'],
      host: 'Alex Rivera',
      icon: '💡',
      color: '#F59E0B',
      startTime: addMinutes(90).toISOString(),
      endTime: addMinutes(135).toISOString(),
      durationMinutes: 45,
      energy: 'medium',
      difficulty: 'Medium',
      participants: 6,
      capacity: 10
    },
    {
      id: 'music-rhythm-challenge',
      title: 'Music & Rhythm Challenge',
      description: 'Create simple rhythms and sounds using everyday objects.',
      topic: 'Music',
      ageGroups: ['young'],
      host: 'Mike Johnson',
      icon: '🎵',
      color: '#8B5CF6',
      startTime: addMinutes(160).toISOString(),
      endTime: addMinutes(185).toISOString(),
      durationMinutes: 25,
      energy: 'low',
      difficulty: 'Easy',
      participants: 5,
      capacity: 10
    },
    {
      id: 'first-website',
      title: 'Build Your First Website',
      description: 'Learn basic HTML and CSS by creating a simple personal page.',
      topic: 'Coding',
      ageGroups: ['teen', 'advanced'],
      host: 'Jordan Lee',
      icon: '💻',
      color: '#3B82F6',
      startTime: addMinutes(230).toISOString(),
      endTime: addMinutes(290).toISOString(),
      durationMinutes: 60,
      energy: 'medium',
      difficulty: 'Medium',
      participants: 9,
      capacity: 12
    },
    {
      id: 'calm-storytelling',
      title: 'Create a Short Story',
      description: 'Write and share a gentle story about courage and friendship.',
      topic: 'Storytelling',
      ageGroups: ['young'],
      host: 'Emma Davis',
      icon: '📖',
      color: '#A78BFA',
      startTime: addMinutes(1440).toISOString(),
      endTime: addMinutes(1470).toISOString(),
      durationMinutes: 30,
      energy: 'low',
      difficulty: 'Easy',
      participants: 4,
      capacity: 8
    },
    {
      id: 'design-helpful-robot',
      title: 'Design a Helpful Robot',
      description: 'Imagine a robot that supports patients, families or hospital staff.',
      topic: 'Engineering',
      ageGroups: ['teen', 'advanced'],
      host: 'Sam Chen',
      icon: '🤖',
      color: '#14B8A6',
      startTime: addMinutes(1500).toISOString(),
      endTime: addMinutes(1545).toISOString(),
      durationMinutes: 45,
      energy: 'medium',
      difficulty: 'Medium',
      participants: 7,
      capacity: 10
    }
  ];

  return sessions.filter((session) => session.ageGroups.includes(ageGroup));
}

export function getSessionStatus(session: CourseSession) {
  const now = new Date().getTime();
  const start = new Date(session.startTime).getTime();
  const end = new Date(session.endTime).getTime();

  if (now >= start && now <= end) {
    return 'live';
  }

  if (now < start) {
    return 'upcoming';
  }

  return 'finished';
}

export function formatSessionDate(dateIso: string) {
  const date = new Date(dateIso);

  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  }).format(date);
}

export function formatSessionTime(dateIso: string) {
  const date = new Date(dateIso);

  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}