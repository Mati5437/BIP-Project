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
import { ShopView } from './components/ShopView';
import { ScheduleView } from './components/ScheduleView';
import { SessionCompleted } from './components/SessionCompleted';
import { JoiningScreen } from './components/JoiningScreen';
import {
  getMockUser,
  saveMockUser,
  type EnergyLevel
} from './mock/mockDatabase';

const themeMapping: Record<string, { background: string }> = {
  'default':       { background: 'linear-gradient(135deg, #EBF8FF 0%, #F0F9FF 100%)' },
  'ocean-theme':   { background: 'linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 100%)' },
  'sunset-theme':  { background: 'linear-gradient(135deg, #FFEDD5 0%, #FED7AA 100%)' },
  'nature-theme':  { background: 'linear-gradient(135deg, #EAFAF1 0%, #D5F5E3 100%)' }
};

type AgeGroup = 'young' | 'teen' | 'advanced';

export default function App() {
  const [username, setUsername] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [ageGroup, setAgeGroup] = useState<AgeGroup | null>(null);
  const [energyLevel, setEnergyLevel] = useState<EnergyLevel | null>(null);
  const [activeTab, setActiveTab] = useState('home');

  const handleLogin = (name: string, role: string) => {
    const savedUser = saveMockUser(name, role, {});
    setUsername(savedUser.username);
    setUserRole(savedUser.role);



    setActiveTab('home');
  };

  const handleLogout = () => {
    setUsername(null);
    setUserRole(null);
    setAgeGroup(null);
    setEnergyLevel(null);
    setActiveTab('home');
  };

  const handleAgeSelect = (age: AgeGroup) => {
    if (!username) return;
    saveMockUser(username, 'child', { ageGroup: age });
    setAgeGroup(age);
  };

  const handleEnergySelect = (energy: EnergyLevel) => {
    if (!username) return;
    saveMockUser(username, 'child', { energyLevel: energy });
    setEnergyLevel(energy);
  };

  const userData = username ? getMockUser(username, 'child') : null;
  const currentTheme = userData?.equippedTheme ?? 'default';

  const renderView = () => {
    if (!username || !ageGroup || !energyLevel) return null;

    switch (activeTab) {
      case 'home':
        return (
          <ChildDashboard
            username={username}
            ageGroup={ageGroup}
            onJoinSession={() => setActiveTab('joining')}
            onBrowseActivities={() => setActiveTab('activities')}
            onOpenSchedule={() => setActiveTab('schedule')}
          />
        );

      case 'schedule':
        return (
          <ScheduleView
            username={username}
            ageGroup={ageGroup}
            onJoinSession={() => setActiveTab('joining')}
          />
        );

      case 'activities':
        return (
          <ActivityCatalogue
            username={username}
            ageGroup={ageGroup}
            onBack={() => setActiveTab('home')}
            onSelectActivity={() => setActiveTab('joining')}
          />
        );

      case 'shop':
        return (
          <ShopView
            username={username}
            ageGroup={ageGroup}
          />
        );

      case 'joining':
        return (
          <JoiningScreen
            onFinished={() => setActiveTab('live-room')}
          />
        );

      case 'live-room':
        return (
          <LiveLessonRoom
            ageGroup={ageGroup}
            onBack={() => setActiveTab('home')}
            onEndSession={() => setActiveTab('session-completed')}
          />
        );

      case 'session-completed':
        return (
          <SessionCompleted
            username={username}
            ageGroup={ageGroup}
            onBack={() => setActiveTab('home')}
          />
        );

      case 'achievements':
        return <AchievementsView ageGroup={ageGroup} />;

      case 'messages':
        return <MessagesView ageGroup={ageGroup} />;

      default:
        return (
          <ChildDashboard
            username={username}
            ageGroup={ageGroup}
            onJoinSession={() => setActiveTab('joining')}
            onBrowseActivities={() => setActiveTab('activities')}
            onOpenSchedule={() => setActiveTab('schedule')}
          />
        );
    }
  };

  if (!username || !userRole) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  if (userRole === 'child' && !ageGroup) {
    return <AgeSelection username={username} onAgeSelect={handleAgeSelect} />;
  }

  if (userRole === 'child' && !energyLevel) {
    return (
      <EnergySelection
        username={username}
        onEnergySelect={handleEnergySelect}
      />
    );
  }

  const shouldHideSidebar = activeTab === 'joining' || activeTab === 'live-room';

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      fontFamily: '"Plus Jakarta Sans", sans-serif',
      background: themeMapping[currentTheme]?.background || themeMapping.default.background,
      transition: 'background 0.5s ease'
    }}>
      {userRole === 'child' && !shouldHideSidebar && (
        <Sidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          username={username}
          onLogout={handleLogout}
        />
      )}

      <div style={{ flex: 1, overflowY: 'auto' }}>
        {renderView()}
      </div>

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          .animate-fade { animation: fadeIn 0.5s ease; }

          ::-webkit-scrollbar { width: 8px; }
          ::-webkit-scrollbar-track { background: #F1F5F9; border-radius: 10px; }
          ::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 10px; }
          ::-webkit-scrollbar-thumb:hover { background: #94A3B8; }
        `}
      </style>
    </div>
  );
}