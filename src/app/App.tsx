import { useState } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { AgeSelection } from './components/AgeSelection';
import { EnergySelection } from './components/EnergySelection';
import { Sidebar } from './components/Sidebar';
import { ChildDashboard } from './components/ChildDashboard';
import { ActivityCatalogue } from './components/ActivityCatalogue';
import { LiveLessonRoom } from './components/LiveLessonRoom';
import { AchievementsView } from './components/AchievementsView';
import { MessagesView } from './components/MessagesView';
import {
  getMockUser,
  saveMockUser,
  type EnergyLevel
} from './mock/mockDatabase';

type AgeGroup = 'young' | 'teen' | 'advanced';

export default function App() {
  const [username, setUsername] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [ageGroup, setAgeGroup] = useState<AgeGroup | null>(null);
  const [energyLevel, setEnergyLevel] = useState<EnergyLevel | null>(null);
  const [activeTab, setActiveTab] = useState('home');

  const handleLogin = (name: string, role: string) => {
    const savedUser = saveMockUser(name, role, {});

    setUsername(name);
    setUserRole(role);
    setActiveTab('home');

    if (role === 'child') {
      setAgeGroup(savedUser.ageGroup ?? null);

      if (savedUser.energyPopupCompleted && savedUser.energyLevel) {
        setEnergyLevel(savedUser.energyLevel);
      } else {
        setEnergyLevel(null);
      }
    } else {
      setAgeGroup('teen');
      setEnergyLevel('medium');
    }
  };

  const handleAgeSelect = (selectedAgeGroup: string) => {
    setAgeGroup(selectedAgeGroup as AgeGroup);

    if (!username) return;

    const savedUser = getMockUser(username, 'child');

    if (savedUser?.energyPopupCompleted && savedUser.energyLevel) {
      setEnergyLevel(savedUser.energyLevel);
    } else {
      setEnergyLevel(null);
    }
  };

  const handleEnergySelect = (selectedEnergyLevel: EnergyLevel) => {
    setEnergyLevel(selectedEnergyLevel);
  };

  const handleLogout = () => {
    setUsername(null);
    setUserRole(null);
    setAgeGroup(null);
    setEnergyLevel(null);
    setActiveTab('home');
  };

  const renderView = () => {
    if (userRole !== 'child') {
      return (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1E293B' }}>
            {userRole === 'parent'
              ? 'Parent Dashboard'
              : userRole === 'host'
                ? 'Host Dashboard'
                : 'Hospital Dashboard'}
          </h2>
          <p style={{ color: '#64748B' }}>
            Coming soon in the next iteration!
          </p>
        </div>
      );
    }

    switch (activeTab) {
      case 'home':
        return (
          <ChildDashboard
            username={username!}
            ageGroup={ageGroup!}
            onJoinSession={() => setActiveTab('live_session')}
            onBrowseActivities={() => setActiveTab('activities')}
          />
        );

      case 'activities':
        return (
          <ActivityCatalogue
            ageGroup={ageGroup!}
            onBack={() => setActiveTab('home')}
            onSelectActivity={() => {
              setActiveTab('live_session');
            }}
          />
        );

      case 'live_session':
        return (
          <LiveLessonRoom
            onBack={() => setActiveTab('home')}
            ageGroup={ageGroup!}
          />
        );

      case 'achievements':
        return <AchievementsView ageGroup={ageGroup!} />;

      case 'messages':
        return <MessagesView ageGroup={ageGroup!} />;

      default:
        return (
          <ChildDashboard
            username={username!}
            ageGroup={ageGroup!}
            onJoinSession={() => setActiveTab('live_session')}
            onBrowseActivities={() => setActiveTab('activities')}
          />
        );
    }
  };

  if (!username) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  if (userRole === 'child' && !ageGroup) {
    return (
      <AgeSelection
        username={username}
        onAgeSelect={handleAgeSelect}
      />
    );
  }

  if (userRole === 'child' && !energyLevel) {
    return (
      <EnergySelection
        username={username}
        onEnergySelect={handleEnergySelect}
      />
    );
  }

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      fontFamily: '"Plus Jakarta Sans", sans-serif',
      background: 'linear-gradient(135deg, #EBF8FF 0%, #F0F9FF 100%)'
    }}>
      {userRole === 'child' && (
        <Sidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          username={username}
          onLogout={handleLogout}
        />
      )}

      <div style={{
        flex: 1,
        overflowY: 'auto'
      }}>
        {renderView()}
      </div>

      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-fade {
            animation: fadeIn 0.5s ease;
          }

          ::-webkit-scrollbar {
            width: 8px;
          }

          ::-webkit-scrollbar-track {
            background: #F1F5F9;
            border-radius: 10px;
          }

          ::-webkit-scrollbar-thumb {
            background: #CBD5E1;
            border-radius: 10px;
          }

          ::-webkit-scrollbar-thumb:hover {
            background: #94A3B8;
          }
        `}
      </style>
    </div>
  );
}