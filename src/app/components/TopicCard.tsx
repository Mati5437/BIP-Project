interface TopicCardProps {
  icon: React.ReactNode;
  label: string;
  color: string;
  onClick: () => void;
}

export function TopicCard({ icon, label, color, onClick }: TopicCardProps) {
  return (
    <div 
      onClick={onClick} 
      style={{ 
        backgroundColor: color, 
        height: '160px', 
        borderRadius: '25px', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        border: '2px solid transparent'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)';
        e.currentTarget.style.borderColor = '#3B82F6';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.borderColor = 'transparent';
      }}
    >
      <div style={{ marginBottom: '15px', color: '#1E293B' }}>{icon}</div>
      <span style={{ fontWeight: 'bold', color: '#1E293B', fontSize: '15px' }}>{label}</span>
    </div>
  );
}
