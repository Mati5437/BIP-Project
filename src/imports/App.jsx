import React, { useState } from 'react';
import { 
  Home, Video, Trophy, MessageSquare, Search, Bell, Star, Code, 
  Palette, Briefcase, Megaphone, TrendingUp, ArrowLeft, Play, 
  User, Mic, Camera, Monitor, X, Send, CheckCircle 
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  const renderView = () => {
    if (activeTab.startsWith('learning_')) {
      return <LearningMockup topic={activeTab.split('_')[1]} onBack={() => setActiveTab('home')} />;
    }

    switch (activeTab) {
      case 'home': return <DashboardView onJoin={() => setActiveTab('live_session')} onTopic={(t) => setActiveTab(`learning_${t}`)} />;
      case 'live_session': return <LiveLessonRoom onBack={() => setActiveTab('home')} />;
      case 'achievements': return <AchievementsView />;
      case 'messages': return <MessagesView />;
      default: return <DashboardView onJoin={() => setActiveTab('live_session')} onTopic={(t) => setActiveTab(`learning_${t}`)} />;
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: '"Plus Jakarta Sans", sans-serif', backgroundColor: '#F8FAFC' }}>
      {/* SIDEBAR - Nawiązanie do image_774c14.png */}
      <div style={{ width: '280px', backgroundColor: '#0A2E6E', color: 'white', padding: '30px 20px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px', paddingLeft: '10px' }}>
          <div style={{ width: '40px', height: '40px', backgroundColor: 'white', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0A2E6E', fontWeight: 'bold' }}>C</div>
          <h1 style={{ fontSize: '20px', fontWeight: 'bold', margin: 0 }}>CareQuest</h1>
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <MenuBtn active={activeTab === 'home'} onClick={() => setActiveTab('home')} icon={<Home size={20}/>} label="Home" />
          <MenuBtn active={activeTab === 'live_session'} onClick={() => setActiveTab('live_session')} icon={<Video size={20}/>} label="Live Sessions" />
          <MenuBtn active={activeTab === 'achievements'} onClick={() => setActiveTab('achievements')} icon={<Trophy size={20}/>} label="Achievements" />
          <MenuBtn active={activeTab === 'messages'} onClick={() => setActiveTab('messages')} icon={<MessageSquare size={20}/>} label="Messages" badge="3" />
        </nav>
        
        <div style={{ marginTop: 'auto', backgroundColor: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '24px' }}>
           <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ backgroundColor: '#FFD700', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000' }}><Star size={18} fill="currentColor"/></div>
              <div>
                <p style={{ margin: 0, fontSize: '10px', opacity: 0.6, fontWeight: 'bold' }}>CARE COINS</p>
                <p style={{ margin: 0, fontWeight: 'bold', fontSize: '18px' }}>240</p>
              </div>
           </div>
        </div>
      </div>

      <div style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
        {renderView()}
      </div>
    </div>
  );
}

// --- ZAKTUALIZOWANY DASHBOARD ---
function DashboardView({ onJoin, onTopic }) {
  return (
    <div className="animate-fade">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: '800' }}>Hi, Aarav! 👋</h2>
        <div style={{ display: 'flex', gap: '15px' }}>
          <div style={{ position: 'relative' }}>
            <Search style={{ position: 'absolute', left: '15px', top: '12px', color: '#94A3B8' }} size={18} />
            <input type="text" placeholder="Search activities..." style={{ padding: '12px 45px', borderRadius: '15px', border: '1px solid #E2E8F0', width: '250px' }} />
          </div>
          <div style={{ padding: '12px', backgroundColor: 'white', borderRadius: '15px', border: '1px solid #E2E8F0' }}><Bell size={20} color="#64748B"/></div>
        </div>
      </div>

      {/* KARTA Z NOWYM PRZYCISKIEM - image_774c14.png */}
      <div style={{ background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)', borderRadius: '35px', padding: '50px', color: 'white', position: 'relative', overflow: 'hidden', marginBottom: '40px' }}>
        <span style={{ backgroundColor: '#EF4444', padding: '6px 15px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold' }}>LIVE NOW</span>
        <h3 style={{ fontSize: '36px', fontWeight: 'bold', margin: '20px 0 10px' }}>Design a Logo for a Cause</h3>
        <p style={{ marginBottom: '30px', opacity: 0.9 }}>Join your classmates for a creative live session!</p>
        
        {/* Przycisk o który prosiłeś */}
        <button onClick={onJoin} className="primary-btn" style={{ backgroundColor: 'white', color: '#1D4ED8', padding: '15px 30px', borderRadius: '15px', fontWeight: 'bold', border: 'none', cursor: 'pointer', fontSize: '16px' }}>
          Online lessons join now
        </button>
        
        <div style={{ position: 'absolute', right: '50px', top: '50%', transform: 'translateY(-50%)', fontSize: '150px', opacity: 0.1 }}>🎨</div>
      </div>

      <h3 style={{ marginBottom: '20px' }}>Explore Topics</h3>
      <div style={{ display: 'flex', gap: '20px' }}>
        <TopicCard icon={<Briefcase size={32}/>} label="Business" color="#EFF6FF" onClick={() => onTopic('business')} />
        <TopicCard icon={<Palette size={32}/>} label="Design" color="#F0FDF4" onClick={() => onTopic('design')} />
        <TopicCard icon={<Code size={32}/>} label="Coding" color="#FFF7ED" onClick={() => onTopic('coding')} />
        <TopicCard icon={<Megaphone size={32}/>} label="Marketing" color="#FAF5FF" onClick={() => onTopic('marketing')} />
        <TopicCard icon={<TrendingUp size={32}/>} label="Finance" color="#FEFCE8" onClick={() => onTopic('finance')} />
      </div>
    </div>
  );
}

