import { useState } from 'react';
import { Send } from 'lucide-react';
import { getMockUser } from '../mock/mockDatabase';

interface MessagesViewProps {
  ageGroup: string;
  username: string;
}

const buddyIcons: Record<string, string> = {
  'blue-buddy': '💙',
  'star-buddy': '⭐',
  'robot-buddy': '🤖',
  'default': '✨'
};

export function MessagesView({ ageGroup, username }: MessagesViewProps) {
  const [selectedChatIndex, setSelectedChatIndex] = useState(0);
  const [message, setMessage] = useState('');

  // 1. Pobieranie danych Buddy'ego z bezpiecznym rzutowaniem
  const userData = getMockUser(username, 'child') as any;
  const activeBuddy = userData?.equippedBuddy || 'default';
  const buddyEmoji = buddyIcons[activeBuddy] || buddyIcons['default'];

  // 2. Funkcja generująca listę czatów - naprawione klamry i ID
  const getChatList = () => {
    const buddyChat = { 
      id: 'buddy', 
      name: `My Buddy ${buddyEmoji}`, 
      msg: "Hello, I'm your buddy!", 
      online: true,
      isBuddy: true 
    };

    const otherChats = ageGroup === 'young' 
      ? [
          { id: '1', name: 'Mentor Sarah', msg: 'Great job! 🎨', online: true, isBuddy: false },
          { id: '2', name: 'Emma', msg: 'Can you share your drawing?', online: false, isBuddy: false },
          { id: '3', name: 'Support', msg: 'Care Coins updated! ⭐', online: true, isBuddy: false }
        ]
      : [
          { id: '1', name: 'Mentor Sarah', msg: 'Excellent work!', online: true, isBuddy: false },
          { id: '2', name: 'Alex Thompson', msg: 'Share resources?', online: false, isBuddy: false },
          { id: '3', name: 'Support', msg: 'Progress updated.', online: true, isBuddy: false }
        ];

    return [buddyChat, ...otherChats];
  };

  const chatList = getChatList();
  const currentChat = chatList[selectedChatIndex] || chatList[0];

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessage('');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        gap: '20px',
        height: 'calc(100vh - 150px)',
        animation: 'fadeIn 0.5s ease'
      }}
    >
      {/* LEWA KOLUMNA */}
      <div
        style={{
          width: '320px',
          backgroundColor: 'white',
          borderRadius: '25px',
          overflow: 'hidden',
          boxShadow: '0 4px 12px rgba(0,0,0,0.06)'
        }}
      >
        <div style={{ padding: '20px', borderBottom: '1px solid #F1F5F9', backgroundColor: '#F8FAFC' }}>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: '#1E293B' }}>Messages</h3>
        </div>

        <div style={{ overflowY: 'auto', height: 'calc(100% - 60px)' }}>
          {chatList.map((chat, i) => (
            <div
              key={chat.id}
              onClick={() => setSelectedChatIndex(i)}
              style={{
                padding: '20px',
                cursor: 'pointer',
                backgroundColor: selectedChatIndex === i ? '#F0FDFA' : 'transparent',
                borderBottom: '1px solid #F1F5F9',
                transition: '0.2s'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                <div style={{ fontWeight: '800', color: '#1E293B', fontSize: '15px' }}>{chat.name}</div>
                {chat.online && <div style={{ width: '8px', height: '8px', backgroundColor: '#10B981', borderRadius: '50%' }} />}
              </div>
              <div style={{ fontSize: '13px', color: '#64748B', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {chat.msg}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PRAWA KOLUMNA */}
      <div
        style={{
          flex: 1,
          backgroundColor: 'white',
          borderRadius: '25px',
          padding: '30px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
        }}
      >
        <div style={{ paddingBottom: '20px', borderBottom: '2px solid #F1F5F9', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '20px', fontWeight: '800', color: '#1E293B' }}>{currentChat.name}</h3>
              <p style={{ margin: '5px 0 0 0', fontSize: '13px', color: '#64748B' }}>{currentChat.online ? 'Online' : 'Offline'}</p>
            </div>
            <div
              style={{
                width: '48px',
                height: '48px',
                background: currentChat.isBuddy ? '#F0FDFA' : 'linear-gradient(135deg, #14B8A6 0%, #06B6D4 100%)',
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: currentChat.isBuddy ? '#14B8A6' : 'white',
                fontSize: currentChat.isBuddy ? '28px' : '20px',
                fontWeight: '800',
                border: currentChat.isBuddy ? '2px solid #14B8A6' : 'none'
              }}
            >
              {currentChat.isBuddy ? buddyEmoji : currentChat.name.charAt(0)}
            </div>
          </div>
        </div>

        <div style={{ flex: 1, backgroundColor: '#F8FAFC', borderRadius: '18px', padding: '20px', border: '1px solid #F1F5F9', overflowY: 'auto' }}>
          <div style={{ backgroundColor: 'white', padding: '15px 20px', borderRadius: '15px', marginBottom: '15px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', maxWidth: '80%' }}>
            <p style={{ margin: 0, fontSize: '12px', color: '#64748B', marginBottom: '6px' }}>
              <strong>{currentChat.name}:</strong>
            </p>
            <p style={{ margin: 0, color: '#1E293B', lineHeight: '1.5', fontSize: '15px' }}>{currentChat.msg}</p>
          </div>
        </div>

        <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
          <input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            style={{ flex: 1, padding: '14px 20px', borderRadius: '14px', border: '2px solid #E2E8F0', outline: 'none', fontSize: '15px' }}
          />
          <button
            onClick={handleSendMessage}
            disabled={!message.trim()}
            style={{
              background: message.trim() ? 'linear-gradient(135deg, #14B8A6 0%, #06B6D4 100%)' : '#E2E8F0',
              color: 'white',
              border: 'none',
              padding: '0 24px',
              borderRadius: '14px',
              cursor: message.trim() ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}