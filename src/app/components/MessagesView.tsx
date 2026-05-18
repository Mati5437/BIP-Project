import { useState } from 'react';
import { Send } from 'lucide-react';

interface MessagesViewProps {
  ageGroup: string;
}

export function MessagesView({ ageGroup }: MessagesViewProps) {
  const [selectedChat, setSelectedChat] = useState(0);
  const [message, setMessage] = useState('');

  const getChatList = () => {
    if (ageGroup === 'young') {
      return [
        { id: 0, name: 'Mentor Kasia', msg: 'Świetna robota z logo dzisiaj! 🎨', online: true },
        { id: 1, name: 'Bartek', msg: 'Masz link do gry?', online: false },
        { id: 2, name: 'Zespół Pomocy', msg: 'Monety zaktualizowane! ⭐', online: true }
      ];
    } else if (ageGroup === 'teen') {
      return [
        { id: 0, name: 'Mentor Priya', msg: 'Świetna robota z projektowaniem logo dzisiaj!', online: true },
        { id: 1, name: 'Aarav Mehta', msg: 'Masz link do tej lekcji?', online: false },
        { id: 2, name: 'Zespół Wsparcia', msg: 'Twoje monety zostały zaktualizowane.', online: true }
      ];
    } else {
      return [
        { id: 0, name: 'Mentor Sarah', msg: 'Excellent work on the brand identity project!', online: true },
        { id: 1, name: 'Alex Thompson', msg: 'Can you share the workshop resources?', online: false },
        { id: 2, name: 'Support Team', msg: 'Your portfolio has been updated.', online: true }
      ];
    }
  };

  const chatList = getChatList();
  const currentChat = chatList[selectedChat] || chatList[0];

  const handleSendMessage = () => {
    if (message.trim()) {
      // Tutaj można dodać logikę wysyłania wiadomości
      setMessage('');
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      gap: '20px', 
      height: 'calc(100vh - 150px)', 
      animation: 'fadeIn 0.5s ease' 
    }}>
      {/* LISTA CZATÓW */}
      <div style={{ 
        width: '320px', 
        backgroundColor: 'white', 
        borderRadius: '25px', 
        overflow: 'hidden', 
        boxShadow: '0 4px 6px rgba(0,0,0,0.05)' 
      }}>
        <div style={{
          padding: '20px',
          borderBottom: '1px solid #F1F5F9',
          backgroundColor: '#F8FAFC'
        }}>
          <h3 style={{ 
            margin: 0, 
            fontSize: '18px', 
            fontWeight: 'bold',
            color: '#1E293B'
          }}>
            {ageGroup === 'advanced' ? 'Messages' : 'Wiadomości'}
          </h3>
        </div>
        {chatList.map((chat, i) => (
          <div 
            key={chat.id} 
            onClick={() => setSelectedChat(i)}
            style={{ 
              padding: '20px', 
              cursor: 'pointer', 
              backgroundColor: selectedChat === i ? '#F0F7FF' : 'transparent',
              borderBottom: '1px solid #F1F5F9',
              transition: '0.2s',
              position: 'relative'
            }}
            onMouseEnter={(e) => {
              if (selectedChat !== i) {
                e.currentTarget.style.backgroundColor = '#F8FAFC';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedChat !== i) {
                e.currentTarget.style.backgroundColor = 'transparent';
              }
            }}
          >
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '5px'
            }}>
              <div style={{ 
                fontWeight: 'bold', 
                color: '#1E293B',
                fontSize: '15px'
              }}>
                {chat.name}
              </div>
              {chat.online && (
                <div style={{
                  width: '8px',
                  height: '8px',
                  backgroundColor: '#10B981',
                  borderRadius: '50%'
                }}></div>
              )}
            </div>
            <div style={{ 
              fontSize: '13px', 
              color: '#64748B', 
              whiteSpace: 'nowrap', 
              overflow: 'hidden', 
              textOverflow: 'ellipsis' 
            }}>
              {chat.msg}
            </div>
          </div>
        ))}
      </div>

      {/* OKNO ROZMOWY */}
      <div style={{ 
        flex: 1, 
        backgroundColor: 'white', 
        borderRadius: '25px', 
        padding: '30px', 
        display: 'flex', 
        flexDirection: 'column', 
        boxShadow: '0 4px 15px rgba(0,0,0,0.05)' 
      }}>
        {/* Nagłówek czatu */}
        <div style={{
          paddingBottom: '20px',
          borderBottom: '2px solid #F1F5F9',
          marginBottom: '20px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <h3 style={{ 
                margin: 0, 
                fontSize: '20px', 
                fontWeight: 'bold',
                color: '#1E293B'
              }}>
                {currentChat.name}
              </h3>
              <p style={{
                margin: '5px 0 0 0',
                fontSize: '13px',
                color: '#64748B'
              }}>
                {currentChat.online 
                  ? (ageGroup === 'advanced' ? 'Online' : 'Aktywny') 
                  : (ageGroup === 'advanced' ? 'Offline' : 'Nieaktywny')}
              </p>
            </div>
            <div style={{
              width: '48px',
              height: '48px',
              backgroundColor: '#3B82F6',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '20px',
              fontWeight: 'bold'
            }}>
              {currentChat.name.charAt(0)}
            </div>
          </div>
        </div>

        {/* Obszar wiadomości */}
        <div style={{ 
          flex: 1, 
          backgroundColor: '#F8FAFC', 
          borderRadius: '15px', 
          padding: '20px', 
          border: '1px solid #F1F5F9',
          overflowY: 'auto'
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '15px 20px',
            borderRadius: '15px',
            marginBottom: '15px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
            maxWidth: '80%'
          }}>
            <p style={{ 
              margin: 0,
              fontSize: '12px',
              color: '#64748B',
              marginBottom: '5px'
            }}>
              <b>{currentChat.name}:</b>
            </p>
            <p style={{ 
              marginTop: '5px', 
              color: '#1E293B',
              margin: 0,
              lineHeight: '1.5'
            }}>
              {currentChat.msg}
            </p>
          </div>
        </div>
        
        {/* Input wiadomości */}
        <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
          <input 
            type="text" 
            placeholder={ageGroup === 'advanced' ? 'Type a message...' : 'Napisz wiadomość...'} 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage();
              }
            }}
            style={{ 
              flex: 1, 
              padding: '14px 20px', 
              borderRadius: '12px', 
              border: '2px solid #E2E8F0', 
              outline: 'none',
              fontSize: '15px',
              transition: 'border-color 0.3s'
            }}
            onFocus={(e) => e.target.style.borderColor = '#3B82F6'}
            onBlur={(e) => e.target.style.borderColor = '#E2E8F0'}
          />
          <button 
            onClick={handleSendMessage}
            disabled={!message.trim()}
            style={{ 
              backgroundColor: message.trim() ? '#3B82F6' : '#E2E8F0', 
              color: 'white', 
              border: 'none', 
              padding: '0 25px', 
              borderRadius: '12px', 
              cursor: message.trim() ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
              if (message.trim()) {
                e.currentTarget.style.backgroundColor = '#2563EB';
              }
            }}
            onMouseLeave={(e) => {
              if (message.trim()) {
                e.currentTarget.style.backgroundColor = '#3B82F6';
              }
            }}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
