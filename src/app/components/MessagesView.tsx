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
        { id: 0, name: 'Mentor Sarah', msg: 'Great job during the kindness logo activity! 🎨', online: true },
        { id: 1, name: 'Emma', msg: 'Can you share your drawing idea?', online: false },
        { id: 2, name: 'CareQuest Support', msg: 'You earned new Care Coins! ⭐', online: true }
      ];
    }

    return [
      { id: 0, name: 'Mentor Sarah', msg: 'Excellent work on the Mini Startup Challenge!', online: true },
      { id: 1, name: 'Alex Thompson', msg: 'Can you share the session resources?', online: false },
      { id: 2, name: 'CareQuest Support', msg: 'Your progress has been updated.', online: true }
    ];
  };

  const chatList = getChatList();
  const currentChat = chatList[selectedChat] || chatList[0];

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
      <div
        style={{
          width: '320px',
          backgroundColor: 'white',
          borderRadius: '25px',
          overflow: 'hidden',
          boxShadow: '0 4px 12px rgba(0,0,0,0.06)'
        }}
      >
        <div
          style={{
            padding: '20px',
            borderBottom: '1px solid #F1F5F9',
            backgroundColor: '#F8FAFC'
          }}
        >
          <h3
            style={{
              margin: 0,
              fontSize: '18px',
              fontWeight: '800',
              color: '#1E293B'
            }}
          >
            Messages
          </h3>
        </div>

        {chatList.map((chat, i) => (
          <div
            key={chat.id}
            onClick={() => setSelectedChat(i)}
            style={{
              padding: '20px',
              cursor: 'pointer',
              backgroundColor: selectedChat === i ? '#F0FDFA' : 'transparent',
              borderBottom: '1px solid #F1F5F9',
              transition: '0.2s'
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '5px'
              }}
            >
              <div
                style={{
                  fontWeight: '800',
                  color: '#1E293B',
                  fontSize: '15px'
                }}
              >
                {chat.name}
              </div>

              {chat.online && (
                <div
                  style={{
                    width: '8px',
                    height: '8px',
                    backgroundColor: '#10B981',
                    borderRadius: '50%'
                  }}
                />
              )}
            </div>

            <div
              style={{
                fontSize: '13px',
                color: '#64748B',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              {chat.msg}
            </div>
          </div>
        ))}
      </div>

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
        <div
          style={{
            paddingBottom: '20px',
            borderBottom: '2px solid #F1F5F9',
            marginBottom: '20px'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <h3
                style={{
                  margin: 0,
                  fontSize: '20px',
                  fontWeight: '800',
                  color: '#1E293B'
                }}
              >
                {currentChat.name}
              </h3>

              <p
                style={{
                  margin: '5px 0 0 0',
                  fontSize: '13px',
                  color: '#64748B'
                }}
              >
                {currentChat.online ? 'Online' : 'Offline'}
              </p>
            </div>

            <div
              style={{
                width: '48px',
                height: '48px',
                background: 'linear-gradient(135deg, #14B8A6 0%, #06B6D4 100%)',
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '20px',
                fontWeight: '800'
              }}
            >
              {currentChat.name.charAt(0)}
            </div>
          </div>
        </div>

        <div
          style={{
            flex: 1,
            backgroundColor: '#F8FAFC',
            borderRadius: '18px',
            padding: '20px',
            border: '1px solid #F1F5F9',
            overflowY: 'auto'
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: '15px 20px',
              borderRadius: '15px',
              marginBottom: '15px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
              maxWidth: '80%'
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: '12px',
                color: '#64748B',
                marginBottom: '6px'
              }}
            >
              <strong>{currentChat.name}:</strong>
            </p>

            <p
              style={{
                margin: 0,
                color: '#1E293B',
                lineHeight: '1.5',
                fontSize: '15px'
              }}
            >
              {currentChat.msg}
            </p>
          </div>
        </div>

        <div
          style={{
            marginTop: '20px',
            display: 'flex',
            gap: '10px'
          }}
        >
          <input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage();
              }
            }}
            style={{
              flex: 1,
              padding: '14px 20px',
              borderRadius: '14px',
              border: '2px solid #E2E8F0',
              outline: 'none',
              fontSize: '15px',
              transition: 'border-color 0.3s'
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = '#14B8A6';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = '#E2E8F0';
            }}
          />

          <button
            onClick={handleSendMessage}
            disabled={!message.trim()}
            style={{
              background: message.trim()
                ? 'linear-gradient(135deg, #14B8A6 0%, #06B6D4 100%)'
                : '#E2E8F0',
              color: 'white',
              border: 'none',
              padding: '0 24px',
              borderRadius: '14px',
              cursor: message.trim() ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s'
            }}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}