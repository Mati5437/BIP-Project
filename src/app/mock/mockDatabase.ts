export type AgeGroup = 'young' | 'teen' | 'advanced';
export type EnergyLevel = 'high' | 'medium' | 'low';
export type ShopItemType = 'avatar' | 'buddy' | 'theme' | 'frame';

export interface MockUserData {
  username: string;
  role: string;
  ageGroup?: AgeGroup;
  energyLevel?: EnergyLevel;
  energyPopupCompleted?: boolean;

  careCoins?: number;
  ownedItems?: string[];
  equippedAvatar?: string;
  equippedBuddy?: string;
  equippedTheme?: string;
  equippedFrame?: string;

  createdAt: string;
  updatedAt: string;
}

interface MockDatabase {
  users: Record<string, MockUserData>;
}

const STORAGE_KEY = 'carequest_mock_database_v1';

const DEFAULT_CARE_COINS = 240;
const DEFAULT_AVATAR = 'avatar-sunny';
const DEFAULT_BUDDY = 'blue-buddy';
const DEFAULT_THEME = 'default';
const DEFAULT_FRAME = 'none';

function getUserKey(username: string, role: string) {
  return `${role}:${username.trim().toLowerCase()}`;
}

function getEmptyDatabase(): MockDatabase {
  return {
    users: {}
  };
}

function applyUserDefaults(user: MockUserData): MockUserData {
  return {
    ...user,
    careCoins: user.careCoins ?? DEFAULT_CARE_COINS,
    ownedItems: user.ownedItems ?? [DEFAULT_AVATAR, DEFAULT_BUDDY, DEFAULT_THEME, DEFAULT_FRAME],
    equippedAvatar: user.equippedAvatar ?? DEFAULT_AVATAR,
    equippedBuddy: user.equippedBuddy ?? DEFAULT_BUDDY,
    equippedTheme: user.equippedTheme ?? DEFAULT_THEME,
    equippedFrame: user.equippedFrame ?? DEFAULT_FRAME
  };
}

export function readMockDatabase(): MockDatabase {
  if (typeof window === 'undefined') {
    return getEmptyDatabase();
  }

  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return getEmptyDatabase();
  }

  try {
    return JSON.parse(raw) as MockDatabase;
  } catch {
    return getEmptyDatabase();
  }
}

export function saveMockDatabase(database: MockDatabase) {
  if (typeof window === 'undefined') {
    return;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(database, null, 2));
}

export function getMockUser(username: string, role: string): MockUserData | null {
  const database = readMockDatabase();
  const key = getUserKey(username, role);
  const user = database.users[key];

  if (!user) {
    return null;
  }

  return applyUserDefaults(user);
}

export function saveMockUser(
  username: string,
  role: string,
  data: Partial<MockUserData>
): MockUserData {
  const database = readMockDatabase();
  const key = getUserKey(username, role);
  const now = new Date().toISOString();

  const existingUser = database.users[key];

  const updatedUser: MockUserData = applyUserDefaults({
    ...(existingUser ?? {}),
    ...data,
    username,
    role,
    createdAt: existingUser?.createdAt ?? now,
    updatedAt: now
  });

  database.users[key] = updatedUser;
  saveMockDatabase(database);

  return updatedUser;
}

export function saveAgeGroup(username: string, ageGroup: AgeGroup) {
  return saveMockUser(username, 'child', {
    ageGroup
  });
}

export function saveEnergyLevel(username: string, energyLevel: EnergyLevel) {
  return saveMockUser(username, 'child', {
    energyLevel,
    energyPopupCompleted: true
  });
}

export function buyShopItem(
  username: string,
  itemId: string,
  price: number
): MockUserData {
  const user = getMockUser(username, 'child') ?? saveMockUser(username, 'child', {});

  const currentCoins = user.careCoins ?? DEFAULT_CARE_COINS;
  const ownedItems = user.ownedItems ?? [DEFAULT_AVATAR, DEFAULT_BUDDY, DEFAULT_THEME, DEFAULT_FRAME];

  if (ownedItems.includes(itemId)) {
    return user;
  }

  if (currentCoins < price) {
    return user;
  }

  return saveMockUser(username, 'child', {
    careCoins: currentCoins - price,
    ownedItems: [...ownedItems, itemId]
  });
}

export function equipShopItem(
  username: string,
  item: {
    id: string;
    type: ShopItemType;
  }
): MockUserData {
  const user = getMockUser(username, 'child') ?? saveMockUser(username, 'child', {});
  const ownedItems = user.ownedItems ?? [DEFAULT_AVATAR, DEFAULT_BUDDY, DEFAULT_THEME, DEFAULT_FRAME];

  const isDefaultItem =
    item.id === DEFAULT_AVATAR ||
    item.id === DEFAULT_BUDDY ||
    item.id === DEFAULT_THEME ||
    item.id === DEFAULT_FRAME;

  if (!ownedItems.includes(item.id) && !isDefaultItem) {
    return user;
  }

  const updates: Partial<MockUserData> = {};

  if (item.type === 'avatar') {
    updates.equippedAvatar = item.id;
  }

  if (item.type === 'buddy') {
    updates.equippedBuddy = item.id;
  }

  if (item.type === 'theme') {
    updates.equippedTheme = item.id;
  }

  if (item.type === 'frame') {
    updates.equippedFrame = item.id;
  }

  return saveMockUser(username, 'child', updates);
}

export function addCareCoins(username: string, amount: number): MockUserData {
  const user = getMockUser(username, 'child') ?? saveMockUser(username, 'child', {});
  const currentCoins = user.careCoins ?? DEFAULT_CARE_COINS;

  return saveMockUser(username, 'child', {
    careCoins: currentCoins + amount
  });
}

export function clearMockDatabase() {
  if (typeof window === 'undefined') {
    return;
  }

  localStorage.removeItem(STORAGE_KEY);
}