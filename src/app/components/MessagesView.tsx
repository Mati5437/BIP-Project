import { useState, type CSSProperties } from 'react';
import { Send } from 'lucide-react';
import { getMockUser } from '../mock/mockDatabase';

interface MessagesViewProps {
  ageGroup: string;
  username: string;
}

interface ChatItem {
  id: string;
  name: string;
  msg: string;
  online: boolean;
  isBuddy?: boolean;
}

const buddyIcons: Record<string, string> = {
  'blue-buddy': '💙',
  'star-buddy': '⭐',
  'robot-buddy': '🤖',
  default: '✨'
};

export function MessagesView({ ageGroup, username }: MessagesViewProps) {
  const [selectedChatIndex, setSelectedChatIndex] = useState(0);
  const [message, setMessage] = useState('');

  const userData = getMockUser(username, 'child');
  const activeBuddy = userData?.equippedBuddy ?? 'blue-buddy';
  const buddyEmoji = buddyIcons[activeBuddy] ?? buddyIcons.default;

  const getChatList = (): ChatItem[] => {
    const buddyChat: ChatItem = {
      id: 'buddy',
      name: `My Buddy ${buddyEmoji}`,
      msg: "Hello, I'm your buddy! I'm here to support your learning journey.",
      online: true,
      isBuddy: true
    };

    const otherChats: ChatItem[] =
      ageGroup === 'young'
        ? [
            {
              id: 'mentor-sarah',
              name: 'Mentor Sarah',
              msg: 'Great job during the kindness logo activity! 🎨',
              online: true
            },
            {
              id: 'emma',
              name: 'Emma',
              msg: 'Can you share your drawing idea?',
              online: false
            },
            {
              id: 'support',
              name: 'CareQuest Support',
              msg: 'You earned new Stars! ⭐',
              online: true
            }
          ]
        : [
            {
              id: 'mentor-sarah',
              name: 'Mentor Sarah',
              msg: 'Excellent work during today’s session!',
              online: true
            },
            {
              id: 'alex-thompson',
              name: 'Alex Thompson',
              msg: 'Can you share the resources from the activity?',
              online: false
            },
            {
              id: 'support',
              name: 'CareQuest Support',
              msg: 'Your progress and Stars were updated.',
              online: true
            }
          ];

    return [buddyChat, ...otherChats];
  };

  const chatList = getChatList();
  const currentChat = chatList[selectedChatIndex] ?? chatList[0];

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessage('');
    }
  };

  return (
    <div style={pageStyle}>
      <div style={chatListCardStyle}>
        <div style={chatListHeaderStyle}>
          <h3 style={sectionTitleStyle}>
            Messages
          </h3>

          <p style={sectionSubtitleStyle}>
            Stay connected with mentors and your buddy.
          </p>
        </div>

        <div style={chatListScrollStyle}>
          {chatList.map((chat, index) => {
            const isSelected = selectedChatIndex === index;

            return (
              <button
                key={chat.id}
                type="button"
                onClick={() => setSelectedChatIndex(index)}
                style={{
                  ...chatItemStyle,
                  background: isSelected
                    ? 'linear-gradient(135deg, rgba(239,246,255,0.96) 0%, rgba(236,254,255,0.88) 100%)'
                    : 'transparent',
                  borderColor: isSelected ? '#BFDFFF' : '#F1F5F9'
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.background = '#F8FAFC';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                <div style={chatAvatarStyle(chat.isBuddy)}>
                  {chat.isBuddy ? buddyEmoji : chat.name.charAt(0)}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={chatNameRowStyle}>
                    <span style={chatNameStyle}>
                      {chat.name}
                    </span>

                    {chat.online && <span style={onlineDotStyle} />}
                  </div>

                  <p style={chatPreviewStyle}>
                    {chat.msg}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div style={conversationCardStyle}>
        <div style={conversationHeaderStyle}>
          <div>
            <h3 style={conversationTitleStyle}>
              {currentChat.name}
            </h3>

            <p style={conversationStatusStyle}>
              {currentChat.online ? 'Online' : 'Offline'}
            </p>
          </div>

          <div style={conversationAvatarStyle(currentChat.isBuddy)}>
            {currentChat.isBuddy ? buddyEmoji : currentChat.name.charAt(0)}
          </div>
        </div>

        <div style={messagesAreaStyle}>
          <div style={messageBubbleStyle}>
            <p style={messageSenderStyle}>
              <strong>{currentChat.name}:</strong>
            </p>

            <p style={messageTextStyle}>
              {currentChat.msg}
            </p>
          </div>
        </div>

        <div style={inputRowStyle}>
          <input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            style={messageInputStyle}
            onFocus={(e) => {
              e.target.style.borderColor = '#3BE0F6';
              e.target.style.boxShadow = '0 0 0 4px rgba(59, 224, 246, 0.14)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#DDEAF5';
              e.target.style.boxShadow = 'none';
            }}
          />

          <button
            type="button"
            onClick={handleSendMessage}
            disabled={!message.trim()}
            style={{
              ...sendButtonStyle,
              background: message.trim()
                ? 'linear-gradient(135deg, #3B82F6 0%, #3BE0F6 100%)'
                : '#D8E3EE',
              cursor: message.trim() ? 'pointer' : 'not-allowed',
              boxShadow: message.trim()
                ? '0 12px 22px rgba(59, 130, 246, 0.24)'
                : 'none'
            }}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

const pageStyle: CSSProperties = {
  display: 'flex',
  gap: '20px',
  height: 'calc(100vh - 150px)',
  animation: 'fadeIn 0.5s ease',
  fontFamily: '"Plus Jakarta Sans", sans-serif'
};

const chatListCardStyle: CSSProperties = {
  width: '320px',
  background:
    'linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(247,252,255,0.9) 100%)',
  borderRadius: '26px',
  overflow: 'hidden',
  boxShadow: '0 14px 34px rgba(16, 42, 86, 0.08)',
  border: '1px solid rgba(221, 234, 245, 0.82)',
  backdropFilter: 'blur(22px)',
  WebkitBackdropFilter: 'blur(22px)'
};

const chatListHeaderStyle: CSSProperties = {
  padding: '20px',
  borderBottom: '1px solid #EAF2F8',
  background:
    'linear-gradient(135deg, rgba(239,246,255,0.92) 0%, rgba(236,254,255,0.82) 100%)'
};

const sectionTitleStyle: CSSProperties = {
  margin: 0,
  fontSize: '18px',
  fontWeight: '900',
  color: '#1E293B'
};

const sectionSubtitleStyle: CSSProperties = {
  margin: '5px 0 0',
  fontSize: '13px',
  color: '#64748B',
  lineHeight: 1.4
};

const chatListScrollStyle: CSSProperties = {
  overflowY: 'auto',
  height: 'calc(100% - 82px)',
  padding: '8px'
};

const chatItemStyle: CSSProperties = {
  width: '100%',
  border: '1px solid',
  borderRadius: '18px',
  padding: '14px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  transition: 'all 0.22s ease',
  textAlign: 'left',
  fontFamily: 'inherit'
};

const chatAvatarStyle = (isBuddy?: boolean): CSSProperties => ({
  width: '44px',
  height: '44px',
  borderRadius: '15px',
  background: isBuddy
    ? 'linear-gradient(135deg, rgba(240,255,250,0.98) 0%, rgba(236,254,255,0.92) 100%)'
    : 'linear-gradient(135deg, #3B82F6 0%, #3BE0F6 100%)',
  color: isBuddy ? '#102A56' : 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: isBuddy ? '25px' : '18px',
  fontWeight: '900',
  border: isBuddy ? '1px solid #B7F2DE' : 'none',
  flexShrink: 0,
  boxShadow: '0 8px 18px rgba(16, 42, 86, 0.08)'
});

const chatNameRowStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '8px',
  marginBottom: '5px'
};

const chatNameStyle: CSSProperties = {
  fontWeight: '900',
  color: '#1E293B',
  fontSize: '14px',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
};

const onlineDotStyle: CSSProperties = {
  width: '8px',
  height: '8px',
  background: '#10B981',
  borderRadius: '50%',
  flexShrink: 0
};

const chatPreviewStyle: CSSProperties = {
  margin: 0,
  fontSize: '13px',
  color: '#64748B',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
};

const conversationCardStyle: CSSProperties = {
  flex: 1,
  background:
    'linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(247,252,255,0.9) 100%)',
  borderRadius: '26px',
  padding: '28px',
  display: 'flex',
  flexDirection: 'column',
  boxShadow: '0 14px 34px rgba(16, 42, 86, 0.08)',
  border: '1px solid rgba(221, 234, 245, 0.82)',
  backdropFilter: 'blur(22px)',
  WebkitBackdropFilter: 'blur(22px)'
};

const conversationHeaderStyle: CSSProperties = {
  paddingBottom: '20px',
  borderBottom: '1px solid #EAF2F8',
  marginBottom: '20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
};

const conversationTitleStyle: CSSProperties = {
  margin: 0,
  fontSize: '20px',
  fontWeight: '900',
  color: '#1E293B'
};

const conversationStatusStyle: CSSProperties = {
  margin: '5px 0 0',
  fontSize: '13px',
  color: '#64748B'
};

const conversationAvatarStyle = (isBuddy?: boolean): CSSProperties => ({
  width: '52px',
  height: '52px',
  background: isBuddy
    ? 'linear-gradient(135deg, rgba(240,255,250,0.98) 0%, rgba(236,254,255,0.92) 100%)'
    : 'linear-gradient(135deg, #3B82F6 0%, #3BE0F6 100%)',
  borderRadius: '16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: isBuddy ? '#102A56' : 'white',
  fontSize: isBuddy ? '29px' : '20px',
  fontWeight: '900',
  border: isBuddy ? '1px solid #B7F2DE' : 'none',
  boxShadow: '0 10px 22px rgba(16, 42, 86, 0.10)'
});

const messagesAreaStyle: CSSProperties = {
  flex: 1,
  background:
    'linear-gradient(135deg, rgba(248,250,252,0.95) 0%, rgba(239,246,255,0.72) 100%)',
  borderRadius: '20px',
  padding: '20px',
  border: '1px solid #EAF2F8',
  overflowY: 'auto'
};

const messageBubbleStyle: CSSProperties = {
  background: 'white',
  padding: '15px 20px',
  borderRadius: '16px',
  marginBottom: '15px',
  boxShadow: '0 8px 18px rgba(16, 42, 86, 0.06)',
  maxWidth: '80%',
  border: '1px solid #EEF4FA'
};

const messageSenderStyle: CSSProperties = {
  margin: '0 0 6px',
  fontSize: '12px',
  color: '#64748B'
};

const messageTextStyle: CSSProperties = {
  margin: 0,
  color: '#1E293B',
  lineHeight: '1.5',
  fontSize: '15px'
};

const inputRowStyle: CSSProperties = {
  marginTop: '20px',
  display: 'flex',
  gap: '10px'
};

const messageInputStyle: CSSProperties = {
  flex: 1,
  padding: '14px 20px',
  borderRadius: '14px',
  border: '2px solid #DDEAF5',
  outline: 'none',
  fontSize: '15px',
  transition: 'all 0.25s ease',
  fontFamily: 'inherit',
  color: '#1E293B',
  background: 'rgba(255,255,255,0.92)'
};

const sendButtonStyle: CSSProperties = {
  color: 'white',
  border: 'none',
  padding: '0 24px',
  borderRadius: '14px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.25s ease'
};