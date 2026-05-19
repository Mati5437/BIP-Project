import { useState } from 'react';
import { Search, Filter, Clock, Battery, BatteryMedium, BatteryLow, Users, ArrowLeft } from 'lucide-react';

interface ActivityCatalogueProps {
  ageGroup: string;
  onBack: () => void;
  onSelectActivity: (activity: any) => void;
}

export function ActivityCatalogue({ ageGroup, onBack, onSelectActivity }: ActivityCatalogueProps) {
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [selectedEnergy, setSelectedEnergy] = useState<string>('all');

  const topics = ageGroup === 'young' ? [
    { id: 'all', name: 'All Topics', color: '#64748B' },
    { id: 'creativity', name: 'Creativity & Art', color: '#FF6B9D', icon: '🎨' },
    { id: 'storytelling', name: 'Storytelling', color: '#A78BFA', icon: '📖' },
    { id: 'music', name: 'Music & Rhythm', color: '#F59E0B', icon: '🎵' },
    { id: 'kindness', name: 'Kindness', color: '#10B981', icon: '💚' },
    { id: 'math', name: 'Fun Math', color: '#3B82F6', icon: '🔢' }
  ] : [
    { id: 'all', name: 'All Topics', color: '#64748B' },
    { id: 'entrepreneurship', name: 'Entrepreneurship', color: '#F59E0B', icon: '💡' },
    { id: 'design', name: 'Design', color: '#FF6B9D', icon: '🎨' },
    { id: 'coding', name: 'Coding', color: '#3B82F6', icon: '💻' },
    { id: 'marketing', name: 'Marketing', color: '#8B5CF6', icon: '📢' },
    { id: 'teamwork', name: 'Teamwork', color: '#10B981', icon: '🤝' },
    { id: 'engineering', name: 'Engineering', color: '#14B8A6', icon: '⚙️' }
  ];

  const activities = ageGroup === 'young' ? [
    {
      id: 1,
      title: 'Design a Logo for a Kindness Project',
      description: 'Create a special logo for helping others feel happy',
      topic: 'creativity',
      duration: '20 min',
      energy: 'medium',
      participants: 8,
      host: 'Sarah Chen',
      icon: '🎨',
      color: '#FF6B9D'
    },
    {
      id: 2,
      title: 'Create a Short Story',
      description: 'Tell a story about your favorite animal on an adventure',
      topic: 'storytelling',
      duration: '15 min',
      energy: 'low',
      participants: 6,
      host: 'Emma Davis',
      icon: '📖',
      color: '#A78BFA'
    },
    {
      id: 3,
      title: 'Music & Rhythm Challenge',
      description: 'Make music with everyday objects and create fun rhythms',
      topic: 'music',
      duration: '20 min',
      energy: 'medium',
      participants: 10,
      host: 'Mike Johnson',
      icon: '🎵',
      color: '#F59E0B'
    },
    {
      id: 4,
      title: 'Make a Kindness Campaign',
      description: 'Design a poster to spread kindness in your community',
      topic: 'kindness',
      duration: '25 min',
      energy: 'medium',
      participants: 7,
      host: 'Lisa Park',
      icon: '💚',
      color: '#10B981'
    },
    {
      id: 5,
      title: 'Draw Your Happy Place',
      description: 'Create a drawing of where you feel most happy and safe',
      topic: 'creativity',
      duration: '25 min',
      energy: 'low',
      participants: 5,
      host: 'Nina Patel',
      icon: '🏖️',
      color: '#FF6B9D'
    },
    {
      id: 6,
      title: 'Creative Math Puzzle',
      description: 'Solve fun puzzles with shapes, colors and numbers',
      topic: 'math',
      duration: '15 min',
      energy: 'high',
      participants: 9,
      host: 'Tom Wilson',
      icon: '🔢',
      color: '#3B82F6'
    }
  ] : [
    {
      id: 1,
      title: 'Mini Startup Challenge: Invent a helpful product',
      description: 'Design a product that helps children feel better during recovery',
      topic: 'entrepreneurship',
      duration: '45 min',
      energy: 'medium',
      participants: 8,
      host: 'Alex Rivera',
      icon: '💡',
      color: '#F59E0B'
    },
    {
      id: 2,
      title: 'Build Your First Website',
      description: 'Learn HTML & CSS basics and create your own web page',
      topic: 'coding',
      duration: '45 min',
      energy: 'medium',
      participants: 10,
      host: 'Jordan Lee',
      icon: '💻',
      color: '#3B82F6'
    },
    {
      id: 3,
      title: 'Design a Helpful Robot',
      description: 'Imagine and design a robot that helps people in hospitals',
      topic: 'engineering',
      duration: '30 min',
      energy: 'low',
      participants: 7,
      host: 'Sam Chen',
      icon: '🤖',
      color: '#14B8A6'
    },
    {
      id: 4,
      title: 'Make a Social Media Campaign',
      description: 'Create a campaign to share positivity and hope',
      topic: 'marketing',
      duration: '40 min',
      energy: 'medium',
      participants: 9,
      host: 'Maya Patel',
      icon: '📱',
      color: '#8B5CF6'
    },
    {
      id: 5,
      title: 'Team Problem-Solving Quest',
      description: 'Work together to solve creative challenges',
      topic: 'teamwork',
      duration: '35 min',
      energy: 'high',
      participants: 12,
      host: 'Chris Taylor',
      icon: '🧩',
      color: '#10B981'
    },
    {
      id: 6,
      title: 'Create a Simple Game',
      description: 'Design and code a fun interactive game',
      topic: 'coding',
      duration: '50 min',
      energy: 'medium',
      participants: 8,
      host: 'Dev Kumar',
      icon: '🎮',
      color: '#3B82F6'
    }
  ];

  const filteredActivities = activities.filter(activity => {
    const topicMatch = selectedTopic === 'all' || activity.topic === selectedTopic;
    const energyMatch = selectedEnergy === 'all' || activity.energy === selectedEnergy;
    return topicMatch && energyMatch;
  });

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
            fontWeight: '600',
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

        <h1 style={{
          fontSize: '32px',
          fontWeight: '800',
          color: '#1E293B',
          marginBottom: '8px'
        }}>
          Activity Catalogue
        </h1>
        <p style={{
          fontSize: '16px',
          color: '#64748B'
        }}>
          Find the perfect activity for you today!
        </p>
      </div>

      {/* Filters */}
      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '24px',
        marginBottom: '32px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.06)'
      }}>
        <h3 style={{
          fontSize: '16px',
          fontWeight: '700',
          color: '#1E293B',
          marginBottom: '16px'
        }}>
          Filter by Topic
        </h3>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '24px'
        }}>
          {topics.map(topic => (
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
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              {topic.icon && <span>{topic.icon}</span>}
              {topic.name}
            </button>
          ))}
        </div>

        <h3 style={{
          fontSize: '16px',
          fontWeight: '700',
          color: '#1E293B',
          marginBottom: '16px'
        }}>
          Filter by Energy Level
        </h3>
        <div style={{
          display: 'flex',
          gap: '12px',
          flexWrap: 'wrap'
        }}>
          {[
            { id: 'all', label: 'All Levels', icon: null },
            { id: 'low', label: 'Taking it Easy', icon: '😌' },
            { id: 'medium', label: 'Feeling Good', icon: '😊' },
            { id: 'high', label: 'Full of Energy', icon: '😄' }
          ].map(level => (
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
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              {level.icon && <span>{level.icon}</span>}
              {level.label}
            </button>
          ))}
        </div>
      </div>

      {/* Activities Grid */}
      <div>
        <p style={{
          fontSize: '14px',
          color: '#64748B',
          marginBottom: '20px',
          fontWeight: '600'
        }}>
          Showing {filteredActivities.length} {filteredActivities.length === 1 ? 'activity' : 'activities'}
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '20px'
        }}>
          {filteredActivities.map(activity => (
            <div
              key={activity.id}
              onClick={() => onSelectActivity(activity)}
              style={{
                background: 'white',
                borderRadius: '20px',
                padding: '28px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                cursor: 'pointer',
                transition: 'all 0.3s',
                border: '2px solid transparent'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.12)';
                e.currentTarget.style.borderColor = activity.color;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.06)';
                e.currentTarget.style.borderColor = 'transparent';
              }}
            >
              <div style={{
                fontSize: '56px',
                marginBottom: '16px'
              }}>
                {activity.icon}
              </div>

              <h3 style={{
                fontSize: '18px',
                fontWeight: '700',
                color: '#1E293B',
                marginBottom: '8px',
                minHeight: '54px'
              }}>
                {activity.title}
              </h3>

              <p style={{
                fontSize: '14px',
                color: '#64748B',
                marginBottom: '16px',
                lineHeight: '1.5',
                minHeight: '42px'
              }}>
                {activity.description}
              </p>

              <div style={{
                display: 'flex',
                gap: '8px',
                marginBottom: '16px',
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
                  <Users size={14} />
                  {activity.participants} kids
                </div>
              </div>

              <div style={{
                paddingTop: '16px',
                borderTop: '1px solid #F1F5F9'
              }}>
                <p style={{
                  fontSize: '13px',
                  color: '#64748B',
                  margin: 0
                }}>
                  Hosted by <strong style={{ color: '#1E293B' }}>{activity.host}</strong>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
