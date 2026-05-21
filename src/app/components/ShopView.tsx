import { useState } from 'react';
import {
  ShoppingBag,
  Star,
  CheckCircle2,
  Smile,
  Sparkles,
  Palette,
  UserRound
} from 'lucide-react';
import {
  buyShopItem,
  equipShopItem,
  getMockUser,
  type ShopItemType
} from '../mock/mockDatabase';

interface ShopViewProps {
  username: string;
  ageGroup: string;
  onThemeChange?: () => void;
}

interface ShopItem {
  id: string;
  name: string;
  description: string;
  price: number;
  type: ShopItemType;
  emoji: string;
  color: string;
}
const themeMapping: Record<string, { main: string; background: string }> = {
  'default': { main: '#0A2E6E', background: '#F8FAFC' },
  'ocean-theme': { main: '#075985', background: '#F0F9FF' },
  'sunset-theme': { main: '#9D174D', background: '#FFF7ED' },
  'nature-theme': { main: '#065F46', background: '#F0FDF4' },
};
export function ShopView({ username, onThemeChange }: ShopViewProps) {
  const [userData, setUserData] = useState(() => getMockUser(username, 'child'));
  const [selectedCategory, setSelectedCategory] = useState<ShopItemType | 'all'>('all');

  const stars = userData?.careCoins ?? 240;
  const ownedItems = userData?.ownedItems ?? [];

  const equippedAvatar = userData?.equippedAvatar ?? 'avatar-sunny';
  const equippedBuddy = userData?.equippedBuddy ?? 'blue-buddy';
  const equippedTheme = userData?.equippedTheme ?? 'default';
  const equippedFrame = userData?.equippedFrame ?? 'none';
  const shopItems: ShopItem[] = [
    {
      id: 'avatar-sunny',
      name: 'Sunny Avatar',
      description: 'A friendly default avatar for everyday learning.',
      price: 0,
      type: 'avatar',
      emoji: '😊',
      color: '#FEF3C7'
    },
    {
      id: 'avatar-artist',
      name: 'Artist Avatar',
      description: 'Perfect for drawing, design and creative activities.',
      price: 90,
      type: 'avatar',
      emoji: '🎨',
      color: '#FCE7F3'
    },
    {
      id: 'avatar-robot',
      name: 'Robot Avatar',
      description: 'A tech-style avatar for coding and problem-solving quests.',
      price: 120,
      type: 'avatar',
      emoji: '🤖',
      color: '#EDE9FE'
    },
    {
      id: 'avatar-space',
      name: 'Space Avatar',
      description: 'For explorers, builders and big ideas.',
      price: 130,
      type: 'avatar',
      emoji: '🚀',
      color: '#DBEAFE'
    },

    {
      id: 'blue-buddy',
      name: 'Blue Buddy',
      description: 'A calm helper friend for your dashboard.',
      price: 0,
      type: 'buddy',
      emoji: '💙',
      color: '#DBEAFE'
    },
    {
      id: 'star-buddy',
      name: 'Star Buddy',
      description: 'A cheerful buddy that celebrates your progress.',
      price: 80,
      type: 'buddy',
      emoji: '⭐',
      color: '#FEF3C7'
    },
    {
      id: 'robot-buddy',
      name: 'Robot Buddy',
      description: 'A tiny tech friend for problem-solving.',
      price: 120,
      type: 'buddy',
      emoji: '🤖',
      color: '#EDE9FE'
    },

    {
      id: 'none',
      name: 'No Frame',
      description: 'Clean avatar without decoration.',
      price: 0,
      type: 'frame',
      emoji: '⚪',
      color: '#F8FAFC'
    },
    {
      id: 'rainbow-frame',
      name: 'Rainbow Frame',
      description: 'A colorful frame for creative days.',
      price: 100,
      type: 'frame',
      emoji: '🌈',
      color: '#FCE7F3'
    },
    {
      id: 'gold-frame',
      name: 'Gold Frame',
      description: 'A shiny frame for top achievements.',
      price: 150,
      type: 'frame',
      emoji: '🏆',
      color: '#FEF3C7'
    },
    {
      id: 'heart-frame',
      name: 'Heart Frame',
      description: 'A soft frame with kindness vibes.',
      price: 130,
      type: 'frame',
      emoji: '💗',
      color: '#FCE7F3'
    },

    {
      id: 'default',
      name: 'Default Theme',
      description: 'Original CareQuest colors.',
      price: 0,
      type: 'theme',
      emoji: '✨',
      color: '#F0FDFA'
    },
    {
      id: 'ocean-theme',
      name: 'Ocean Theme',
      description: 'Soft blue colors inspired by calm water.',
      price: 100,
      type: 'theme',
      emoji: '🌊',
      color: '#E0F2FE'
    },
    {
      id: 'sunset-theme',
      name: 'Sunset Theme',
      description: 'Warm and cozy pastel colors.',
      price: 100,
      type: 'theme',
      emoji: '🌅',
      color: '#FFEDD5'
    },
    {
      id: 'nature-theme',
      name: 'Nature Theme',
      description: 'Fresh green accents and a calm nature look.',
      price: 100,
      type: 'theme',
      emoji: '🌿',
      color: '#DCFCE7'
    }
  ];

  const filteredItems =
    selectedCategory === 'all'
      ? shopItems
      : shopItems.filter((item) => item.type === selectedCategory);

  const isOwned = (item: ShopItem) => {
    return item.price === 0 || ownedItems.includes(item.id);
  };

  const isEquipped = (item: ShopItem) => {
    if (item.type === 'avatar') return equippedAvatar === item.id;
    if (item.type === 'buddy') return equippedBuddy === item.id;
    if (item.type === 'theme') return equippedTheme === item.id;
    if (item.type === 'frame') return equippedFrame === item.id;
    return false;
  };

  const handleItemClick = (item: ShopItem) => {
  let updatedData;

  if (!isOwned(item)) {
    // 1. Kupowanie
    const updatedAfterBuy = buyShopItem(username, item.id, item.price);
    
    // 2. Jeśli kupno się udało (lub było darmowe), od razu zakładamy
      if ((updatedAfterBuy.ownedItems ?? []).includes(item.id)) {
        updatedData = equipShopItem(username, {
          id: item.id,
          type: item.type
       });
     } else {
        updatedData = updatedAfterBuy;
     }
    } else {
     // 3. Zakładanie przedmiotu, który już mamy
     updatedData = equipShopItem(username, {
       id: item.id,
       type: item.type
     });
    }

    setUserData(updatedData);
    // Ten props wysyła sygnał do App.tsx, żeby odświeżył Buddy'ego
    onThemeChange?.(); 
  };

  const getCategoryIcon = (type: ShopItemType | 'all') => {
    if (type === 'avatar') return <UserRound size={18} />;
    if (type === 'buddy') return <Smile size={18} />;
    if (type === 'theme') return <Palette size={18} />;
    if (type === 'frame') return <Sparkles size={18} />;
    return <ShoppingBag size={18} />;
  };

  const getFrameStyle = () => {
    if (equippedFrame === 'rainbow-frame') {
      return '5px solid #FF6B9D';
    }

    if (equippedFrame === 'gold-frame') {
      return '5px solid #F59E0B';
    }

    if (equippedFrame === 'heart-frame') {
      return '5px solid #EC4899';
    }

    return '5px solid #E2E8F0';
  };

  const getThemeBackground = () => {
    if (equippedTheme === 'ocean-theme') {
      return 'linear-gradient(135deg, #E0F7FA 0%, #DBEAFE 45%, #F0FDFA 100%)';
    }

    if (equippedTheme === 'sunset-theme') {
      return 'linear-gradient(135deg, #FFF7ED 0%, #FFE4E6 50%, #FEF3C7 100%)';
    }

    if (equippedTheme === 'nature-theme') {
      return 'linear-gradient(135deg, #ECFDF5 0%, #DCFCE7 50%, #F0FDFA 100%)';
    }

    return 'linear-gradient(135deg, #EBF8FF 0%, #F0F9FF 100%)';
  };

  const currentAvatar = shopItems.find((item) => item.id === equippedAvatar);
  const currentBuddy = shopItems.find((item) => item.id === equippedBuddy);
  const currentTheme = shopItems.find((item) => item.id === equippedTheme);
  const currentFrame = shopItems.find((item) => item.id === equippedFrame);
  return (
    <div
      style={{
        padding: '40px',
        maxWidth: '1400px',
        margin: '0 auto'
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.5fr 1fr',
          gap: '24px',
          marginBottom: '32px'
        }}
      >
        <div
          style={{
            background: 'linear-gradient(135deg, #0A2E6E 0%, #14B8A6 100%)',
            borderRadius: '28px',
            padding: '34px',
            color: 'white',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div
            style={{
              position: 'absolute',
              right: '-60px',
              top: '-60px',
              width: '220px',
              height: '220px',
              background: 'rgba(255,255,255,0.12)',
              borderRadius: '50%'
            }}
          />

          <ShoppingBag size={38} />

          <h1
            style={{
              margin: '16px 0 10px',
              fontSize: '34px',
              fontWeight: '900',
              position: 'relative'
            }}
          >
            CareQuest Shop
          </h1>

          <p
            style={{
              margin: 0,
              maxWidth: '620px',
              lineHeight: 1.6,
              opacity: 0.92,
              fontSize: '16px',
              position: 'relative'
            }}
          >
            Spend Stars on avatars, frames, buddies and calm visual themes.
          </p>
        </div>

        <div
          style={{
            background: 'white',
            borderRadius: '28px',
            padding: '28px',
            boxShadow: '0 6px 20px rgba(15, 23, 42, 0.06)',
            border: '1px solid #E2E8F0'
          }}
        >
          <p
            style={{
              margin: '0 0 8px 0',
              fontSize: '14px',
              color: '#64748B',
              fontWeight: '800'
            }}
          >
            Your balance
          </p>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '20px'
            }}
          >
            <div
              style={{
                width: '58px',
                height: '58px',
                borderRadius: '18px',
                background: 'linear-gradient(135deg, #FFF7ED 0%, #FEF3C7 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#F59E0B'
              }}
            >
              <Star size={32} fill="#F59E0B" />
            </div>

            <div>
              <div
                style={{
                  fontSize: '34px',
                  fontWeight: '900',
                  color: '#F59E0B'
                }}
              >
                {stars}
              </div>

              <div
                style={{
                  fontSize: '13px',
                  color: '#64748B',
                  fontWeight: '700'
                }}
              >
                Stars
              </div>
            </div>
          </div>

          <div
            style={{
              background: getThemeBackground(),
              borderRadius: '20px',
              padding: '18px',
              border: '1px solid #E2E8F0',
              display: 'flex',
              gap: '16px',
              alignItems: 'center'
            }}
          >
            <div
              style={{
                width: '78px',
                height: '78px',
                borderRadius: '50%',
                border: getFrameStyle(),
                background: currentAvatar?.color ?? '#FEF3C7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '38px',
                flexShrink: 0,
                boxShadow: '0 8px 20px rgba(15, 23, 42, 0.12)',
                transition: 'all 0.3s ease'
              }}
            >
              {currentAvatar?.emoji ?? '😊'}
            </div>

            <div>
              <p
                style={{
                  margin: 0,
                  fontSize: '14px',
                  color: '#64748B',
                  fontWeight: '800'
                }}
              >
                Equipped look
              </p>

              <p
                style={{
                  margin: '5px 0 0',
                  fontSize: '14px',
                  color: '#1E293B'
                }}
              >
                Avatar: <strong>{currentAvatar?.name ?? equippedAvatar}</strong>
              </p>

              <p
                style={{
                  margin: '5px 0 0',
                  fontSize: '14px',
                  color: '#1E293B'
                }}
              >
                Frame: <strong>{currentFrame?.name ?? equippedFrame}</strong>
              </p>

              <p
                style={{
                  margin: '5px 0 0',
                  fontSize: '14px',
                  color: '#1E293B'
                }}
              >
                Buddy: <strong>{currentBuddy?.name ?? equippedBuddy}</strong>
              </p>

              <p
                style={{
                  margin: '5px 0 0',
                  fontSize: '14px',
                  color: '#1E293B'
                }}
              >
                Theme: <strong>{currentTheme?.name ?? equippedTheme}</strong>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          gap: '12px',
          flexWrap: 'wrap',
          marginBottom: '26px'
        }}
      >
        {(['all', 'avatar', 'frame', 'buddy', 'theme'] as Array<ShopItemType | 'all'>).map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            style={{
              border: 'none',
              borderRadius: '14px',
              padding: '12px 18px',
              background:
                selectedCategory === category
                  ? 'linear-gradient(135deg, #14B8A6 0%, #06B6D4 100%)'
                  : 'white',
              color: selectedCategory === category ? 'white' : '#64748B',
              fontWeight: '900',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 12px rgba(15, 23, 42, 0.06)',
              textTransform: 'capitalize'
            }}
          >
            {getCategoryIcon(category)}
            {category === 'all' ? 'All items' : category}
          </button>
        ))}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '20px'
        }}
      >
        {filteredItems.map((item) => {
          const owned = isOwned(item);
          const equipped = isEquipped(item);
          const canAfford = stars >= item.price;

          return (
            <div
              key={item.id}
              style={{
                background: 'white',
                borderRadius: '24px',
                padding: '24px',
                boxShadow: '0 6px 20px rgba(15, 23, 42, 0.06)',
                border: equipped ? '3px solid #14B8A6' : '1px solid #E2E8F0',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.25s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 10px 28px rgba(15, 23, 42, 0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(15, 23, 42, 0.06)';
              }}
            >
              {equipped && (
                <div
                  style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    background: '#DCFCE7',
                    color: '#15803D',
                    borderRadius: '999px',
                    padding: '6px 10px',
                    fontSize: '12px',
                    fontWeight: '900',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}
                >
                  <CheckCircle2 size={14} />
                  Equipped
                </div>
              )}

              <div
                style={{
                  width: '86px',
                  height: '86px',
                  borderRadius: item.type === 'avatar' ? '50%' : '24px',
                  border: item.type === 'avatar' ? '4px solid #E2E8F0' : 'none',
                  background: item.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '44px',
                  marginBottom: '18px'
                }}
              >
                {item.emoji}
              </div>

              <p
                style={{
                  margin: '0 0 8px',
                  fontSize: '13px',
                  color: '#64748B',
                  fontWeight: '900',
                  textTransform: 'capitalize',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                {getCategoryIcon(item.type)}
                {item.type}
              </p>

              <h3
                style={{
                  fontSize: '18px',
                  fontWeight: '900',
                  color: '#1E293B',
                  margin: '0 0 8px'
                }}
              >
                {item.name}
              </h3>

              <p
                style={{
                  fontSize: '14px',
                  color: '#64748B',
                  lineHeight: 1.5,
                  minHeight: '42px',
                  marginBottom: '18px'
                }}
              >
                {item.description}
              </p>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: item.price === 0 ? '#10B981' : '#F59E0B',
                    fontWeight: '900'
                  }}
                >
                  <Star size={18} fill={item.price === 0 ? '#10B981' : '#F59E0B'} />
                  {item.price === 0 ? 'Free' : item.price}
                </div>

                <button
                  onClick={() => handleItemClick(item)}
                  disabled={!owned && !canAfford}
                  style={{
                    border: 'none',
                    borderRadius: '14px',
                    padding: '12px 16px',
                    fontSize: '14px',
                    fontWeight: '900',
                    cursor: !owned && !canAfford ? 'not-allowed' : 'pointer',
                    background: equipped
                      ? '#DCFCE7'
                      : !owned && !canAfford
                        ? '#E2E8F0'
                        : 'linear-gradient(135deg, #14B8A6 0%, #06B6D4 100%)',
                    color: equipped
                      ? '#15803D'
                      : !owned && !canAfford
                        ? '#94A3B8'
                        : 'white'
                  }}
                >
                  {equipped
                    ? 'Equipped'
                    : owned
                      ? 'Equip'
                      : canAfford
                        ? 'Buy'
                        : 'Not enough'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}