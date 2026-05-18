import { useState } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { AgeSelection } from './components/AgeSelection';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { LiveLessonRoom } from './components/LiveLessonRoom';
import { AchievementsView } from './components/AchievementsView';
import { MessagesView } from './components/MessagesView';
import { LearningMockup } from './components/LearningMockup';

type AgeGroup = 'young' | 'teen' | 'advanced' | null;

export default function App() {
  const [username, setUsername] = useState<string | null>(null);
  const [ageGroup, setAgeGroup] = useState<AgeGroup>(null);
  const [activeTab, setActiveTab] = useState('home');

  // Handler logowania
  const handleLogin = (name: string) => {
    setUsername(name);
  };

  // Handler wyboru wieku
  const handleAgeSelect = (age: string) => {
    setAgeGroup(age as AgeGroup);
  };

  // Handler wylogowania
  const handleLogout = () => {
    setUsername(null);
    setAgeGroup(null);
    setActiveTab('home');
  };

  // Renderowanie widoku na podstawie aktywnej zakładki
  const renderView = () => {
    if (activeTab.startsWith('learning_')) {
      const topic = activeTab.split('_')[1];
      return (
        <LearningMockup 
          topic={topic} 
          ageGroup={ageGroup!}
          onBack={() => setActiveTab('home')} 
        />
      );
    }

    switch (activeTab) {
      case 'home':
        return (
          <DashboardView 
            username={username!}
            ageGroup={ageGroup!}
            onJoin={() => setActiveTab('live_session')} 
            onTopic={(topic) => setActiveTab(`learning_${topic}`)} 
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
          <DashboardView 
            username={username!}
            ageGroup={ageGroup!}
            onJoin={() => setActiveTab('live_session')} 
            onTopic={(topic) => setActiveTab(`learning_${topic}`)} 
          />
        );
    }
  };

  // Wyświetl ekran logowania, jeśli użytkownik nie jest zalogowany
  if (!username) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  // Wyświetl wybór wieku, jeśli nie został wybrany
  if (!ageGroup) {
    return <AgeSelection username={username} onAgeSelect={handleAgeSelect} />;
  }

  // Główna aplikacja
  return (
    <div style={{ 
      display: 'flex', 
      height: '100vh', 
      fontFamily: '"Plus Jakarta Sans", sans-serif', 
      backgroundColor: '#F8FAFC' 
    }}>
      <Sidebar 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        username={username}
        onLogout={handleLogout}
      />
      
      <div style={{ 
        flex: 1, 
        padding: '40px', 
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

          /* Scrollbar styling */
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