// --- NOWY WIDOK: MOCKUP LEKCJI ONLINE ---
function LiveLessonRoom({ onBack }) {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', animation: 'fadeIn 0.5s ease' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#0F172A', padding: '15px 25px', borderRadius: '20px', color: 'white', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{ width: '10px', height: '10px', backgroundColor: '#EF4444', borderRadius: '50%', animation: 'pulse 1.5s infinite' }}></div>
          <h3 style={{ margin: 0, fontSize: '16px' }}>Live: Design a Logo for a Cause</h3>
        </div>
        <button onClick={onBack} style={{ backgroundColor: '#EF4444', border: 'none', color: 'white', padding: '8px 15px', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <X size={18}/> Leave Room
        </button>
      </div>

      <div style={{ flex: 1, display: 'flex', gap: '20px' }}>
        {/* MOCKUP OKNA WIDEO / LEKCJI */}
        <div style={{ flex: 3, backgroundColor: '#1E293B', borderRadius: '30px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', border: '4px solid #3B82F6' }}>
          <div style={{ textAlign: 'center', color: 'white opacity: 0.5' }}>
            <Video size={80} style={{ marginBottom: '20px', opacity: 0.2 }} />
            <p style={{ fontSize: '20px', fontWeight: 'bold' }}>[ TU WKLEJ SWÓJ MOCKUP LEKCJI ]</p>
            <p style={{ fontSize: '14px' }}>Space reserved for video stream or presentation</p>
          </div>
          
          {/* Panel kontrolny na dole */}
          <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '15px', backgroundColor: 'rgba(15, 23, 42, 0.8)', padding: '12px 25px', borderRadius: '20px', backdropFilter: 'blur(10px)' }}>
            <ControlBtn icon={<Mic size={20}/>} />
            <ControlBtn icon={<Camera size={20}/>} />
            <ControlBtn icon={<Monitor size={20}/>} color="#3B82F6" />
          </div>
        </div>

        {/* CZAT / LISTA UCZESTNIKÓW */}
        <div style={{ flex: 1, backgroundColor: 'white', borderRadius: '30px', padding: '20px', boxShadow: '0 10px 20px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' }}>
          <h4 style={{ margin: '0 0 20px 0', borderBottom: '1px solid #F1F5F9', paddingBottom: '10px' }}>Participants (12)</h4>
          <div style={{ flex: 1, overflowY: 'auto' }}>
             <Participant name="Mentor Priya (Host)" active />
             <Participant name="Aarav (You)" />
             <Participant name="Isha" />
             <Participant name="Rohan" />
          </div>
          <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
            <input type="text" placeholder="Type a message..." style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #E2E8F0', outline: 'none' }} />
          </div>
        </div>
      </div>
    </div>
  );
}

// --- POMOCNICZE ---
function ControlBtn({ icon, color = 'white opacity: 0.1' }) {
  return (
    <button style={{ width: '45px', height: '45px', borderRadius: '12px', border: 'none', backgroundColor: color === 'white opacity: 0.1' ? 'rgba(255,255,255,0.1)' : color, color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: '0.2s' }}>
      {icon}
    </button>
  );
}

function Participant({ name, active }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
      <div style={{ width: '32px', height: '32px', backgroundColor: '#E2E8F0', borderRadius: '8px' }}></div>
      <span style={{ fontSize: '14px', fontWeight: active ? 'bold' : 'normal' }}>{name}</span>
    </div>
  );
}

