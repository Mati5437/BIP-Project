import { useEffect, useState } from 'react';
import { CheckCircle2, Loader2, Video, Users, PenLine } from 'lucide-react';
import careQuestIcon from '../assets/carequest-logo-icon.png';

interface JoiningScreenProps {
  onFinished: () => void;
}

export function JoiningScreen({ onFinished }: JoiningScreenProps) {
  const [step, setStep] = useState(0);

  const steps = [
    {
      icon: <Video size={18} />,
      text: 'Checking live lesson room'
    },
    {
      icon: <PenLine size={18} />,
      text: 'Preparing your whiteboard'
    },
    {
      icon: <Users size={18} />,
      text: 'Connecting to mentor and group'
    }
  ];

  useEffect(() => {
    const stepTimer = setInterval(() => {
      setStep((prev) => {
        if (prev < steps.length) {
          return prev + 1;
        }

        return prev;
      });
    }, 700);

    const finishTimer = setTimeout(() => {
      onFinished();
    }, 2800);

    return () => {
      clearInterval(stepTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinished, steps.length]);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #EBF8FF 0%, #E0F2FE 45%, #FFF7ED 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
        fontFamily: '"Plus Jakarta Sans", sans-serif'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '560px',
          background: 'white',
          borderRadius: '32px',
          padding: '44px',
          textAlign: 'center',
          boxShadow: '0 24px 70px rgba(15, 23, 42, 0.12)',
          border: '1px solid #E2E8F0',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: '170px',
            height: '170px',
            borderRadius: '50%',
            background: 'rgba(53, 220, 235, 0.18)',
            top: '-60px',
            right: '-60px'
          }}
        />

        <div
          style={{
            position: 'absolute',
            width: '130px',
            height: '130px',
            borderRadius: '50%',
            background: 'rgba(59, 130, 246, 0.14)',
            bottom: '-50px',
            left: '-40px'
          }}
        />

        <div
          style={{
            width: '110px',
            height: '110px',
            margin: '0 auto 24px',
            borderRadius: '30px',
            background: 'linear-gradient(135deg, #DDFBFF 0%, #EFF6FF 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'logoPulse 1.4s ease-in-out infinite',
            position: 'relative'
          }}
        >
          <img
            src={careQuestIcon}
            alt="CareQuest"
            style={{
              width: '78px',
              height: '78px',
              objectFit: 'contain'
            }}
          />
        </div>

        <h1
          style={{
            margin: '0 0 10px',
            fontSize: '32px',
            fontWeight: '900',
            color: '#1E293B'
          }}
        >
          Joining your live lesson...
        </h1>

        <p
          style={{
            margin: '0 0 30px',
            fontSize: '16px',
            color: '#64748B',
            lineHeight: 1.6
          }}
        >
          Please wait while we set up your session space.
        </p>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '8px',
            marginBottom: '30px'
          }}
        >
          {[0, 1, 2].map((dot) => (
            <span
              key={dot}
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: '#14B8A6',
                animation: `dotBounce 1s ease-in-out ${dot * 0.15}s infinite`
              }}
            />
          ))}
        </div>

        <div
          style={{
            background: '#F8FAFC',
            borderRadius: '22px',
            padding: '22px',
            marginBottom: '26px',
            border: '1px solid #E2E8F0',
            textAlign: 'left'
          }}
        >
          {steps.map((item, index) => {
            const completed = step > index;

            return (
              <div
                key={item.text}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 0',
                  color: completed ? '#0F766E' : '#64748B',
                  fontWeight: completed ? '800' : '700',
                  fontSize: '15px'
                }}
              >
                <div
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '12px',
                    background: completed ? '#CCFBF1' : '#E2E8F0',
                    color: completed ? '#0F766E' : '#94A3B8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  {completed ? <CheckCircle2 size={19} /> : item.icon}
                </div>

                <span style={{ flex: 1 }}>{item.text}</span>

                {!completed && index === step && (
                  <Loader2
                    size={18}
                    style={{
                      animation: 'spin 1s linear infinite',
                      color: '#3B82F6'
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>

        <div
          style={{
            height: '10px',
            background: '#E2E8F0',
            borderRadius: '999px',
            overflow: 'hidden'
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${Math.min((step / steps.length) * 100, 100)}%`,
              background: 'linear-gradient(90deg, #14B8A6 0%, #3B82F6 100%)',
              borderRadius: '999px',
              transition: 'width 0.4s ease'
            }}
          />
        </div>

        <style>
          {`
            @keyframes logoPulse {
              0%, 100% {
                transform: scale(1);
              }
              50% {
                transform: scale(1.08);
              }
            }

            @keyframes dotBounce {
              0%, 80%, 100% {
                transform: translateY(0);
                opacity: 0.4;
              }
              40% {
                transform: translateY(-8px);
                opacity: 1;
              }
            }

            @keyframes spin {
              from {
                transform: rotate(0deg);
              }
              to {
                transform: rotate(360deg);
              }
            }
          `}
        </style>
      </div>
    </div>
  );
}