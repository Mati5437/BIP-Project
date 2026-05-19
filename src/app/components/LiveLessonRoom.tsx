import { useState, type ReactNode } from 'react';
import {
  X,
  Mic,
  Camera,
  Monitor,
  Send,
  User,
  MousePointer2,
  PenLine,
  Square,
  Type,
  Image as ImageIcon,
  Undo2,
  Redo2,
  Maximize2,
  Lightbulb,
  Users,
  Hand,
  MoreHorizontal,
  Star,
  Shuffle,
  CheckCircle2
} from 'lucide-react';

interface LiveLessonRoomProps {
  onBack: () => void;
  ageGroup: string;
}

interface ParticipantProps {
  name: string;
  active?: boolean;
  muted?: boolean;
}

interface GroupData {
  name: string;
  members: string[];
  color: string;
  task: string;
}

interface ToolButtonProps {
  icon: ReactNode;
  active: boolean;
  onClick: () => void;
}

function ToolButton({ icon, active, onClick }: ToolButtonProps) {
  return (
    <button
      onClick={onClick}
      style={{
        width: '38px',
        height: '38px',
        borderRadius: '12px',
        border: 'none',
        background: active ? '#DBEAFE' : '#F8FAFC',
        color: active ? '#2563EB' : '#475569',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.05)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
      }}
    >
      {icon}
    </button>
  );
}

function Participant({ name, active, muted }: ParticipantProps) {
  return (
    <div
      className="participant-row"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '10px',
        borderRadius: '14px',
        background: active ? '#F0FDFA' : '#F8FAFC',
        border: active ? '2px solid #99F6E4' : '1px solid #E2E8F0'
      }}
    >
      <div
        style={{
          width: '38px',
          height: '38px',
          background: active
            ? 'linear-gradient(135deg, #14B8A6 0%, #06B6D4 100%)'
            : '#E2E8F0',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: active ? 'white' : '#64748B',
          flexShrink: 0
        }}
      >
        <User size={18} />
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          style={{
            margin: 0,
            fontSize: '14px',
            fontWeight: '700',
            color: '#1E293B',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {name}
        </p>
        <p
          style={{
            margin: '2px 0 0 0',
            fontSize: '12px',
            color: active ? '#14B8A6' : '#94A3B8'
          }}
        >
          {active ? 'Active now' : 'In session'}
        </p>
      </div>

      <div
        style={{
          width: '26px',
          height: '26px',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: muted ? '#FEE2E2' : '#DCFCE7',
          color: muted ? '#EF4444' : '#10B981',
          flexShrink: 0
        }}
      >
        <Mic size={14} />
      </div>
    </div>
  );
}

