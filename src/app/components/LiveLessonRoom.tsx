import { useState, useEffect, useRef, type ReactNode } from 'react';
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
  Undo2,
  Redo2,
  Maximize2,
  Lightbulb,
  Users,
  Hand,
  MoreHorizontal,
  Star,
  Shuffle,
  Eraser,
  CheckCircle2
  
} from 'lucide-react';

interface LiveLessonRoomProps {
  onBack: () => void;
  onEndSession?: () => void;
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

type SelectedItem = { type: 'note' | 'text' | 'shape' | 'image'; id: number } | null;

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
          background: active ? 'linear-gradient(135deg, #14B8A6 0%, #06B6D4 100%)' : '#E2E8F0',
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
        <p style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: '#1E293B', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {name}
        </p>
        <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: active ? '#14B8A6' : '#94A3B8' }}>
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

export function LiveLessonRoom({ onBack,onEndSession, ageGroup }: LiveLessonRoomProps) {
  
  
  const [message, setMessage] = useState('');
  const [groupsVisible, setGroupsVisible] = useState(false);
  const [splitAnimationKey, setSplitAnimationKey] = useState(0);
  const [activeGroupIndex, setActiveGroupIndex] = useState(0);
  const [activeTool, setActiveTool] = useState('select');

  // Whiteboard state
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageUploadRef = useRef<HTMLInputElement>(null);
  const isDrawing = useRef(false);
  const lastPos = useRef<{ x: number; y: number } | null>(null);
  const [penColor, setPenColor] = useState('#3B82F6');
  const [penSize, setPenSize] = useState(4); // matches middle size button

  const [stickyNotes, setStickyNotes] = useState([
    { id: 1, text: 'Add a rainbow!', author: 'Emma', x: 120, y: 340, bg: '#FBCFE8', color: '#831843', rotate: 2 },
    { id: 2, text: 'Use kind words!', author: 'Liam', x: 480, y: 340, bg: '#FEF3C7', color: '#78350F', rotate: -3 },
    { id: 3, text: 'Great idea!', author: 'You', x: 620, y: 60, bg: '#BFDBFE', color: '#1E3A8A', rotate: 3 },
  ]);
  const [newNoteText, setNewNoteText] = useState('');
  const [showNoteInput, setShowNoteInput] = useState(false);

  const [textItems, setTextItems] = useState<{ id: number; text: string; x: number; y: number; color: string }[]>([]);
  const [shapes, setShapes] = useState<{ id: number; type: string; x: number; y: number; w: number; h: number; color: string }[]>([]);
  const [imageItems, setImageItems] = useState<{ id: number; src: string; x: number; y: number; w: number; h: number }[]>([]);
  const drawingShapeRef = useRef<{ x: number; y: number } | null>(null);
  const [drawingShape, setDrawingShape] = useState<{ x: number; y: number } | null>(null);
  const [canvasHistory, setCanvasHistory] = useState<ImageData[]>([]);
  const [canvasFuture, setCanvasFuture] = useState<ImageData[]>([]);
  const [selectedItem, setSelectedItem] = useState<SelectedItem>(null);

  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);

  const isYoung = ageGroup === 'young';
  const [timeLeft, setTimeLeft] = useState(45 * 60);

  useEffect(() => {
    // Rozpoczyna odliczanie co sekundę
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    // Czyści interwał, gdy komponent zostanie zamknięty
    return () => clearInterval(timer);
  }, []);

  // Funkcja formatująca sekundy na format 00:00:00
  const formatTime = (seconds: number) => {
    const isTimeUrgent = timeLeft < 300; // mniej niż 5 minut
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    const hDisplay = hrs > 0 ? hrs.toString().padStart(2, '0') + ':' : '00:';
    const mDisplay = mins.toString().padStart(2, '0') + ':';
    const sDisplay = secs.toString().padStart(2, '0');
    
    return hDisplay + mDisplay + sDisplay;
  };
  
  
  
  const sessionTitle = isYoung
    ? 'Design a Logo for a Kindness Project'
    : 'Mini Startup Challenge: Invent a Helpful Product';

  const challengeTitle = isYoung ? 'Kindness Logo Challenge' : 'Recovery Product Challenge';

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
        { name: 'Team Rainbow', members: ['You', 'Emma', 'Liam'], color: '#FF6B9D', task: 'Create the main symbol' },
        { name: 'Team Stars', members: ['Olivia', 'Noah', 'Mia'], color: '#F59E0B', task: 'Add colors and friendly words' }
      ]
    : [
        { name: 'Team Alpha', members: ['You', 'Alex'], color: '#14B8A6', task: 'Define the product idea' },
        { name: 'Team Beta', members: ['Jordan', 'Maya'], color: '#3B82F6', task: 'Describe the user problem' },
        { name: 'Team Gamma', members: ['Sam', 'Taylor'], color: '#8B5CF6', task: 'Sketch the solution' },
        { name: 'Team Delta', members: ['Chris', 'Riley'], color: '#F59E0B', task: 'Prepare the pitch' }
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

  // Tools — no image in toolbar list; image upload is a separate button
  const tools = [
    { id: 'select', icon: <MousePointer2 size={18} /> },
    { id: 'pen', icon: <PenLine size={18} /> },
    {id : 'eraser', icon: <Eraser size={18} />},
    { id: 'shape', icon: <Square size={18} /> },
    { id: 'text', icon: <Type size={18} /> },
    { id: 'undo', icon: <Undo2 size={18} /> },
    { id: 'redo', icon: <Redo2 size={18} /> }
  ];

  const handleSplitGroups = () => {
    setGroupsVisible(true);
    setActiveGroupIndex(0);
    setSplitAnimationKey((prev) => prev + 1);
  };

  const handleSendMessage = () => {
    if (message.trim()) setMessage('');
  };

  // Generic drag helper for any item
  const startDrag = (
    e: React.MouseEvent,
    itemX: number,
    itemY: number,
    onMove: (x: number, y: number) => void
  ) => {
    if (activeTool !== 'select') return;
    e.stopPropagation();
    const startX = e.clientX - itemX;
    const startY = e.clientY - itemY;
    const handleMove = (ev: MouseEvent) => onMove(ev.clientX - startX, ev.clientY - startY);
    const handleUp = () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleUp);
    };
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleUp);
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
      {/* ── Top Bar ── */}
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', minWidth: 0 }}>
          <button
            onClick={onBack}
            style={{
              width: '44px', height: '44px', borderRadius: '14px', border: 'none',
              background: 'rgba(255,255,255,0.12)', color: 'white', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
            }}
          >
            <X size={21} />
          </button>

          <Star size={21} style={{ flexShrink: 0 }} />

          <div style={{ minWidth: 0 }}>
            <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '800', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {sessionTitle}
            </h2>
            <p style={{ margin: '4px 0 0 0', fontSize: '13px', opacity: 0.78 }}>Live collaborative lesson</p>
          </div>

          <span className="live-badge" style={{ background: '#EF4444', padding: '7px 13px', borderRadius: '12px', fontSize: '12px', fontWeight: '800', flexShrink: 0 }}>
            LIVE
          </span>

          <span style={{ display: 'flex', alignItems: 'center', gap: '7px', fontSize: '14px', fontWeight: '700', flexShrink: 0, fontFamily: 'monospace',color: timeLeft < 300 ? '#EF4444' : 'white' }}>
            <span 
            className="timer-pulse"
            style={{ 
              width: '8px', 
              height: '8px', 
              borderRadius: '50%', 
              background: '#EF4444' 
            }} />
            {formatTime(timeLeft)} {/* Zostaw tylko to! */}
          </span>
        </div>

        <button
          onClick={onEndSession ?? onBack}
          style={{
            background: 'white', color: '#EF4444', border: 'none',
            borderRadius: '16px', padding: '13px 24px',
            fontWeight: '800', cursor: 'pointer', fontSize: '15px', flexShrink: 0
          }}
        >
          End Session
        </button>
      </div>

      <main style={{ maxWidth: '1680px', margin: '0 auto', padding: '20px' }}>
        {/* ── Main Grid ── */}
        <div
          className="live-grid"
          style={{ display: 'grid', gridTemplateColumns: '320px minmax(560px, 1fr) 300px', gap: '20px', alignItems: 'start' }}
        >
          {/* ── Left Column ── */}
          <section style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>

            {/* Host */}
            <div className="live-card">
              <h3 className="live-card-title">Host</h3>
              <div
                style={{
                  height: '210px', borderRadius: '20px',
                  background: 'linear-gradient(135deg, #DBEAFE 0%, #F0FDFA 100%)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  position: 'relative', overflow: 'hidden'
                }}
              >
                <div
                  className="soft-float"
                  style={{
                    width: '96px', height: '96px', borderRadius: '50%',
                    background: 'linear-gradient(135deg, #14B8A6 0%, #3B82F6 100%)',
                    color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '42px', fontWeight: '800'
                  }}
                >
                  👩‍🏫
                </div>
                <div
                  style={{
                    position: 'absolute', left: 0, right: 0, bottom: 0,
                    padding: '14px 16px',
                    background: 'linear-gradient(180deg, transparent 0%, rgba(15,23,42,0.72) 100%)',
                    color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                  }}
                >
                  <span style={{ fontWeight: '800', fontSize: '15px' }}>{hostName}</span>
                  <Mic size={17} />
                </div>
              </div>
            </div>

            {/* Participants */}
            <div className="live-card">
              <div className="card-header-row">
                <h3 className="live-card-title" style={{ margin: 0 }}>Participants ({participants.length + 1})</h3>
                <button className="link-button">View all</button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '310px', overflowY: 'auto', paddingRight: '4px' }}>
                <Participant name={hostName} active />
                {participants.map((name, index) => (
                  <Participant key={name} name={name} active={name === 'You'} muted={index % 2 === 0} />
                ))}
              </div>
            </div>

            {/* Breakout Groups */}
            <div className="live-card">
              <div className="card-header-row">
                <h3 className="live-card-title" style={{ margin: 0 }}>Breakout Groups</h3>
                <button onClick={handleSplitGroups} className="link-button" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Shuffle size={16} /> Split
                </button>
              </div>

              {!groupsVisible ? (
                <div
                  className="empty-groups-card"
                  style={{ background: '#F8FAFC', border: '1px dashed #CBD5E1', borderRadius: '18px', padding: '22px', textAlign: 'center' }}
                >
                  <div style={{ fontSize: '42px', marginBottom: '10px' }}>👥</div>
                  <p style={{ margin: '0 0 14px 0', color: '#64748B', fontSize: '14px', lineHeight: 1.5 }}>
                    Participants are waiting for the host to create small teams.
                  </p>
                  <button
                    onClick={handleSplitGroups}
                    style={{
                      border: 'none', borderRadius: '14px',
                      background: 'linear-gradient(135deg, #14B8A6 0%, #06B6D4 100%)',
                      color: 'white', padding: '12px 18px', cursor: 'pointer', fontWeight: '800'
                    }}
                  >
                    Split into groups
                  </button>
                </div>
              ) : (
                <div key={splitAnimationKey} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {groups.map((group, index) => (
                    <button
                      key={group.name}
                      onClick={() => setActiveGroupIndex(index)}
                      className="group-card"
                      style={{
                        animationDelay: `${index * 90}ms`,
                        width: '100%', textAlign: 'left', padding: '14px', borderRadius: '18px',
                        background: activeGroupIndex === index ? '#F0FDFA' : '#F8FAFC',
                        border: activeGroupIndex === index ? `2px solid ${group.color}` : '1px solid #E2E8F0',
                        cursor: 'pointer', transition: 'all 0.2s ease'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '7px' }}>
                        <span style={{ width: '11px', height: '11px', borderRadius: '50%', background: group.color, flexShrink: 0 }} />
                        <strong style={{ fontSize: '14px', color: '#1E293B' }}>{group.name}</strong>
                        {group.members.includes('You') && (
                          <span style={{ marginLeft: 'auto', background: '#DCFCE7', color: '#15803D', borderRadius: '999px', padding: '4px 9px', fontSize: '11px', fontWeight: '800' }}>
                            You
                          </span>
                        )}
                      </div>
                      <p style={{ margin: '0 0 6px 0', fontSize: '12px', color: '#64748B' }}>{group.members.join(', ')}</p>
                      <p style={{ margin: 0, fontSize: '12px', color: '#0F766E', fontWeight: '700' }}>Task: {group.task}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* ── Center Column ── */}
          <section style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* Challenge Brief */}
            <div className="live-card">
              <div className="card-header-row">
                <h3 className="live-card-title" style={{ margin: 0 }}>Challenge Brief</h3>
                <Maximize2 size={18} color="#64748B" />
              </div>
              <div className="brief-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(260px, 1fr) 230px', gap: '18px' }}>
                <div style={{ background: 'linear-gradient(135deg, #FFF7ED 0%, #FEF3C7 100%)', borderRadius: '20px', padding: '22px', border: '1px solid #FED7AA' }}>
                  <h4 style={{ margin: '0 0 14px 0', fontSize: '16px', color: '#92400E', fontWeight: '800' }}>{challengeTitle}</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '11px' }}>
                    {challengeSteps.map((step) => (
                      <div key={step} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', color: '#475569', fontSize: '14px', lineHeight: 1.45 }}>
                        <Star size={17} fill="#F59E0B" color="#F59E0B" style={{ flexShrink: 0, marginTop: 2 }} />
                        {step}
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ background: 'linear-gradient(135deg, #F0FDFA 0%, #CCFBF1 100%)', borderRadius: '20px', padding: '22px', border: '1px solid #99F6E4', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <Lightbulb size={32} color="#14B8A6" />
                  <h4 style={{ margin: '14px 0 8px 0', fontSize: '16px', color: '#0F766E', fontWeight: '800' }}>Host Tip</h4>
                  <p style={{ margin: 0, color: '#475569', fontSize: '14px', lineHeight: 1.55 }}>
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
                  <h3 className="live-card-title" style={{ margin: 0 }}>Collaborative Whiteboard</h3>
                  <p style={{ margin: '5px 0 0 0', fontSize: '13px', color: '#64748B' }}>
                    Shared workspace for sketches, notes and group ideas
                  </p>
                </div>
                <Maximize2 size={18} color="#64748B" />
              </div>

              {groupsVisible && (
                <div
                  className="active-group-banner"
                  style={{
                    marginBottom: '14px', background: '#F8FAFC', border: '1px solid #E2E8F0',
                    borderRadius: '18px', padding: '12px 14px', display: 'flex', alignItems: 'center', gap: '10px'
                  }}
                >
                  <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: activeGroup.color, flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: 0, fontSize: '14px', fontWeight: '800', color: '#1E293B' }}>Working now: {activeGroup.name}</p>
                    <p style={{ margin: '3px 0 0 0', fontSize: '12px', color: '#64748B' }}>{activeGroup.task}</p>
                  </div>
                  <CheckCircle2 size={20} color="#10B981" />
                </div>
              )}

              {/* ── Board Canvas Container ── */}
              <div
                style={{
                  position: 'relative',
                  minHeight: '540px',
                  borderRadius: '22px',
                  overflow: 'hidden',
                  border: '2px solid #E2E8F0',
                  backgroundColor: '#FFFFFF',
                  backgroundImage: 'radial-gradient(#CBD5E1 1px, transparent 1px)',
                  backgroundSize: '22px 22px',
                  cursor:
                    activeTool === 'pen' || activeTool === 'eraser' ? 'crosshair'
                    : activeTool === 'text' ? 'text'
                    : activeTool === 'shape' ? 'crosshair'
                    : 'default'
                }}
                onClick={(e) => {
                  // Only fire if clicking the board itself, not any child (toolbar, notes, etc.)
                  if (e.target !== e.currentTarget) return;
                  if (activeTool === 'text') {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const text = prompt('Enter text:');
                    if (text) {
                      setTextItems(prev => [...prev, { id: Date.now(), text, x, y, color: penColor }]);
                    }
                  }
                  if (activeTool === 'select') {
                    setSelectedItem(null);
                    setShowNoteInput(false);
                  }
                }}
                onMouseDown={(e) => {
                  if (activeTool === 'pen' || activeTool === 'eraser') {
                    isDrawing.current = true;
                    const rect = e.currentTarget.getBoundingClientRect();
                    lastPos.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
                    const canvas = canvasRef.current;
                    if (canvas) {
                      const ctx = canvas.getContext('2d');
                      if (ctx) {
                        const snap = ctx.getImageData(0, 0, canvas.width, canvas.height);
                        setCanvasHistory(prev => [...prev.slice(-19), snap]);
                        setCanvasFuture([]);
                      }
                    }
                  }
                  if (activeTool === 'shape') {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const pos = { x: e.clientX - rect.left, y: e.clientY - rect.top };
                    drawingShapeRef.current = pos;
                    setDrawingShape(pos);
                  }
                }}
                onMouseMove={(e) => {
                  if ((activeTool === 'pen' || activeTool === 'eraser') && isDrawing.current && lastPos.current) {
                    const canvas = canvasRef.current;
                    if (!canvas) return;
                    const ctx = canvas.getContext('2d');
                    if (!ctx) return;
                    const rect = canvas.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    ctx.beginPath();
                    ctx.moveTo(lastPos.current.x, lastPos.current.y);
                    ctx.lineTo(x, y);
                    ctx.globalCompositeOperation = activeTool === 'eraser' ? 'destination-out' : 'source-over';
                    ctx.strokeStyle = penColor;
                    ctx.lineWidth = activeTool === 'eraser' ? 24 : penSize;
                    ctx.lineCap = 'round';
                    ctx.lineJoin = 'round';
                    ctx.stroke();
                    ctx.globalCompositeOperation = 'source-over';
                    lastPos.current = { x, y };
                  }
                  // Track mouse for shape preview — use ref to avoid stale closure
                  if (activeTool === 'shape' && drawingShapeRef.current) {
                    const rect = e.currentTarget.getBoundingClientRect();
                    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
                  }
                }}
                onMouseUp={(e) => {
                  if (activeTool === 'pen' || activeTool === 'eraser') {
                    isDrawing.current = false;
                    lastPos.current = null;
                  }
                  if (activeTool === 'shape' && drawingShapeRef.current) {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x2 = e.clientX - rect.left;
                    const y2 = e.clientY - rect.top;
                    const origin = drawingShapeRef.current;
                    setShapes(prev => [...prev, {
                      id: Date.now(), type: 'rect',
                      x: Math.min(origin.x, x2),
                      y: Math.min(origin.y, y2),
                      w: Math.abs(x2 - origin.x),
                      h: Math.abs(y2 - origin.y),
                      color: penColor
                    }]);
                    drawingShapeRef.current = null;
                    setDrawingShape(null);
                    setMousePos(null);
                  }
                }}
                onMouseLeave={() => {
                  isDrawing.current = false;
                  lastPos.current = null;
                  drawingShapeRef.current = null;
                  setDrawingShape(null);
                  setMousePos(null);
                }}
              >
                {/* Freehand canvas */}
                <canvas
                  ref={canvasRef}
                  width={800}
                  height={540}
                  style={{
                    position: 'absolute', inset: 0, width: '100%', height: '100%',
                    pointerEvents: activeTool === 'pen' || activeTool === 'eraser' ? 'auto' : 'none'
                  }}
                />

                {/* Live shape preview while dragging */}
                {activeTool === 'shape' && drawingShape && mousePos && (() => {
                  const px = Math.min(drawingShape.x, mousePos.x);
                  const py = Math.min(drawingShape.y, mousePos.y);
                  const pw = Math.abs(mousePos.x - drawingShape.x);
                  const ph = Math.abs(mousePos.y - drawingShape.y);
                  return (
                    <div style={{
                      position: 'absolute',
                      left: px, top: py, width: pw, height: ph,
                      border: `2px dashed ${penColor}`,
                      borderRadius: '6px',
                      background: `${penColor}18`,
                      zIndex: 9,
                      pointerEvents: 'none',
                      boxSizing: 'border-box'
                    }}>
                      {/* Size label */}
                      {pw > 40 && ph > 20 && (
                        <span style={{
                          position: 'absolute', bottom: 4, right: 6,
                          fontSize: '11px', fontWeight: '700',
                          color: penColor,
                          background: 'rgba(255,255,255,0.85)',
                          borderRadius: '4px', padding: '1px 5px',
                          lineHeight: 1.4
                        }}>
                          {Math.round(pw)} × {Math.round(ph)}
                        </span>
                      )}
                    </div>
                  );
                })()}

                {/* Shapes layer */}
                {shapes.map(s => {
                  const isSel = selectedItem?.type === 'shape' && selectedItem.id === s.id;
                  return (
                    <div
                      key={s.id}
                      onClick={(e) => {
                        if (activeTool !== 'select') return;
                        e.stopPropagation();
                        setSelectedItem({ type: 'shape', id: s.id });
                      }}
                      onMouseDown={(e) => {
                        if (activeTool !== 'select') return;
                        startDrag(e, s.x, s.y, (nx, ny) => {
                          setShapes(prev => prev.map(sh => sh.id === s.id ? { ...sh, x: nx, y: ny } : sh));
                        });
                        setSelectedItem({ type: 'shape', id: s.id });
                      }}
                      style={{
                        position: 'absolute',
                        left: s.x, top: s.y, width: s.w, height: s.h,
                        border: isSel ? '2px dashed #EF4444' : `3px solid ${s.color}`,
                        borderRadius: '6px', zIndex: 2,
                        cursor: activeTool === 'select' ? 'move' : 'default',
                        boxSizing: 'border-box', background: 'transparent'
                      }}
                    >
                      {isSel && (
                        <button
                          onClick={(e) => { e.stopPropagation(); setShapes(prev => prev.filter(sh => sh.id !== s.id)); setSelectedItem(null); }}
                          style={{
                            position: 'absolute', top: -12, right: -12,
                            width: '22px', height: '22px', borderRadius: '50%',
                            background: '#EF4444', color: 'white', border: 'none',
                            cursor: 'pointer', fontSize: '13px', fontWeight: '800',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: '0 2px 6px rgba(0,0,0,0.2)', zIndex: 20
                          }}
                        >×</button>
                      )}
                    </div>
                  );
                })}

                {/* Text items — draggable only in select mode */}
                {textItems.map(item => {
                  const isSel = selectedItem?.type === 'text' && selectedItem.id === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={(e) => {
                        if (activeTool !== 'select') return;
                        e.stopPropagation();
                        setSelectedItem({ type: 'text', id: item.id });
                      }}
                      onMouseDown={(e) => {
                        if (activeTool !== 'select') return;
                        setSelectedItem({ type: 'text', id: item.id });
                        startDrag(e, item.x, item.y, (nx, ny) => {
                          setTextItems(prev => prev.map(t => t.id === item.id ? { ...t, x: nx, y: ny } : t));
                        });
                      }}
                      style={{
                        position: 'absolute', left: item.x, top: item.y,
                        fontSize: '16px', fontWeight: '700', color: item.color ?? penColor,
                        zIndex: 3, whiteSpace: 'nowrap',
                        cursor: activeTool === 'select' ? 'move' : 'default',
                        border: isSel ? '2px dashed #EF4444' : '2px solid transparent',
                        background: isSel ? 'rgba(239,68,68,0.05)' : 'transparent',
                        userSelect: 'none'
                      }}
                    >
                      {item.text}
                      {isSel && (
                        <button
                          onClick={(e) => { e.stopPropagation(); setTextItems(prev => prev.filter(t => t.id !== item.id)); setSelectedItem(null); }}
                          style={{
                            position: 'absolute', top: -10, right: -10,
                            width: '22px', height: '22px', borderRadius: '50%',
                            background: '#EF4444', color: 'white', border: 'none',
                            cursor: 'pointer', fontSize: '13px', fontWeight: '800',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: '0 2px 6px rgba(0,0,0,0.2)', zIndex: 20
                          }}
                        >×</button>
                      )}
                    </div>
                  );
                })}

                {/* Image items — draggable only in select mode */}
                {imageItems.map(img => {
                  const isSel = selectedItem?.type === 'image' && selectedItem.id === img.id;
                  return (
                    <div
                      key={img.id}
                      onClick={(e) => {
                        if (activeTool !== 'select') return;
                        e.stopPropagation();
                        setSelectedItem({ type: 'image', id: img.id });
                      }}
                      onMouseDown={(e) => {
                        if (activeTool !== 'select') return;
                        setSelectedItem({ type: 'image', id: img.id });
                        startDrag(e, img.x, img.y, (nx, ny) => {
                          setImageItems(prev => prev.map(i => i.id === img.id ? { ...i, x: nx, y: ny } : i));
                        });
                      }}
                      style={{
                        position: 'absolute', left: img.x, top: img.y,
                        width: img.w, height: img.h,
                        border: isSel ? '2px dashed #EF4444' : '2px solid transparent',
                        borderRadius: '8px', zIndex: 5,
                        cursor: activeTool === 'select' ? 'move' : 'default',
                        userSelect: 'none', overflow: 'visible',
                        boxSizing: 'border-box'
                      }}
                    >
                      <img
                        src={img.src}
                        draggable={false}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', borderRadius: '6px', pointerEvents: 'none' }}
                      />
                      {isSel && (
                        <button
                          onClick={(e) => { e.stopPropagation(); setImageItems(prev => prev.filter(i => i.id !== img.id)); setSelectedItem(null); }}
                          style={{
                            position: 'absolute', top: -10, right: -10,
                            width: '22px', height: '22px', borderRadius: '50%',
                            background: '#EF4444', color: 'white', border: 'none',
                            cursor: 'pointer', fontSize: '13px', fontWeight: '800',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: '0 2px 6px rgba(0,0,0,0.25)', zIndex: 20
                          }}
                        >×</button>
                      )}
                    </div>
                  );
                })}

                {/* ── Toolbar ── */}
                <div
                  onClick={(e) => e.stopPropagation()}
                  onMouseDown={(e) => e.stopPropagation()}
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
                    zIndex: 10
                  }}
                >
                  {tools.map((tool) => (
                    <div key={tool.id}>
                      <ToolButton
                        icon={tool.icon}
                        active={activeTool === tool.id}
                        onClick={() => {
                          if (tool.id === 'undo') {
                            const canvas = canvasRef.current;
                            if (canvas && canvasHistory.length > 0) {
                              const ctx = canvas.getContext('2d');
                              if (ctx) {
                                const current = ctx.getImageData(0, 0, canvas.width, canvas.height);
                                setCanvasFuture(f => [...f.slice(-19), current]);
                                const prev = canvasHistory[canvasHistory.length - 1];
                                ctx.putImageData(prev, 0, 0);
                                setCanvasHistory(h => h.slice(0, -1));
                              }
                            }
                            return;
                          }

                          if (tool.id === 'redo') {
                            const canvas = canvasRef.current;
                            if (canvas && canvasFuture.length > 0) {
                              const ctx = canvas.getContext('2d');
                              if (ctx) {
                                const current = ctx.getImageData(0, 0, canvas.width, canvas.height);
                                setCanvasHistory(h => [...h.slice(-19), current]);
                                const next = canvasFuture[canvasFuture.length - 1];
                                ctx.putImageData(next, 0, 0);
                                setCanvasFuture(f => f.slice(0, -1));
                              }
                            }
                            return;
                          }

                          setActiveTool(tool.id);
                        }}
                      />

                      {/* Thickness picker + color picker — only appears below the pen button */}
                      {tool.id === 'pen' && activeTool === 'pen' && (
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '4px',
                            alignItems: 'center',
                            paddingTop: '6px',
                            paddingBottom: '2px',
                            borderTop: '1px solid #E2E8F0',
                            marginTop: '4px'
                          }}
                        >
                          {[2, 4, 8].map(size => (
                            <button
                              key={size}
                              onClick={() => setPenSize(size)}
                              style={{
                                width: '38px',
                                height: '24px',
                                borderRadius: '8px',
                                border: 'none',
                                background: penSize === size ? '#DBEAFE' : '#F8FAFC',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                outline: penSize === size ? '2px solid #3B82F6' : 'none'
                              }}
                            >
                              <div
                                style={{
                                  width: size * 3,
                                  height: size,
                                  borderRadius: '2px',
                                  background: penColor
                                }}
                              />
                            </button>
                          ))}

                          {/* Color picker below thickness */}
                          <div
                            style={{
                              width: '38px',
                              height: '38px',
                              borderRadius: '12px',
                              overflow: 'hidden',
                              border: '2px solid #E2E8F0',
                              marginTop: '6px'
                            }}
                          >
                            <input
                              type="color"
                              value={penColor}
                              onChange={(e) => setPenColor(e.target.value)}
                              style={{
                                width: '50px',
                                height: '50px',
                                border: 'none',
                                cursor: 'pointer',
                                marginLeft: '-6px',
                                marginTop: '-6px'
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Image upload button */}
                  <button
                    onClick={() => imageUploadRef.current?.click()}
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '12px',
                      border: 'none',
                      background: '#F0FDF4',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '18px'
                    }}
                    title="Upload image"
                  >
                    🖼️
                  </button>
                  <input
                    ref={imageUploadRef}
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const reader = new FileReader();
                      reader.onload = (ev) => {
                        const src = ev.target?.result as string;
                        setImageItems(prev => [...prev, {
                          id: Date.now(),
                          src,
                          x: 150 + Math.random() * 200,
                          y: 100 + Math.random() * 150,
                          w: 180,
                          h: 120
                        }]);
                      };
                      reader.readAsDataURL(file);
                      e.target.value = '';
                    }}
                  />

                  {/* Sticky note button */}
                  <button
                    onClick={() => setShowNoteInput(v => !v)}
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '12px',
                      border: 'none',
                      background: showNoteInput ? '#DBEAFE' : '#FEF9C3',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '18px'
                    }}
                    title="Add sticky note"
                  >
                    📝
                  </button>

                  {/* Clear all */}
                  <button
                    onClick={() => {
                      const canvas = canvasRef.current;
                      if (canvas) {
                        const ctx = canvas.getContext('2d');
                        ctx?.clearRect(0, 0, canvas.width, canvas.height);
                      }
                      setShapes([]);
                      setTextItems([]);
                      setImageItems([]);
                      setSelectedItem(null);
                    }}
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '12px',
                      border: 'none',
                      background: '#FEE2E2',
                      color: '#EF4444',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '16px'
                    }}
                    title="Clear board"
                  >
                    🗑
                  </button>
                </div>

                {/* Add note popup */}
                {showNoteInput && (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    onMouseDown={(e) => e.stopPropagation()}
                    style={{
                    position: 'absolute', top: '18px', left: '80px',
                    background: 'white', borderRadius: '16px', padding: '16px',
                    boxShadow: '0 8px 24px rgba(15,23,42,0.15)', border: '1px solid #E2E8F0',
                    zIndex: 20, display: 'flex', flexDirection: 'column', gap: '10px', width: '220px'
                  }}>
                    <p style={{ margin: 0, fontSize: '13px', fontWeight: '800', color: '#1E293B' }}>Add a sticky note</p>
                    <textarea
                      value={newNoteText}
                      onChange={e => setNewNoteText(e.target.value)}
                      placeholder="Type your note..."
                      rows={3}
                      style={{
                        padding: '10px', borderRadius: '10px', border: '2px solid #E2E8F0',
                        outline: 'none', fontSize: '13px', resize: 'none', fontFamily: 'inherit'
                      }}
                      onFocus={e => { e.currentTarget.style.borderColor = '#14B8A6'; }}
                      onBlur={e => { e.currentTarget.style.borderColor = '#E2E8F0'; }}
                    />
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {['#FBCFE8', '#FEF9C3', '#BFDBFE', '#BBF7D0', '#DDD6FE'].map(bg => (
                        <div
                          key={bg}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (!newNoteText.trim()) return;
                            const colors: Record<string, string> = {
                              '#FBCFE8': '#831843', '#FEF9C3': '#78350F',
                              '#BFDBFE': '#1E3A8A', '#BBF7D0': '#14532D', '#DDD6FE': '#4C1D95'
                            };
                            setStickyNotes(prev => [...prev, {
                              id: Date.now(), text: newNoteText, author: 'You',
                              x: 200 + Math.random() * 300, y: 100 + Math.random() * 200,
                              bg, color: colors[bg] ?? '#1E293B',
                              rotate: (Math.random() - 0.5) * 8
                            }]);
                            setNewNoteText(''); setShowNoteInput(false);
                          }}
                          style={{
                            width: '28px', height: '28px', borderRadius: '8px', background: bg,
                            cursor: newNoteText.trim() ? 'pointer' : 'not-allowed',
                            border: '2px solid rgba(0,0,0,0.1)'
                          }}
                        />
                      ))}
                    </div>
                    <p style={{ margin: 0, fontSize: '11px', color: '#94A3B8' }}>Pick a color to add</p>
                  </div>
                )}

                {/* Board background */}
                <div style={{
                  position: 'absolute', inset: 0, display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  padding: '80px 60px 70px', pointerEvents: 'none', zIndex: 0
                }}>
                  <div className="board-main-idea" style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: isYoung ? '88px' : '84px', marginBottom: '12px' }}>
                      {isYoung ? '🌈💚' : '🌍💚'}
                    </div>
                    <h2 style={{ margin: 0, fontSize: isYoung ? '40px' : '44px', fontWeight: '900', letterSpacing: '-1px', color: '#0A2E6E' }}>
                      {isYoung ? 'KINDNESS QUEST' : 'CARE CONNECT'}
                    </h2>
                    <p style={{ margin: '8px 0 0 0', fontSize: '20px', color: '#0F766E', fontWeight: '700' }}>
                      {isYoung ? 'Small smiles, big hearts' : 'Small acts, big impact'}
                    </p>
                  </div>
                </div>

                {/* Sticky Notes — draggable only in select mode */}
                {stickyNotes.map(note => {
                  const isSel = selectedItem?.type === 'note' && selectedItem.id === note.id;
                  return (
                    <div
                      key={note.id}
                      onClick={(e) => {
                        if (activeTool !== 'select') return;
                        e.stopPropagation();
                        setSelectedItem({ type: 'note', id: note.id });
                      }}
                      onMouseDown={(e) => {
                        if (activeTool !== 'select') return;
                        setSelectedItem({ type: 'note', id: note.id });
                        startDrag(e, note.x, note.y, (nx, ny) => {
                          setStickyNotes(prev => prev.map(n => n.id === note.id ? { ...n, x: nx, y: ny } : n));
                        });
                      }}
                      style={{
                        position: 'absolute', left: note.x, top: note.y,
                        width: '138px', padding: '14px', borderRadius: '10px',
                        background: note.bg, color: note.color,
                        boxShadow: isSel
                        ? '0 0 0 3px #EF4444, 0 8px 18px rgba(15,23,42,0.14)'
                        : '0 8px 18px rgba(15,23,42,0.14)',
                        transform: `rotate(${note.rotate}deg)`,
                        zIndex: isSel ? 8 : 4,
                        cursor: activeTool === 'select' ? 'move' : 'default',
                        userSelect: 'none'
                      }}
                    >
                      {isSel && (
                        <button
                          onClick={(e) => { e.stopPropagation(); setStickyNotes(prev => prev.filter(n => n.id !== note.id)); setSelectedItem(null); }}
                          style={{
                            position: 'absolute', top: -10, right: -10,
                            width: '22px', height: '22px', borderRadius: '50%',
                            background: '#EF4444', color: 'white', border: 'none',
                            cursor: 'pointer', fontSize: '13px', fontWeight: '800',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: '0 2px 6px rgba(0,0,0,0.25)', zIndex: 20
                          }}
                        >×</button>
                      )}
                      <p style={{ margin: 0, fontSize: '14px', fontWeight: '800', lineHeight: 1.4 }}>{note.text}</p>
                      <div style={{ height: '1px', background: 'currentColor', opacity: 0.25, margin: '8px 0' }} />
                      <p style={{ margin: 0, fontSize: '12px' }}>{note.author}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ── Right Chat ── */}
          <aside
            className="live-chat"
            style={{
              position: 'sticky', top: '92px',
              maxHeight: 'calc(100vh - 112px)',
              background: 'white', borderRadius: '24px', padding: '20px',
              boxShadow: '0 6px 20px rgba(15, 23, 42, 0.06)',
              border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column'
            }}
          >
            <h3 className="live-card-title">Chat</h3>

            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '14px', paddingRight: '4px', minHeight: '360px' }}>
              {chatMessages.map((chat, index) => (
                <div key={`${chat.name}-${index}`} className="chat-message" style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: '38px', height: '38px', borderRadius: '50%',
                      background: chat.name === hostName ? 'linear-gradient(135deg, #14B8A6 0%, #06B6D4 100%)' : '#DBEAFE',
                      color: chat.name === hostName ? 'white' : '#2563EB',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', flexShrink: 0
                    }}
                  >
                    {chat.name.charAt(0)}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <p style={{ margin: '0 0 5px 0', fontSize: '12px', color: '#64748B', fontWeight: '800' }}>{chat.name}</p>
                    <div style={{ background: '#F1F5F9', borderRadius: '14px', padding: '10px 12px', color: '#334155', fontSize: '13px', lineHeight: 1.4 }}>
                      {chat.text}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
              <input
                type="text"
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleSendMessage(); }}
                style={{ flex: 1, padding: '13px 14px', borderRadius: '14px', border: '2px solid #E2E8F0', outline: 'none', fontSize: '13px', minWidth: 0 }}
                onFocus={(e) => { e.currentTarget.style.borderColor = '#14B8A6'; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = '#E2E8F0'; }}
              />
              <button
                onClick={handleSendMessage}
                disabled={!message.trim()}
                style={{
                  width: '46px', borderRadius: '14px', border: 'none',
                  background: message.trim() ? 'linear-gradient(135deg, #14B8A6 0%, #06B6D4 100%)' : '#CBD5E1',
                  color: 'white', cursor: message.trim() ? 'pointer' : 'not-allowed',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                }}
              >
                <Send size={18} />
              </button>
            </div>
          </aside>
        </div>

        {/* ── Bottom Controls ── */}
        <div
          className="controls-grid"
          style={{
            position: 'sticky', bottom: 0, zIndex: 10, marginTop: '20px', padding: '14px 0 4px',
            background: 'linear-gradient(180deg, rgba(248,250,252,0.1) 0%, #F8FAFC 28%)',
            display: 'grid', gridTemplateColumns: '390px 1fr 140px', gap: '18px'
          }}
        >
          <div className="controls-card">
            <span style={{ color: '#334155', fontWeight: '800', marginRight: '8px' }}>React</span>
            {['👍', '💗', '😄', '😮', '🎉'].map((reaction) => (
              <button key={reaction} className="reaction-button" style={{ border: 'none', background: 'transparent', fontSize: '28px', cursor: 'pointer' }}>
                {reaction}
              </button>
            ))}
          </div>

          <div className="controls-card" style={{ justifyContent: 'center', flexWrap: 'wrap' }}>
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
                  border: 'none', background: 'transparent', color: '#0A2E6E', fontWeight: '800',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 10px'
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
              <div style={{ fontSize: '20px', fontWeight: '900', color: '#0A2E6E' }}>{participants.length + 1}</div>
              <div style={{ fontSize: '11px', color: '#64748B', fontWeight: '700' }}>Participants</div>
            </div>
          </div>
        </div>
      </main>

      <style>{`
        .live-session-scroll::-webkit-scrollbar,
        .live-session-scroll *::-webkit-scrollbar { width: 9px; height: 9px; }
        .live-session-scroll::-webkit-scrollbar-track,
        .live-session-scroll *::-webkit-scrollbar-track { background: #E2E8F0; border-radius: 999px; }
        .live-session-scroll::-webkit-scrollbar-thumb,
        .live-session-scroll *::-webkit-scrollbar-thumb { background: #94A3B8; border-radius: 999px; }
        .live-session-scroll::-webkit-scrollbar-thumb:hover,
        .live-session-scroll *::-webkit-scrollbar-thumb:hover { background: #64748B; }

        .live-card { background: white; border-radius: 24px; padding: 22px; box-shadow: 0 6px 20px rgba(15,23,42,0.06); border: 1px solid #E2E8F0; }
        .live-card-title { margin: 0 0 16px 0; font-size: 17px; font-weight: 900; color: #0F172A; }
        .card-header-row { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 16px; }
        .link-button { border: none; background: transparent; color: #2563EB; font-weight: 800; cursor: pointer; font-size: 14px; }

        .controls-card { min-height: 74px; background: white; border-radius: 22px; border: 1px solid #E2E8F0; box-shadow: 0 6px 20px rgba(15,23,42,0.06); display: flex; align-items: center; gap: 16px; padding: 0 22px; }

        .group-card { opacity: 0; transform: translateX(-14px) scale(0.98); animation: groupIn 0.38s ease forwards; }
        .participant-row { animation: fadeIn 0.35s ease both; }
        .chat-message { animation: chatIn 0.3s ease both; }
        .board-main-idea { animation: boardPop 0.6s ease both; }
        .soft-float { animation: softFloat 3s ease-in-out infinite; }
        .live-badge { animation: livePulse 1.6s ease-in-out infinite; }
        .reaction-button { transition: transform 0.18s ease; }
        .reaction-button:hover { transform: translateY(-3px) scale(1.1); }
        .timer-pulse {animation: timerDotPulse 1.5s ease-in-out infinite;}
        @keyframes timerDotPulse {0%, 100% { opacity: 1; transform: scale(1); }50% { opacity: 0.4; transform: scale(0.8); }}
        @keyframes groupIn { to { opacity: 1; transform: translateX(0) scale(1); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes chatIn { from { opacity: 0; transform: translateX(10px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes boardPop { from { opacity: 0; transform: scale(0.92); } to { opacity: 1; transform: scale(1); } }
        @keyframes softFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-7px); } }
        @keyframes livePulse { 0%, 100% { box-shadow: 0 0 0 rgba(239,68,68,0); } 50% { box-shadow: 0 0 0 6px rgba(239,68,68,0.18); } }

        @media (max-width: 1280px) {
          .live-grid { grid-template-columns: 300px minmax(480px, 1fr) !important; }
          .live-chat { position: static !important; max-height: none !important; grid-column: 1 / -1; }
          .controls-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 920px) {
          .live-grid { grid-template-columns: 1fr !important; }
          .brief-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}