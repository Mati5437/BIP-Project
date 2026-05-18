import { ArrowLeft, Briefcase, Palette, Code, Megaphone, TrendingUp, Play, CheckCircle } from 'lucide-react';

interface LearningMockupProps {
  topic: string;
  ageGroup: string;
  onBack: () => void;
}

interface ContentData {
  [key: string]: {
    title: string;
    icon: React.ReactNode;
    color: string;
    lessons: Array<{
      name: string;
      status: 'Completed' | 'In Progress' | 'Locked';
      time: string;
    }>;
    description: string;
  };
}

export function LearningMockup({ topic, ageGroup, onBack }: LearningMockupProps) {
  // Dane dostosowane do grupy wiekowej
  const getContentData = (): ContentData => {
    const baseContent = {
      business: {
        title: 'Biznes i Przedsiębiorczość',
        icon: <Briefcase size={40} />,
        color: '#EFF6FF'
      },
      design: {
        title: 'Grafika i Projektowanie',
        icon: <Palette size={40} />,
        color: '#F0FDF4'
      },
      coding: {
        title: 'Programowanie',
        icon: <Code size={40} />,
        color: '#FFF7ED'
      },
      marketing: {
        title: 'Marketing Cyfrowy',
        icon: <Megaphone size={40} />,
        color: '#FAF5FF'
      },
      finance: {
        title: 'Finanse Osobiste',
        icon: <TrendingUp size={40} />,
        color: '#FEFCE8'
      }
    };

    const lessonsData: { [key: string]: ContentData } = {
      young: {
        business: {
          ...baseContent.business,
          lessons: [
            { name: 'Co to jest biznes?', status: 'Completed', time: '10 min' },
            { name: 'Mój pierwszy pomysł na firmę', status: 'In Progress', time: '15 min' },
            { name: 'Jak sprzedawać ciasteczka', status: 'Locked', time: '12 min' }
          ],
          description: 'Naucz się podstaw biznesu w zabawny sposób! Odkryj jak działa sprzedaż i zarabianie pieniędzy.'
        },
        design: {
          ...baseContent.design,
          lessons: [
            { name: 'Kolory i kształty', status: 'Completed', time: '8 min' },
            { name: 'Rysuję swoje pierwsze logo', status: 'Completed', time: '20 min' },
            { name: 'Tworzę plakat', status: 'In Progress', time: '15 min' }
          ],
          description: 'Zanurz się w świecie kolorów i kreatywności! Stwórz piękne rysunki i projektuj własne logo.'
        },
        coding: {
          ...baseContent.coding,
          lessons: [
            { name: 'Co to jest kod?', status: 'In Progress', time: '12 min' },
            { name: 'Moja pierwsza gra', status: 'Locked', time: '30 min' },
            { name: 'Proste animacje', status: 'Locked', time: '20 min' }
          ],
          description: 'Poznaj podstawy programowania przez zabawę! Twórz proste gry i animacje krok po kroku.'
        },
        marketing: {
          ...baseContent.marketing,
          lessons: [
            { name: 'Jak przekonać kolegów', status: 'Locked', time: '10 min' },
            { name: 'Tworzę prostą reklamę', status: 'In Progress', time: '15 min' },
            { name: 'Plakat na wyprzedaż', status: 'Locked', time: '18 min' }
          ],
          description: 'Dowiedz się jak dzielić się swoimi pomysłami z innymi w kreatywny sposób!'
        },
        finance: {
          ...baseContent.finance,
          lessons: [
            { name: 'Skarbonka - oszczędzanie', status: 'In Progress', time: '10 min' },
            { name: 'Liczę moje pieniądze', status: 'Locked', time: '12 min' },
            { name: 'Mądre wydawanie', status: 'Locked', time: '8 min' }
          ],
          description: 'Naucz się mądrze oszczędzać i liczyć pieniądze! Poznaj jak działa skarbonka i budżet.'
        }
      },
      teen: {
        business: {
          ...baseContent.business,
          lessons: [
            { name: 'Jak rozpocząć biznes', status: 'Completed', time: '20 min' },
            { name: 'Określanie grupy docelowej', status: 'In Progress', time: '30 min' },
            { name: 'Podstawy budżetowania', status: 'Locked', time: '25 min' }
          ],
          description: 'Naucz się jak przekuć swoje pomysły w prawdziwy biznes. Pokrywamy wszystko od planowania po uruchomienie.'
        },
        design: {
          ...baseContent.design,
          lessons: [
            { name: 'Wprowadzenie do teorii kolorów', status: 'Completed', time: '15 min' },
            { name: 'Projektowanie pierwszego logo', status: 'Completed', time: '45 min' },
            { name: 'Podstawy interfejsów', status: 'In Progress', time: '35 min' }
          ],
          description: 'Opanuj sztukę komunikacji wizualnej. Naucz się tworzyć logo, strony internetowe i piękne interfejsy.'
        },
        coding: {
          ...baseContent.coding,
          lessons: [
            { name: 'Python dla początkujących', status: 'In Progress', time: '60 min' },
            { name: 'Tworzenie prostych stron (HTML/CSS)', status: 'Locked', time: '90 min' },
            { name: 'Logika i algorytmy', status: 'Locked', time: '50 min' }
          ],
          description: 'Naucz się języka przyszłości. Napisz swoje pierwsze linie kodu i zbuduj funkcjonalne aplikacje.'
        },
        marketing: {
          ...baseContent.marketing,
          lessons: [
            { name: 'Strategia mediów społecznościowych', status: 'Locked', time: '40 min' },
            { name: 'Siła personal brandingu', status: 'In Progress', time: '30 min' },
            { name: 'Wprowadzenie do reklam', status: 'Locked', time: '55 min' }
          ],
          description: 'Odkryj jak dzielić się swoimi pomysłami ze światem. Poznaj branding, media społecznościowe i komunikację.'
        },
        finance: {
          ...baseContent.finance,
          lessons: [
            { name: 'Oszczędzanie vs. Inwestowanie', status: 'In Progress', time: '35 min' },
            { name: 'Rozumienie procentu składanego', status: 'Locked', time: '25 min' },
            { name: 'Mądre nawyki finansowe', status: 'Locked', time: '20 min' }
          ],
          description: 'Opanuj swoje finanse. Naucz się oszczędzać, inwestować i podejmować mądre decyzje finansowe.'
        }
      },
      advanced: {
        business: {
          ...baseContent.business,
          lessons: [
            { name: 'Advanced Business Strategy', status: 'Completed', time: '45 min' },
            { name: 'Market Analysis & Competition', status: 'In Progress', time: '60 min' },
            { name: 'Startup Funding & Pitching', status: 'Locked', time: '75 min' }
          ],
          description: 'Master entrepreneurship with real-world case studies and advanced business models. Prepare for actual startup challenges.'
        },
        design: {
          ...baseContent.design,
          lessons: [
            { name: 'Advanced UX/UI Principles', status: 'Completed', time: '50 min' },
            { name: 'Design Systems & Brand Identity', status: 'Completed', time: '90 min' },
            { name: 'Professional Portfolio Development', status: 'In Progress', time: '120 min' }
          ],
          description: 'Professional design training covering industry-standard tools, advanced theory, and portfolio building.'
        },
        coding: {
          ...baseContent.coding,
          lessons: [
            { name: 'Advanced JavaScript & React', status: 'In Progress', time: '120 min' },
            { name: 'Backend Development (Node.js)', status: 'Locked', time: '150 min' },
            { name: 'Data Structures & Algorithms', status: 'Locked', time: '90 min' }
          ],
          description: 'Professional coding curriculum preparing you for real development roles and technical interviews.'
        },
        marketing: {
          ...baseContent.marketing,
          lessons: [
            { name: 'Digital Marketing Analytics', status: 'Locked', time: '70 min' },
            { name: 'Growth Hacking Strategies', status: 'In Progress', time: '60 min' },
            { name: 'Advanced Social Media Management', status: 'Locked', time: '80 min' }
          ],
          description: 'Learn professional marketing strategies used by top companies. Master analytics, SEO, and growth techniques.'
        },
        finance: {
          ...baseContent.finance,
          lessons: [
            { name: 'Investment Portfolio Management', status: 'In Progress', time: '60 min' },
            { name: 'Cryptocurrency & Blockchain Basics', status: 'Locked', time: '50 min' },
            { name: 'Tax Planning & Financial Strategy', status: 'Locked', time: '45 min' }
          ],
          description: 'Advanced financial literacy covering investments, portfolio management, and professional financial planning.'
        }
      }
    };

    return lessonsData[ageGroup] || lessonsData.teen;
  };

  const contentData = getContentData();
  const current = contentData[topic] || contentData.design;

  return (
    <div style={{ animation: 'fadeIn 0.5s ease' }}>
      <button 
        onClick={onBack} 
        style={{ 
          border: 'none', 
          background: 'none', 
          color: '#1D4ED8', 
          fontWeight: 'bold', 
          cursor: 'pointer', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px', 
          marginBottom: '30px',
          fontSize: '15px'
        }}
      >
        <ArrowLeft size={20} /> Powrót do kokpitu
      </button>

      <div style={{ display: 'flex', gap: '40px' }}>
        {/* Lewa strona: Opis tematu */}
        <div style={{ flex: 1 }}>
          <div style={{ 
            backgroundColor: current.color, 
            width: '80px', 
            height: '80px', 
            borderRadius: '20px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            marginBottom: '20px' 
          }}>
            {current.icon}
          </div>
          <h2 style={{ 
            fontSize: '36px', 
            fontWeight: '900', 
            color: '#0A2E6E', 
            marginBottom: '15px' 
          }}>
            {current.title}
          </h2>
          <p style={{ 
            fontSize: '18px', 
            color: '#64748B', 
            lineHeight: '1.6', 
            marginBottom: '30px' 
          }}>
            {current.description}
          </p>
          
          <div style={{ 
            backgroundColor: 'white', 
            padding: '25px', 
            borderRadius: '25px', 
            boxShadow: '0 10px 30px rgba(0,0,0,0.05)' 
          }}>
            <h4 style={{ marginBottom: '15px', color: '#1E293B' }}>Postęp w temacie</h4>
            <div style={{ 
              width: '100%', 
              height: '10px', 
              backgroundColor: '#F1F5F9', 
              borderRadius: '10px', 
              overflow: 'hidden' 
            }}>
              <div style={{ 
                width: '35%', 
                height: '100%', 
                backgroundColor: '#3B82F6', 
                borderRadius: '10px',
                transition: 'width 1s ease-in-out'
              }}></div>
            </div>
            <p style={{ 
              fontSize: '14px', 
              marginTop: '10px', 
              color: '#64748B' 
            }}>
              35% ukończone • 2 lekcje do zrobienia
            </p>
          </div>
        </div>

        {/* Prawa strona: Lista lekcji */}
        <div style={{ flex: 1.5 }}>
          <h3 style={{ 
            marginBottom: '20px', 
            fontSize: '20px', 
            fontWeight: 'bold',
            color: '#1E293B'
          }}>
            Program nauczania
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {current.lessons.map((lesson, i) => (
              <div 
                key={i} 
                style={{ 
                  backgroundColor: 'white', 
                  padding: '20px 30px', 
                  borderRadius: '20px', 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.02)',
                  border: '1px solid #F1F5F9',
                  opacity: lesson.status === 'Locked' ? 0.6 : 1,
                  cursor: lesson.status !== 'Locked' ? 'pointer' : 'default',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  if (lesson.status !== 'Locked') {
                    e.currentTarget.style.transform = 'translateX(5px)';
                    e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.1)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateX(0)';
                  e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.02)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <div style={{ 
                    color: lesson.status === 'Completed' ? '#10B981' : '#64748B' 
                  }}>
                    {lesson.status === 'Completed' ? (
                      <CheckCircle size={24} />
                    ) : (
                      <Play size={24} />
                    )}
                  </div>
                  <div>
                    <h5 style={{ margin: 0, fontSize: '16px', color: '#1E293B' }}>
                      {lesson.name}
                    </h5>
                    <span style={{ fontSize: '12px', color: '#94A3B8' }}>
                      {lesson.time}
                    </span>
                  </div>
                </div>
                <div style={{ 
                  fontSize: '12px', 
                  fontWeight: 'bold', 
                  padding: '5px 12px', 
                  borderRadius: '10px',
                  backgroundColor: 
                    lesson.status === 'Completed' ? '#DCFCE7' : 
                    lesson.status === 'Locked' ? '#F1F5F9' : '#DBEAFE',
                  color: 
                    lesson.status === 'Completed' ? '#166534' : 
                    lesson.status === 'Locked' ? '#94A3B8' : '#1E40AF'
                }}>
                  {lesson.status === 'Completed' ? 'Ukończono' : 
                   lesson.status === 'Locked' ? 'Zablokowano' : 'W trakcie'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
