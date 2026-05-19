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
  // Content adapted to age group
  const getContentData = (): ContentData => {
    const baseContent = {
      business: {
        title: 'Business & Entrepreneurship',
        icon: <Briefcase size={40} />,
        color: '#EFF6FF'
      },
      design: {
        title: 'Graphics & Design',
        icon: <Palette size={40} />,
        color: '#F0FDF4'
      },
      coding: {
        title: 'Programming',
        icon: <Code size={40} />,
        color: '#FFF7ED'
      },
      marketing: {
        title: 'Digital Marketing',
        icon: <Megaphone size={40} />,
        color: '#FAF5FF'
      },
      finance: {
        title: 'Personal Finance',
        icon: <TrendingUp size={40} />,
        color: '#FEFCE8'
      }
    };

    const lessonsData: { [key: string]: ContentData } = {
      young: {
        business: {
          ...baseContent.business,
          lessons: [
            { name: 'What is Business?', status: 'Completed', time: '10 min' },
            { name: 'My First Business Idea', status: 'In Progress', time: '15 min' },
            { name: 'How to Sell Cookies', status: 'Locked', time: '12 min' }
          ],
          description: 'Learn business basics in a fun way! Discover how selling and making money works.'
        },
        design: {
          ...baseContent.design,
          lessons: [
            { name: 'Colors and Shapes', status: 'Completed', time: '8 min' },
            { name: 'Drawing My First Logo', status: 'Completed', time: '20 min' },
            { name: 'Creating a Poster', status: 'In Progress', time: '15 min' }
          ],
          description: 'Dive into the world of colors and creativity! Create beautiful drawings and design your own logo.'
        },
        coding: {
          ...baseContent.coding,
          lessons: [
            { name: 'What is Code?', status: 'In Progress', time: '12 min' },
            { name: 'My First Game', status: 'Locked', time: '30 min' },
            { name: 'Simple Animations', status: 'Locked', time: '20 min' }
          ],
          description: 'Learn programming basics through play! Create simple games and animations step by step.'
        },
        marketing: {
          ...baseContent.marketing,
          lessons: [
            { name: 'How to Convince Friends', status: 'Locked', time: '10 min' },
            { name: 'Creating a Simple Ad', status: 'In Progress', time: '15 min' },
            { name: 'Sale Poster', status: 'Locked', time: '18 min' }
          ],
          description: 'Learn how to share your ideas with others in creative ways!'
        },
        finance: {
          ...baseContent.finance,
          lessons: [
            { name: 'Piggy Bank - Saving', status: 'In Progress', time: '10 min' },
            { name: 'Counting My Money', status: 'Locked', time: '12 min' },
            { name: 'Smart Spending', status: 'Locked', time: '8 min' }
          ],
          description: 'Learn to save wisely and count money! Discover how piggy banks and budgets work.'
        }
      },
      teen: {
        business: {
          ...baseContent.business,
          lessons: [
            { name: 'How to Start a Business', status: 'Completed', time: '20 min' },
            { name: 'Defining Your Target Audience', status: 'In Progress', time: '30 min' },
            { name: 'Budgeting Basics', status: 'Locked', time: '25 min' }
          ],
          description: 'Learn how to turn your ideas into a real business. We cover everything from planning to launch.'
        },
        design: {
          ...baseContent.design,
          lessons: [
            { name: 'Introduction to Color Theory', status: 'Completed', time: '15 min' },
            { name: 'Designing Your First Logo', status: 'Completed', time: '45 min' },
            { name: 'Interface Basics', status: 'In Progress', time: '35 min' }
          ],
          description: 'Master the art of visual communication. Learn to create logos, websites, and beautiful interfaces.'
        },
        coding: {
          ...baseContent.coding,
          lessons: [
            { name: 'Python for Beginners', status: 'In Progress', time: '60 min' },
            { name: 'Building Simple Sites (HTML/CSS)', status: 'Locked', time: '90 min' },
            { name: 'Logic and Algorithms', status: 'Locked', time: '50 min' }
          ],
          description: 'Learn the language of the future. Write your first lines of code and build functional applications.'
        },
        marketing: {
          ...baseContent.marketing,
          lessons: [
            { name: 'Social Media Strategy', status: 'Locked', time: '40 min' },
            { name: 'The Power of Personal Branding', status: 'In Progress', time: '30 min' },
            { name: 'Introduction to Advertising', status: 'Locked', time: '55 min' }
          ],
          description: 'Discover how to share your ideas with the world. Learn branding, social media, and communication.'
        },
        finance: {
          ...baseContent.finance,
          lessons: [
            { name: 'Saving vs. Investing', status: 'In Progress', time: '35 min' },
            { name: 'Understanding Compound Interest', status: 'Locked', time: '25 min' },
            { name: 'Smart Financial Habits', status: 'Locked', time: '20 min' }
          ],
          description: 'Master your finances. Learn to save, invest, and make smart financial decisions.'
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
        <ArrowLeft size={20} /> Back to Dashboard
      </button>

      <div style={{ display: 'flex', gap: '40px' }}>
        {/* Left side: Topic description */}
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
            <h4 style={{ marginBottom: '15px', color: '#1E293B' }}>Topic Progress</h4>
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
              35% complete • 2 lessons to do
            </p>
          </div>
        </div>

        {/* Right side: Lesson list */}
        <div style={{ flex: 1.5 }}>
          <h3 style={{
            marginBottom: '20px',
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#1E293B'
          }}>
            Curriculum
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
                  {lesson.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
