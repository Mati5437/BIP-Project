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
      ageGroups: ['young', 'teen', 'advanced'],
      host: 'Sarah Chen',
      icon: '✨', 
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
      id: 'calm-storytelling',
      title: 'Create a Short Story',
      description: 'Write and share a gentle story about courage and friendship.',
      topic: 'Storytelling',
      ageGroups: ['young', 'teen', 'advanced'],
      host: 'Emma Davis',
      icon: '✍️', 
      color: '#A78BFA',
      startTime: addMinutes(1440).toISOString(),
      endTime: addMinutes(1470).toISOString(),
      durationMinutes: 30,
      energy: 'low',
      difficulty: 'Easy',
      participants: 8,
      capacity: 8
    },
    {
      id: 'design-helpful-robot',
      title: 'Design a Helpful Robot',
      description: 'Imagine a robot that supports patients, families or hospital staff.',
      topic: 'Engineering',
      ageGroups: ['young', 'teen', 'advanced'],
      host: 'Sam Chen',
      icon: '🛠️', 
      color: '#14B8A6',
      startTime: addMinutes(1500).toISOString(),
      endTime: addMinutes(1545).toISOString(),
      durationMinutes: 45,
      energy: 'medium',
      difficulty: 'Medium',
      participants: 7,
      capacity: 10
    },

    {
      id: 'hospital-calm-1',
      title: 'Neon Cyberpunk Digital Art',
      description: 'Learn simple glowing digital drawing techniques to design your own futuristic avatar.',
      topic: 'Creativity',
      ageGroups: ['young', 'teen', 'advanced'],
      host: 'Sarah Chen',
      icon: '🌌', 
      color: '#FF6B9D',
      startTime: addMinutes(300).toISOString(),
      endTime: addMinutes(345).toISOString(),
      durationMinutes: 45,
      energy: 'low',
      difficulty: 'Medium',
      participants: 3,
      capacity: 10
    },
    {
      id: 'hospital-calm-2',
      title: 'Podcast Radio: Late Night Beats',
      description: 'Share your favorite songs anonymously and co-create an emotional comforting playlist with peers.',
      topic: 'Music',
      ageGroups: ['young', 'teen', 'advanced'],
      host: 'Mike Johnson',
      icon: '🎧', 
      color: '#8B5CF6',
      startTime: addMinutes(400).toISOString(),
      endTime: addMinutes(440).toISOString(),
      durationMinutes: 40,
      energy: 'low',
      difficulty: 'Easy',
      participants: 5,
      capacity: 15
    },

    {
      id: 'hospital-balanced-1',
      title: 'Hospital Room Makeover Design',
      description: 'Brainstorm and design the ultimate futuristic sci-fi hospital room using digital layout tools.',
      topic: 'Creativity',
      ageGroups: ['young', 'teen', 'advanced'],
      host: 'Sam Chen',
      icon: '📐', 
      color: '#FF6B9D',
      startTime: addMinutes(500).toISOString(),
      endTime: addMinutes(545).toISOString(),
      durationMinutes: 45,
      energy: 'medium',
      difficulty: 'Medium',
      participants: 6,
      capacity: 12
    },
    {
      id: 'hospital-balanced-2',
      title: 'Co-Op Interactive Choice Story',
      description: 'Join a text-adventure game where your group votes to choose the plot paths of a fantasy hero.',
      topic: 'Storytelling',
      ageGroups: ['young', 'teen', 'advanced'],
      host: 'Emma Davis',
      icon: '🧭', 
      color: '#A78BFA',
      startTime: addMinutes(600).toISOString(),
      endTime: addMinutes(635).toISOString(),
      durationMinutes: 35,
      energy: 'medium',
      difficulty: 'Easy',
      participants: 4,
      capacity: 10
    },
    {
      id: 'hospital-balanced-3',
      title: 'Lo-Fi Chill Hop Beatmaking',
      description: 'Use custom online soundboards to mix soothing background beats for studying or relaxing.',
      topic: 'Music',
      ageGroups: ['young', 'teen', 'advanced'],
      host: 'Mike Johnson',
      icon: '🎹', 
      color: '#8B5CF6',
      startTime: addMinutes(700).toISOString(),
      endTime: addMinutes(745).toISOString(),
      durationMinutes: 45,
      energy: 'medium',
      difficulty: 'Medium',
      participants: 7,
      capacity: 12
    },

    {
      id: 'hospital-active-1',
      title: 'Digital Murder Mystery Game',
      description: 'An online social deduction game! Question peers, find clues, and uncover the secret spy.',
      topic: 'Storytelling',
      ageGroups: ['young', 'teen', 'advanced'],
      host: 'Alex Rivera',
      icon: '🔍', 
      color: '#A78BFA',
      startTime: addMinutes(800).toISOString(),
      endTime: addMinutes(850).toISOString(),
      durationMinutes: 50,
      energy: 'high',
      difficulty: 'Medium',
      participants: 11,
      capacity: 12
    },
    {
      id: 'hospital-active-2',
      title: 'Live Voice Dubbing Battle',
      description: 'Pick funny movie clips or anime scenes and try hilarious live voice-overs with your team!',
      topic: 'Storytelling',
      ageGroups: ['young', 'teen', 'advanced'],
      host: 'Emma Davis',
      icon: '🎙️',
      color: '#A78BFA',
      startTime: addMinutes(900).toISOString(),
      endTime: addMinutes(940).toISOString(),
      durationMinutes: 40,
      energy: 'high',
      difficulty: 'Easy',
      participants: 8,
      capacity: 8
    },
    {
      id: 'hospital-active-3',
      title: 'Soundboard DJ Remix Duel',
      description: 'A fast-paced music response game! Tap specific loops on screen to match the rhythm challenge.',
      topic: 'Music',
      ageGroups: ['young', 'teen', 'advanced'],
      host: 'Mike Johnson',
      icon: '⚡', 
      color: '#8B5CF6',
      startTime: addMinutes(1000).toISOString(),
      endTime: addMinutes(1045).toISOString(),
      durationMinutes: 45,
      energy: 'high',
      difficulty: 'Advanced',
      participants: 5,
      capacity: 10
    },
    {
      id: 'hospital-active-4',
      title: 'Emoji Pictionary Speed Run',
      description: 'A chaotic real-time race! Decode pop culture and movie titles made entirely out of Emojis.',
      topic: 'Creativity',
      ageGroups: ['young', 'teen', 'advanced'],
      host: 'Sarah Chen',
      icon: '🏁', 
      color: '#FF6B9D',
      startTime: addMinutes(1100).toISOString(),
      endTime: addMinutes(1140).toISOString(),
      durationMinutes: 40,
      energy: 'high',
      difficulty: 'Medium',
      participants: 6,
      capacity: 15
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