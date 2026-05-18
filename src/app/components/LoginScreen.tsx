import { useState } from 'react';
import { User, LogIn } from 'lucide-react';

interface LoginScreenProps {
  onLogin: (username: string) => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onLogin(username.trim());
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: '"Plus Jakarta Sans", sans-serif'
    }}>
      <div style={{ 
        backgroundColor: 'white', 
        padding: '60px 50px', 
        borderRadius: '30px', 
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        maxWidth: '450px',
        width: '100%',
        textAlign: 'center'
      }}>
        <div style={{ 
          width: '80px', 
          height: '80px', 
          backgroundColor: '#0A2E6E', 
          borderRadius: '20px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          margin: '0 auto 25px',
          color: 'white',
          fontSize: '32px',
          fontWeight: 'bold'
        }}>
          C
        </div>
        
        <h1 style={{ 
          fontSize: '32px', 
          fontWeight: 'bold', 
          color: '#0A2E6E', 
          marginBottom: '10px' 
        }}>
          Witaj w CareQuest
        </h1>
        
        <p style={{ 
          color: '#64748B', 
          marginBottom: '40px',
          fontSize: '16px'
        }}>
          Zaloguj się, aby rozpocząć swoją przygodę edukacyjną
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ 
            position: 'relative', 
            marginBottom: '25px' 
          }}>
            <User 
              style={{ 
                position: 'absolute', 
                left: '20px', 
                top: '50%', 
                transform: 'translateY(-50%)', 
                color: '#94A3B8' 
              }} 
              size={20} 
            />
            <input
              type="text"
              placeholder="Wpisz swoje imię"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: '100%',
                padding: '18px 18px 18px 55px',
                borderRadius: '15px',
                border: '2px solid #E2E8F0',
                fontSize: '16px',
                outline: 'none',
                transition: 'border-color 0.3s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#3B82F6'}
              onBlur={(e) => e.target.style.borderColor = '#E2E8F0'}
            />
          </div>

          <button
            type="submit"
            disabled={!username.trim()}
            style={{
              width: '100%',
              padding: '18px',
              backgroundColor: username.trim() ? '#3B82F6' : '#CBD5E1',
              color: 'white',
              border: 'none',
              borderRadius: '15px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: username.trim() ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
              if (username.trim()) {
                e.currentTarget.style.backgroundColor = '#2563EB';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 10px 20px rgba(59, 130, 246, 0.3)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = username.trim() ? '#3B82F6' : '#CBD5E1';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <LogIn size={20} />
            Zaloguj się
          </button>
        </form>

        <p style={{ 
          marginTop: '30px', 
          color: '#94A3B8', 
          fontSize: '14px' 
        }}>
          Twoje dane są bezpieczne 🔒
        </p>
      </div>
    </div>
  );
}