export function LiveLessonRoom({ onBack, ageGroup }: LiveLessonRoomProps) {
  const [message, setMessage] = useState('');
  const [groupsVisible, setGroupsVisible] = useState(false);
  const [splitAnimationKey, setSplitAnimationKey] = useState(0);
  const [activeGroupIndex, setActiveGroupIndex] = useState(0);
  const [activeTool, setActiveTool] = useState('select');

  const isYoung = ageGroup === 'young';

  const sessionTitle = isYoung
    ? 'Design a Logo for a Kindness Project'
    : 'Mini Startup Challenge: Invent a Helpful Product';

  const challengeTitle = isYoung
    ? 'Kindness Logo Challenge'
    : 'Recovery Product Challenge';

  const challengeSteps = isYoung
    ? [
        'Think about what makes people feel cared for.',
        'Draw a simple symbol or friendly logo.',
        'Use colors, shapes and one short word.',
        'Share what your logo means.'
      ]
    : [
        'Invent a product that helps children feel better during recovery.',
        'Define who the product helps and why.',
        'Sketch the idea on the collaborative board.',
        'Prepare a short group pitch.'
      ];

  const hostName = isYoung ? 'Mentor Sarah' : 'Alex Rivera';

  const participants = isYoung
    ? ['You', 'Emma', 'Liam', 'Olivia', 'Noah', 'Mia']
    : ['You', 'Alex', 'Jordan', 'Maya', 'Sam', 'Taylor', 'Chris', 'Riley'];

  const groups: GroupData[] = isYoung
    ? [
        {
          name: 'Team Rainbow',
          members: ['You', 'Emma', 'Liam'],
          color: '#FF6B9D',
          task: 'Create the main symbol'
        },
        {
          name: 'Team Stars',
          members: ['Olivia', 'Noah', 'Mia'],
          color: '#F59E0B',
          task: 'Add colors and friendly words'
        }
      ]
    : [
        {
          name: 'Team Alpha',
          members: ['You', 'Alex'],
          color: '#14B8A6',
          task: 'Define the product idea'
        },
        {
          name: 'Team Beta',
          members: ['Jordan', 'Maya'],
          color: '#3B82F6',
          task: 'Describe the user problem'
        },
        {
          name: 'Team Gamma',
          members: ['Sam', 'Taylor'],
          color: '#8B5CF6',
          task: 'Sketch the solution'
        },
        {
          name: 'Team Delta',
          members: ['Chris', 'Riley'],
          color: '#F59E0B',
          task: 'Prepare the pitch'
        }
      ];

  const activeGroup = groups[activeGroupIndex] ?? groups[0];

  const chatMessages = isYoung
    ? [
        { name: 'Emma', text: 'I love the heart idea! 💚' },
        { name: 'Liam', text: 'Can we add a rainbow?' },
        { name: hostName, text: 'Great teamwork! Try to keep it simple ✨' }
      ]
    : [
        { name: 'Maya', text: 'What if the product reminds kids to rest?' },
        { name: 'Sam', text: 'We can add a comfort tracker.' },
        { name: hostName, text: 'Nice direction. Think about one clear user need.' }
      ];

  const tools = [
    { id: 'select', icon: <MousePointer2 size={18} /> },
    { id: 'pen', icon: <PenLine size={18} /> },
    { id: 'shape', icon: <Square size={18} /> },
    { id: 'text', icon: <Type size={18} /> },
    { id: 'image', icon: <ImageIcon size={18} /> },
    { id: 'undo', icon: <Undo2 size={18} /> },
    { id: 'redo', icon: <Redo2 size={18} /> }
  ];

  const handleSplitGroups = () => {
    setGroupsVisible(true);
    setActiveGroupIndex(0);
    setSplitAnimationKey((prev) => prev + 1);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessage('');
    }
  };

  return (
    <div
      className="live-session-scroll"
      style={{
        height: '100%',
        minHeight: '100vh',
        overflowY: 'auto',
        overflowX: 'hidden',
        background: '#F8FAFC',
        fontFamily: '"Plus Jakarta Sans", sans-serif'
      }}
    >
      {/* Top Bar */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 20,
          minHeight: '72px',
          background: 'linear-gradient(135deg, #0A2E6E 0%, #003B73 100%)',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 24px',
          boxShadow: '0 4px 18px rgba(15, 23, 42, 0.18)'
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            minWidth: 0
          }}
        >
          <button
            onClick={onBack}
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '14px',
              border: 'none',
              background: 'rgba(255,255,255,0.12)',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            <X size={21} />
          </button>

          <Star size={21} style={{ flexShrink: 0 }} />

          <div style={{ minWidth: 0 }}>
            <h2
              style={{
                margin: 0,
                fontSize: '20px',
                fontWeight: '800',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              {sessionTitle}
            </h2>
            <p
              style={{
                margin: '4px 0 0 0',
                fontSize: '13px',
                opacity: 0.78
              }}
            >
              Live collaborative lesson
            </p>
          </div>

          <span
            className="live-badge"
            style={{
              background: '#EF4444',
              padding: '7px 13px',
              borderRadius: '12px',
              fontSize: '12px',
              fontWeight: '800',
              flexShrink: 0
            }}
          >
            LIVE
          </span>

          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '7px',
              fontSize: '14px',
              fontWeight: '700',
              flexShrink: 0
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#EF4444'
              }}
            />
            00:24:36
          </span>
        </div>

        <button
          onClick={onBack}
          style={{
            background: 'white',
            color: '#EF4444',
            border: 'none',
            borderRadius: '16px',
            padding: '13px 24px',
            fontWeight: '800',
            cursor: 'pointer',
            fontSize: '15px',
            flexShrink: 0
          }}
        >
          End Session
        </button>
      </div>

      <main
        style={{
          maxWidth: '1680px',
          margin: '0 auto',
          padding: '20px'
        }}
      >
        {/* Main Grid */}
        <div
          className="live-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '320px minmax(560px, 1fr) 300px',
            gap: '20px',
            alignItems: 'start'
          }}
        >
          {/* Left Column */}
          <section
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '18px'
            }}
          >
            {/* Host */}
            <div className="live-card">
              <h3 className="live-card-title">Host</h3>

              <div
                style={{
                  height: '210px',
                  borderRadius: '20px',
                  background: 'linear-gradient(135deg, #DBEAFE 0%, #F0FDFA 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div
                  className="soft-float"
                  style={{
                    width: '96px',
                    height: '96px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #14B8A6 0%, #3B82F6 100%)',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '42px',
                    fontWeight: '800'
                  }}
                >
                  👩‍🏫
                </div>

                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    padding: '14px 16px',
                    background: 'linear-gradient(180deg, transparent 0%, rgba(15,23,42,0.72) 100%)',
                    color: 'white',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <span style={{ fontWeight: '800', fontSize: '15px' }}>
                    {hostName}
                  </span>
                  <Mic size={17} />
                </div>
              </div>
            </div>

            {/* Participants */}
            <div className="live-card">
              <div className="card-header-row">
                <h3 className="live-card-title" style={{ margin: 0 }}>
                  Participants ({participants.length + 1})
                </h3>

                <button className="link-button">
                  View all
                </button>
              </div>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  maxHeight: '310px',
                  overflowY: 'auto',
                  paddingRight: '4px'
                }}
              >
                <Participant name={hostName} active />
                {participants.map((name, index) => (
                  <Participant
                    key={name}
                    name={name}
                    active={name === 'You'}
                    muted={index % 2 === 0}
                  />
                ))}
              </div>
            </div>

            {/* Breakout Groups */}
            <div className="live-card">
              <div className="card-header-row">
                <h3 className="live-card-title" style={{ margin: 0 }}>
                  Breakout Groups
                </h3>

                <button
                  onClick={handleSplitGroups}
                  className="link-button"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Shuffle size={16} />
                  Split
                </button>
              </div>

              {!groupsVisible ? (
                <div
                  className="empty-groups-card"
                  style={{
                    background: '#F8FAFC',
                    border: '1px dashed #CBD5E1',
                    borderRadius: '18px',
                    padding: '22px',
                    textAlign: 'center'
                  }}
                >
                  <div style={{ fontSize: '42px', marginBottom: '10px' }}>👥</div>
                  <p
                    style={{
                      margin: '0 0 14px 0',
                      color: '#64748B',
                      fontSize: '14px',
                      lineHeight: 1.5
                    }}
                  >
                    Participants are waiting for the host to create small teams.
                  </p>

                  <button
                    onClick={handleSplitGroups}
                    style={{
                      border: 'none',
                      borderRadius: '14px',
                      background: 'linear-gradient(135deg, #14B8A6 0%, #06B6D4 100%)',
                      color: 'white',
                      padding: '12px 18px',
                      cursor: 'pointer',
                      fontWeight: '800'
                    }}
                  >
                    Split into groups
                  </button>
                </div>
              ) : (
                <div
                  key={splitAnimationKey}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                  }}
                >
                  {groups.map((group, index) => (
                    <button
                      key={group.name}
                      onClick={() => setActiveGroupIndex(index)}
                      className="group-card"
                      style={{
                        animationDelay: `${index * 90}ms`,
                        width: '100%',
                        textAlign: 'left',
                        padding: '14px',
                        borderRadius: '18px',
                        background: activeGroupIndex === index ? '#F0FDFA' : '#F8FAFC',
                        border:
                          activeGroupIndex === index
                            ? `2px solid ${group.color}`
                            : '1px solid #E2E8F0',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          marginBottom: '7px'
                        }}
                      >
                        <span
                          style={{
                            width: '11px',
                            height: '11px',
                            borderRadius: '50%',
                            background: group.color,
                            flexShrink: 0
                          }}
                        />

                        <strong
                          style={{
                            fontSize: '14px',
                            color: '#1E293B'
                          }}
                        >
                          {group.name}
                        </strong>

                        {group.members.includes('You') && (
                          <span
                            style={{
                              marginLeft: 'auto',
                              background: '#DCFCE7',
                              color: '#15803D',
                              borderRadius: '999px',
                              padding: '4px 9px',
                              fontSize: '11px',
                              fontWeight: '800'
                            }}
                          >
                            You
                          </span>
                        )}
                      </div>

                      <p
                        style={{
                          margin: '0 0 6px 0',
                          fontSize: '12px',
                          color: '#64748B'
                        }}
                      >
                        {group.members.join(', ')}
                      </p>

                      <p
                        style={{
                          margin: 0,
                          fontSize: '12px',
                          color: '#0F766E',
                          fontWeight: '700'
                        }}
                      >
                        Task: {group.task}
                      </p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Center Column */}
          <section
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px'
            }}
          >
            {/* Challenge Brief */}
            <div className="live-card">
              <div className="card-header-row">
                <h3 className="live-card-title" style={{ margin: 0 }}>
                  Challenge Brief
                </h3>

                <Maximize2 size={18} color="#64748B" />
              </div>

              <div
                className="brief-grid"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(260px, 1fr) 230px',
                  gap: '18px'
                }}
              >
                <div
                  style={{
                    background: 'linear-gradient(135deg, #FFF7ED 0%, #FEF3C7 100%)',
                    borderRadius: '20px',
                    padding: '22px',
                    border: '1px solid #FED7AA'
                  }}
                >
                  <h4
                    style={{
                      margin: '0 0 14px 0',
                      fontSize: '16px',
                      color: '#92400E',
                      fontWeight: '800'
                    }}
                  >
                    {challengeTitle}
                  </h4>

                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '11px'
                    }}
                  >
                    {challengeSteps.map((step) => (
                      <div
                        key={step}
                        style={{
                          display: 'flex',
                          gap: '10px',
                          alignItems: 'flex-start',
                          color: '#475569',
                          fontSize: '14px',
                          lineHeight: 1.45
                        }}
                      >
                        <Star
                          size={17}
                          fill="#F59E0B"
                          color="#F59E0B"
                          style={{
                            flexShrink: 0,
                            marginTop: 2
                          }}
                        />
                        {step}
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  style={{
                    background: 'linear-gradient(135deg, #F0FDFA 0%, #CCFBF1 100%)',
                    borderRadius: '20px',
                    padding: '22px',
                    border: '1px solid #99F6E4',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                  }}
                >
                  <Lightbulb size={32} color="#14B8A6" />

                  <h4
                    style={{
                      margin: '14px 0 8px 0',
                      fontSize: '16px',
                      color: '#0F766E',
                      fontWeight: '800'
                    }}
                  >
                    Host Tip
                  </h4>

                  <p
                    style={{
                      margin: 0,
                      color: '#475569',
                      fontSize: '14px',
                      lineHeight: 1.55
                    }}
                  >
                    {isYoung
                      ? 'Use one simple idea, friendly colors and a shape that makes people smile.'
                      : 'Focus on one real problem, one clear solution and one strong visual idea.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Whiteboard */}
            <div className="live-card">
              <div className="card-header-row">
                <div>
                  <h3 className="live-card-title" style={{ margin: 0 }}>
                    Collaborative Whiteboard
                  </h3>
                  <p
                    style={{
                      margin: '5px 0 0 0',
                      fontSize: '13px',
                      color: '#64748B'
                    }}
                  >
                    Shared workspace for sketches, notes and group ideas
                  </p>
                </div>

                <Maximize2 size={18} color="#64748B" />
              </div>

              {groupsVisible && (
                <div
                  className="active-group-banner"
                  style={{
                    marginBottom: '14px',
                    background: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                    borderRadius: '18px',
                    padding: '12px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                >
                  <span
                    style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      background: activeGroup.color,
                      flexShrink: 0
                    }}
                  />

                  <div style={{ flex: 1 }}>
                    <p
                      style={{
                        margin: 0,
                        fontSize: '14px',
                        fontWeight: '800',
                        color: '#1E293B'
                      }}
                    >
                      Working now: {activeGroup.name}
                    </p>
                    <p
                      style={{
                        margin: '3px 0 0 0',
                        fontSize: '12px',
                        color: '#64748B'
                      }}
                    >
                      {activeGroup.task}
                    </p>
                  </div>

                  <CheckCircle2 size={20} color="#10B981" />
                </div>
              )}

              <div
                style={{
                  position: 'relative',
                  minHeight: '540px',
                  borderRadius: '22px',
                  overflow: 'hidden',
                  border: '2px solid #E2E8F0',
                  backgroundColor: '#FFFFFF',
                  backgroundImage: 'radial-gradient(#CBD5E1 1px, transparent 1px)',
                  backgroundSize: '22px 22px'
                }}
              >
                {/* Toolbar */}
                <div
                  style={{
                    position: 'absolute',
                    top: '18px',
                    left: '18px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    background: 'white',
                    borderRadius: '18px',
                    padding: '9px',
                    boxShadow: '0 8px 24px rgba(15, 23, 42, 0.12)',
                    border: '1px solid #E2E8F0',
                    zIndex: 2
                  }}
                >
                  {tools.map((tool) => (
                    <ToolButton
                      key={tool.id}
                      icon={tool.icon}
                      active={activeTool === tool.id}
                      onClick={() => setActiveTool(tool.id)}
                    />
                  ))}
                </div>

                {/* Board Content */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '80px 60px 70px'
                  }}
                >
                  <div
                    className="board-main-idea"
                    style={{
                      textAlign: 'center'
                    }}
                  >
                    <div
                      style={{
                        fontSize: isYoung ? '88px' : '84px',
                        marginBottom: '12px'
                      }}
                    >
                      {isYoung ? '🌈💚' : '🌍💚'}
                    </div>

                    <h2
                      style={{
                        margin: 0,
                        fontSize: isYoung ? '40px' : '44px',
                        fontWeight: '900',
                        letterSpacing: '-1px',
                        color: '#0A2E6E'
                      }}
                    >
                      {isYoung ? 'KINDNESS QUEST' : 'CARE CONNECT'}
                    </h2>

                    <p
                      style={{
                        margin: '8px 0 0 0',
                        fontSize: '20px',
                        color: '#0F766E',
                        fontWeight: '700'
                      }}
                    >
                      {isYoung ? 'Small smiles, big hearts' : 'Small acts, big impact'}
                    </p>
                  </div>
                </div>

                {/* Notes */}
                <div
                  className="board-note"
                  style={{
                    left: '120px',
                    bottom: '64px',
                    background: '#FBCFE8',
                    color: '#831843',
                    transform: 'rotate(2deg)'
                  }}
                >
                  <p className="note-title">
                    {isYoung ? 'Add a rainbow!' : 'Love the colors!'}
                  </p>
                  <div className="note-line" />
                  <p className="note-author">
                    {isYoung ? 'Emma' : 'Maya'}
                  </p>
                </div>

                <div
                  className="board-note"
                  style={{
                    right: '120px',
                    bottom: '62px',
                    background: '#FEF3C7',
                    color: '#78350F',
                    transform: 'rotate(-3deg)'
                  }}
                >
                  <p className="note-title">
                    {isYoung ? 'Use kind words!' : "Let's add a slogan!"}
                  </p>
                  <div className="note-line" />
                  <p className="note-author">
                    {isYoung ? 'Liam' : 'Sam'}
                  </p>
                </div>

                <div
                  className="board-note"
                  style={{
                    right: '82px',
                    top: '72px',
                    background: '#BFDBFE',
                    color: '#1E3A8A',
                    transform: 'rotate(3deg)'
                  }}
                >
                  <p className="note-title">Great idea!</p>
                  <div className="note-line" />
                  <p className="note-author">You</p>
                </div>
              </div>
            </div>
          </section>

          {/* Right Chat */}
          <aside
            className="live-chat"
            style={{
              position: 'sticky',
              top: '92px',
              maxHeight: 'calc(100vh - 112px)',
              background: 'white',
              borderRadius: '24px',
              padding: '20px',
              boxShadow: '0 6px 20px rgba(15, 23, 42, 0.06)',
              border: '1px solid #E2E8F0',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <h3 className="live-card-title">
              Chat
            </h3>

            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                paddingRight: '4px',
                minHeight: '360px'
              }}
            >
              {chatMessages.map((chat, index) => (
                <div
                  key={`${chat.name}-${index}`}
                  className="chat-message"
                  style={{
                    display: 'flex',
                    gap: '10px',
                    alignItems: 'flex-start'
                  }}
                >
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      background:
                        chat.name === hostName
                          ? 'linear-gradient(135deg, #14B8A6 0%, #06B6D4 100%)'
                          : '#DBEAFE',
                      color: chat.name === hostName ? 'white' : '#2563EB',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: '800',
                      flexShrink: 0
                    }}
                  >
                    {chat.name.charAt(0)}
                  </div>

                  <div style={{ minWidth: 0 }}>
                    <p
                      style={{
                        margin: '0 0 5px 0',
                        fontSize: '12px',
                        color: '#64748B',
                        fontWeight: '800'
                      }}
                    >
                      {chat.name}
                    </p>

                    <div
                      style={{
                        background: '#F1F5F9',
                        borderRadius: '14px',
                        padding: '10px 12px',
                        color: '#334155',
                        fontSize: '13px',
                        lineHeight: 1.4
                      }}
                    >
                      {chat.text}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                display: 'flex',
                gap: '8px',
                marginTop: '16px'
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
                  padding: '13px 14px',
                  borderRadius: '14px',
                  border: '2px solid #E2E8F0',
                  outline: 'none',
                  fontSize: '13px',
                  minWidth: 0
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
                  width: '46px',
                  borderRadius: '14px',
                  border: 'none',
                  background: message.trim()
                    ? 'linear-gradient(135deg, #14B8A6 0%, #06B6D4 100%)'
                    : '#CBD5E1',
                  color: 'white',
                  cursor: message.trim() ? 'pointer' : 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <Send size={18} />
              </button>
            </div>
          </aside>
        </div>

        {/* Bottom Controls */}
        <div
          className="controls-grid"
          style={{
            position: 'sticky',
            bottom: 0,
            zIndex: 10,
            marginTop: '20px',
            padding: '14px 0 4px',
            background: 'linear-gradient(180deg, rgba(248,250,252,0.1) 0%, #F8FAFC 28%)',
            display: 'grid',
            gridTemplateColumns: '390px 1fr 140px',
            gap: '18px'
          }}
        >
          <div className="controls-card">
            <span
              style={{
                color: '#334155',
                fontWeight: '800',
                marginRight: '8px'
              }}
            >
              React
            </span>

            {['👍', '💗', '😄', '😮', '🎉'].map((reaction) => (
              <button
                key={reaction}
                className="reaction-button"
                style={{
                  border: 'none',
                  background: 'transparent',
                  fontSize: '28px',
                  cursor: 'pointer'
                }}
              >
                {reaction}
              </button>
            ))}
          </div>

          <div
            className="controls-card"
            style={{
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}
          >
            {[
              { icon: <Mic size={21} />, label: 'Mic' },
              { icon: <Camera size={21} />, label: 'Camera' },
              { icon: <Hand size={21} />, label: 'Raise Hand' },
              { icon: <Monitor size={21} />, label: 'Share Screen' },
              { icon: <MoreHorizontal size={21} />, label: 'More' }
            ].map((control) => (
              <button
                key={control.label}
                style={{
                  border: 'none',
                  background: 'transparent',
                  color: '#0A2E6E',
                  fontWeight: '800',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 10px'
                }}
              >
                {control.icon}
                {control.label}
              </button>
            ))}
          </div>

          <div className="controls-card" style={{ justifyContent: 'center' }}>
            <Users size={22} color="#0A2E6E" />
            <div>
              <div
                style={{
                  fontSize: '20px',
                  fontWeight: '900',
                  color: '#0A2E6E'
                }}
              >
                {participants.length + 1}
              </div>
              <div
                style={{
                  fontSize: '11px',
                  color: '#64748B',
                  fontWeight: '700'
                }}
              >
                Participants
              </div>
            </div>
          </div>
        </div>
      </main>

      <style>
        {`
          .live-session-scroll::-webkit-scrollbar,
          .live-session-scroll *::-webkit-scrollbar {
            width: 9px;
            height: 9px;
          }

          .live-session-scroll::-webkit-scrollbar-track,
          .live-session-scroll *::-webkit-scrollbar-track {
            background: #E2E8F0;
            border-radius: 999px;
          }

          .live-session-scroll::-webkit-scrollbar-thumb,
          .live-session-scroll *::-webkit-scrollbar-thumb {
            background: #94A3B8;
            border-radius: 999px;
          }

          .live-session-scroll::-webkit-scrollbar-thumb:hover,
          .live-session-scroll *::-webkit-scrollbar-thumb:hover {
            background: #64748B;
          }

          .live-card {
            background: white;
            border-radius: 24px;
            padding: 22px;
            box-shadow: 0 6px 20px rgba(15, 23, 42, 0.06);
            border: 1px solid #E2E8F0;
          }

          .live-card-title {
            margin: 0 0 16px 0;
            font-size: 17px;
            font-weight: 900;
            color: #0F172A;
          }

          .card-header-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            margin-bottom: 16px;
          }

          .link-button {
            border: none;
            background: transparent;
            color: #2563EB;
            font-weight: 800;
            cursor: pointer;
            font-size: 14px;
          }

          .controls-card {
            min-height: 74px;
            background: white;
            border-radius: 22px;
            border: 1px solid #E2E8F0;
            box-shadow: 0 6px 20px rgba(15, 23, 42, 0.06);
            display: flex;
            align-items: center;
            gap: 16px;
            padding: 0 22px;
          }

          .group-card {
            opacity: 0;
            transform: translateX(-14px) scale(0.98);
            animation: groupIn 0.38s ease forwards;
          }

          .participant-row {
            animation: fadeIn 0.35s ease both;
          }

          .chat-message {
            animation: chatIn 0.3s ease both;
          }

          .board-main-idea {
            animation: boardPop 0.6s ease both;
          }

          .board-note {
            position: absolute;
            width: 138px;
            padding: 16px;
            border-radius: 10px;
            box-shadow: 0 8px 18px rgba(15, 23, 42, 0.14);
            animation: noteIn 0.5s ease both;
          }

          .note-title {
            margin: 0;
            font-size: 15px;
            font-weight: 900;
          }

          .note-line {
            height: 1px;
            background: currentColor;
            opacity: 0.25;
            margin: 10px 0;
          }

          .note-author {
            margin: 0;
            font-size: 12px;
          }

          .soft-float {
            animation: softFloat 3s ease-in-out infinite;
          }

          .live-badge {
            animation: livePulse 1.6s ease-in-out infinite;
          }

          .reaction-button {
            transition: transform 0.18s ease;
          }

          .reaction-button:hover {
            transform: translateY(-3px) scale(1.1);
          }

          @keyframes groupIn {
            to {
              opacity: 1;
              transform: translateX(0) scale(1);
            }
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(8px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes chatIn {
            from {
              opacity: 0;
              transform: translateX(10px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes boardPop {
            from {
              opacity: 0;
              transform: scale(0.92);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }

          @keyframes noteIn {
            from {
              opacity: 0;
              transform: translateY(20px) rotate(0deg);
            }
            to {
              opacity: 1;
            }
          }

          @keyframes softFloat {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-7px);
            }
          }

          @keyframes livePulse {
            0%, 100% {
              box-shadow: 0 0 0 rgba(239, 68, 68, 0);
            }
            50% {
              box-shadow: 0 0 0 6px rgba(239, 68, 68, 0.18);
            }
          }

          @media (max-width: 1280px) {
            .live-grid {
              grid-template-columns: 300px minmax(480px, 1fr) !important;
            }

            .live-chat {
              position: static !important;
              max-height: none !important;
              grid-column: 1 / -1;
            }

            .controls-grid {
              grid-template-columns: 1fr !important;
            }
          }

          @media (max-width: 920px) {
            .live-grid {
              grid-template-columns: 1fr !important;
            }

            .brief-grid {
              grid-template-columns: 1fr !important;
            }

            .board-note {
              width: 120px;
            }
          }
        `}
      </style>
    </div>
  );
}