function TopicCard({ icon, label, color, onClick }) {
  return (
    <div onClick={onClick} className="topic-card" style={{ backgroundColor: color, width: '150px', height: '160px', borderRadius: '25px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
      <div style={{ marginBottom: '15px', color: '#1E293B' }}>{icon}</div>
      <span style={{ fontWeight: 'bold', color: '#1E293B' }}>{label}</span>
    </div>
  );
}

function MenuBtn({ icon, label, active, onClick, badge }) {
  return (
    <button onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '12px 20px', borderRadius: '15px', border: 'none', width: '100%', cursor: 'pointer', backgroundColor: active ? '#3B82F6' : 'transparent', color: active ? 'white' : '#94A3B8', fontWeight: active ? 'bold' : '500' }}>
      {icon} <span style={{ flex: 1, textAlign: 'left' }}>{label}</span>
      {badge && <span style={{ backgroundColor: '#EF4444', color: 'white', fontSize: '10px', padding: '2px 8px', borderRadius: '20px' }}>{badge}</span>}
    </button>
  );
}

function AchievementsView() {
  const categories = [
    { name: "Creative Explorer", icon: "🎨", progress: 85, color: "#F0FDF4", textColor: "#166534" },
    { name: "Coding Ninja", icon: "💻", progress: 40, color: "#EFF6FF", textColor: "#1E40AF" },
    { name: "Social Hero", icon: "🤝", progress: 100, color: "#FEFCE8", textColor: "#854D0E" }
  ];

  const badges = [
    { id: 1, title: "First Lesson", desc: "Completed your first live session", status: "Unlocked", icon: "🌟", rarity: "Common" },
    { id: 2, title: "Logo Master", desc: "Designed a logo for a charity", status: "Unlocked", icon: "🖋️", rarity: "Rare" },
    { id: 3, title: "7-Day Streak", desc: "Logged in for 7 days in a row", status: "Unlocked", icon: "🔥", rarity: "Epic" },
    { id: 4, title: "Community Leader", desc: "Helped 5 other students", status: "Locked", icon: "👑", rarity: "Legendary" },
    { id: 5, title: "Fast Learner", desc: "Finished 3 topics in one day", status: "Locked", icon: "⚡", rarity: "Rare" },
    { id: 6, title: "Bug Hunter", desc: "Reported an issue or fixed a code", status: "Locked", icon: "🐞", rarity: "Common" }
  ];

  return (
    <div style={{ animation: 'fadeIn 0.6s ease', paddingBottom: '40px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
        <div>
          <h2 style={{ fontSize: '32px', fontWeight: '900', color: '#0A2E6E', margin: 0 }}>My Achievements 🏆</h2>
          <p style={{ color: '#64748B', marginTop: '5px' }}>Track your progress and collect unique badges!</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#64748B' }}>Total Care Coins:</span>
          <h3 style={{ margin: 0, color: '#F59E0B', fontSize: '24px' }}>✨ 240</h3>
        </div>
      </div>

      {/* SEKCJA 1: PROGRESS TRACKERS (Zestawienie z image_822e39.png) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '40px' }}>
        {categories.map((cat, i) => (
          <div key={i} style={{ backgroundColor: 'white', padding: '25px', borderRadius: '25px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
              <span style={{ fontSize: '24px' }}>{cat.icon}</span>
              <span style={{ fontWeight: 'bold', color: cat.textColor, fontSize: '14px', backgroundColor: cat.color, padding: '4px 10px', borderRadius: '10px' }}>
                {cat.progress}%
              </span>
            </div>
            <h4 style={{ margin: '0 0 10px 0', color: '#1E293B' }}>{cat.name}</h4>
            <div style={{ width: '100%', height: '8px', backgroundColor: '#F1F5F9', borderRadius: '10px', overflow: 'hidden' }}>
              <div style={{ width: `${cat.progress}%`, height: '100%', backgroundColor: cat.textColor, borderRadius: '10px', transition: 'width 1s ease-in-out' }}></div>
            </div>
          </div>
        ))}
      </div>

      {/* SEKCJA 2: BADGE GRID (Nawiązanie do image_82313b.png) */}
      <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px', color: '#1E293B' }}>Badges Collection</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
        {badges.map((badge) => (
          <div key={badge.id} style={{ 
            backgroundColor: 'white', 
            padding: '25px', 
            borderRadius: '30px', 
            textAlign: 'center', 
            position: 'relative',
            opacity: badge.status === 'Locked' ? 0.6 : 1,
            filter: badge.status === 'Locked' ? 'grayscale(1)' : 'none',
            border: badge.status === 'Unlocked' ? '2px solid #E2E8F0' : '2px dashed #CBD5E1',
            transition: 'transform 0.3s ease',
            cursor: 'pointer'
          }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} 
             onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
            
            {badge.status === 'Locked' && (
              <div style={{ position: 'absolute', top: '15px', right: '15px', fontSize: '14px' }}>🔒</div>
            )}
            
            <div style={{ 
              width: '80px', height: '80px', backgroundColor: '#F8FAFC', borderRadius: '50%', 
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', 
              margin: '0 auto 15px auto', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)' 
            }}>
              {badge.icon}
            </div>
            
            <h5 style={{ margin: '0 0 5px 0', fontSize: '16px', color: '#0F172A' }}>{badge.title}</h5>
            <p style={{ margin: 0, fontSize: '12px', color: '#64748B', lineHeight: '1.4' }}>{badge.desc}</p>
            
            <div style={{ marginTop: '15px' }}>
              <span style={{ 
                fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px',
                color: badge.rarity === 'Legendary' ? '#7C3AED' : badge.rarity === 'Epic' ? '#DB2777' : '#64748B'
              }}>
                {badge.rarity}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
function MessagesView() {
  const [selectedChat, setSelectedChat] = useState(0);

  const chatList = [
    { id: 0, name: "Mentor Priya", msg: "Great job on the logo design today!", online: true },
    { id: 1, name: "Aarav Mehta", msg: "Do you have the link?", online: false },
    { id: 2, name: "Support Team", msg: "Coins updated.", online: true }
  ];

  // Zabezpieczenie: jeśli z jakiegoś powodu selectedChat wyjdzie poza zakres, ustaw 0
  const currentChat = chatList[selectedChat] || chatList[0];

  return (
    <div style={{ display: 'flex', gap: '20px', height: 'calc(100vh - 150px)', animation: 'fadeIn 0.5s ease' }}>
      
      {/* LISTA CZATÓW */}
      <div style={{ width: '300px', backgroundColor: 'white', borderRadius: '25px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
        {chatList.map((chat, i) => (
          <div 
            key={chat.id} 
            onClick={() => setSelectedChat(i)}
            style={{ 
              padding: '20px', 
              cursor: 'pointer', 
              backgroundColor: selectedChat === i ? '#F0F7FF' : 'transparent',
              borderBottom: '1px solid #F1F5F9',
              transition: '0.2s'
            }}
          >
            <div style={{ fontWeight: 'bold', color: '#1E293B' }}>{chat.name}</div>
            <div style={{ fontSize: '12px', color: '#64748B', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {chat.msg}
            </div>
          </div>
        ))}
      </div>

      {/* OKNO ROZMOWY */}
      <div style={{ flex: 1, backgroundColor: 'white', borderRadius: '25px', padding: '30px', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
        <div style={{ flex: 1, backgroundColor: '#F8FAFC', borderRadius: '15px', padding: '20px', border: '1px solid #F1F5F9' }}>
           <p style={{ margin: 0 }}><b>{currentChat.name}:</b></p>
           <p style={{ marginTop: '10px', color: '#1E293B' }}>{currentChat.msg}</p>
        </div>
        
        <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
          <input 
            type="text" 
            placeholder="Write a message..." 
            style={{ flex: 1, padding: '12px 20px', borderRadius: '12px', border: '1px solid #E2E8F0', outline: 'none' }} 
          />
          <button style={{ backgroundColor: '#3B82F6', color: 'white', border: 'none', padding: '0 20px', borderRadius: '12px', cursor: 'pointer' }}>
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
function LearningMockup({ topic, onBack }) {
  // Dane dla każdej sekcji - znacznie rozbudowane
  const contentData = {
    business: {
      title: "Business & Entrepreneurship",
      icon: <Briefcase size={40} />,
      color: "#EFF6FF",
      lessons: [
        { name: "How to Start a Business", status: "Completed", time: "15 min" },
        { name: "Defining Your Target Audience", status: "In Progress", time: "25 min" },
        { name: "Budgeting Basics", status: "Locked", time: "20 min" }
      ],
      description: "Learn how to turn your ideas into a real company. We cover everything from planning to launching."
    },
    design: {
      title: "Graphic Design & UX/UI",
      icon: <Palette size={40} />,
      color: "#F0FDF4",
      lessons: [
        { name: "Introduction to Color Theory", status: "Completed", time: "10 min" },
        { name: "Designing Your First Logo", status: "Completed", time: "45 min" },
        { name: "User Interface Basics", status: "In Progress", time: "30 min" }
      ],
      description: "Master the art of visual communication. Learn to create logos, websites, and beautiful interfaces."
    },
    coding: {
      title: "Computer Science & Programming",
      icon: <Code size={40} />,
      color: "#FFF7ED",
      lessons: [
        { name: "Python for Beginners", status: "In Progress", time: "60 min" },
        { name: "Building Simple Websites (HTML/CSS)", status: "Locked", time: "120 min" },
        { name: "Logic & Algorithms", status: "Locked", time: "40 min" }
      ],
      description: "Learn the language of the future. Write your first lines of code and build functional applications."
    },
    marketing: {
      title: "Digital Marketing & Branding",
      icon: <Megaphone size={40} />,
      color: "#FAF5FF",
      lessons: [
        { name: "Social Media Strategy", status: "Locked", time: "35 min" },
        { name: "Power of Personal Branding", status: "In Progress", time: "20 min" },
        { name: "Introduction to Ads", status: "Locked", time: "50 min" }
      ],
      description: "Discover how to share your ideas with the world. Learn about branding, social media, and communication."
    },
    finance: {
      title: "Financial Literacy",
      icon: <TrendingUp size={40} />,
      color: "#FEFCE8",
      lessons: [
        { name: "Saving vs. Investing", status: "In Progress", time: "30 min" },
        { name: "Understanding Compound Interest", status: "Locked", time: "20 min" },
        { name: "Smart Spending Habits", status: "Locked", time: "15 min" }
      ],
      description: "Master your money. Learn how to save, invest, and make smart financial decisions for your future."
    }
  };

  const current = contentData[topic] || contentData.design;

  return (
    <div style={{ animation: 'fadeIn 0.5s ease' }}>
      <button onClick={onBack} style={{ border: 'none', background: 'none', color: '#1D4ED8', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '30px' }}>
        <ArrowLeft size={20} /> Back to Dashboard
      </button>

      <div style={{ display: 'flex', gap: '40px' }}>
        {/* Lewa strona: Opis tematu */}
        <div style={{ flex: 1 }}>
          <div style={{ backgroundColor: current.color, width: '80px', height: '80px', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
            {current.icon}
          </div>
          <h2 style={{ fontSize: '36px', fontWeight: '900', color: '#0A2E6E', marginBottom: '15px' }}>{current.title}</h2>
          <p style={{ fontSize: '18px', color: '#64748B', lineHeight: '1.6', marginBottom: '30px' }}>{current.description}</p>
          
          <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '25px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
            <h4 style={{ marginBottom: '15px' }}>Topic Progress</h4>
            <div style={{ width: '100%', height: '10px', backgroundColor: '#F1F5F9', borderRadius: '10px', overflow: 'hidden' }}>
              <div style={{ width: '35%', height: '100%', backgroundColor: '#3B82F6', borderRadius: '10px' }}></div>
            </div>
            <p style={{ fontSize: '14px', marginTop: '10px', color: '#64748B' }}>35% Complete • 2 lessons to go</p>
          </div>
        </div>

        {/* Prawa strona: Lista lekcji (image_76cc17.png) */}
        <div style={{ flex: 1.5 }}>
          <h3 style={{ marginBottom: '20px', fontSize: '20px', fontWeight: 'bold' }}>Curriculum</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {current.lessons.map((lesson, i) => (
              <div key={i} style={{ 
                backgroundColor: 'white', 
                padding: '20px 30px', 
                borderRadius: '20px', 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                boxShadow: '0 4px 6px rgba(0,0,0,0.02)',
                border: '1px solid #F1F5F9',
                opacity: lesson.status === 'Locked' ? 0.6 : 1
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <div style={{ color: lesson.status === 'Completed' ? '#10B981' : '#64748B' }}>
                    {lesson.status === 'Completed' ? <CheckCircle size={24} /> : <Play size={24} />}
                  </div>
                  <div>
                    <h5 style={{ margin: 0, fontSize: '16px' }}>{lesson.name}</h5>
                    <span style={{ fontSize: '12px', color: '#94A3B8' }}>{lesson.time}</span>
                  </div>
                </div>
                <div style={{ 
                  fontSize: '12px', 
                  fontWeight: 'bold', 
                  padding: '5px 12px', 
                  borderRadius: '10px',
                  backgroundColor: lesson.status === 'Completed' ? '#DCFCE7' : lesson.status === 'Locked' ? '#F1F5F9' : '#DBEAFE',
                  color: lesson.status === 'Completed' ? '#166534' : lesson.status === 'Locked' ? '#94A3B8' : '#1E40AF'
                }}>
                  {lesson.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}