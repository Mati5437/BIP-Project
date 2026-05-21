import { ShopItemType } from './mockDatabase';

export interface ShopItem {
  id: string;
  type: ShopItemType;
  title: string;
  description: string;
  icon: string; 
  price: number;
  isFree?: boolean;
}

export const SHOP_ITEMS: ShopItem[] = [
  {
    id: 'avatar-sunny',
    type: 'avatar',
    title: 'Sunny Avatar',
    description: 'A friendly default avatar for everyday learning.',
    icon: '😊',
    price: 0,
    isFree: true
  },
  {
    id: 'avatar-artist',
    type: 'avatar',
    title: 'Artist Avatar',
    description: 'Perfect for drawing, design and creative activities.',
    icon: '🎨',
    price: 90
  },
  {
    id: 'avatar-robot',
    type: 'avatar',
    title: 'Robot Avatar',
    description: 'A tech-style avatar for coding and problem-solving quests.',
    icon: '🤖',
    price: 120
  },
  {
    id: 'avatar-space',
    type: 'avatar',
    title: 'Space Avatar',
    description: 'For explorers, builders and big ideas.',
    icon: '🚀',
    price: 130
  },
  // ─── 新增 6 个专为住院青少年定制的头像（总计 10 个） ───
  {
    id: 'avatar-gamer',
    type: 'avatar',
    title: 'Neon Gamer',
    description: 'For the champions of digital worlds and esports battles.',
    icon: '🎮',
    price: 150
  },
  {
    id: 'avatar-dj',
    type: 'avatar',
    title: 'Cyber DJ',
    description: 'Turn up the volume! Mix beats and share your rhythm.',
    icon: '🎧',
    price: 140
  },
  {
    id: 'avatar-cat',
    type: 'avatar',
    title: 'Pixel Cat',
    description: 'A retro 8-bit companion full of curiosity and luck.',
    icon: '🐱',
    price: 110
  },
  {
    id: 'avatar-detective',
    type: 'avatar',
    title: 'Super Sleuth',
    description: 'Uncover mysteries, find hidden clues, and solve puzzles.',
    icon: '🔍',
    price: 160
  },
  {
    id: 'avatar-wizard',
    type: 'avatar',
    title: 'Magic Sorcerer',
    description: 'Weave spells of imagination, courage, and fantastic stories.',
    icon: '🔮',
    price: 180
  },
  {
    id: 'avatar-phoenix',
    type: 'avatar',
    title: 'Rising Phoenix',
    description: 'A symbol of strength, endless energy, and bright recovery.',
    icon: '🔥',
    price: 200
  },

  {
    id: 'none',
    type: 'frame',
    title: 'No Frame',
    description: 'Clean avatar without decoration.',
    icon: '⚪',
    price: 0,
    isFree: true
  },
  {
    id: 'frame-rainbow',
    type: 'frame',
    title: 'Rainbow Frame',
    description: 'Bring a bright splash of colors to your profile.',
    icon: '🌈',
    price: 100
  },
  {
    id: 'frame-gold',
    type: 'frame',
    title: 'Gold Frame',
    description: 'A shiny, premium border for top achievers.',
    icon: '🏆',
    price: 250
  },
  {
    id: 'frame-heart',
    type: 'frame',
    title: 'Heart Frame',
    description: 'Filled with warm energy, kindness, and love.',
    icon: '💖',
    price: 150
  }
];

export function getShopItemsByType(type: ShopItemType) {
  return SHOP_ITEMS.filter(item => item.type === type);
}