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

  enrolledSessionIds?: string[];

  createdAt: string;
  updatedAt: string;
}

interface MockDatabase {
  users: Record<string, MockUserData>;
}

const STORAGE_KEY = 'carequest_mock_database_v1';

const DEFAULT_CARE_COINS = 900;
const DEFAULT_AVATAR = 'avatar-sunny';
const DEFAULT_BUDDY = 'blue-buddy';
const DEFAULT_THEME = 'default';
const DEFAULT_FRAME = 'none';

const DEFAULT_OWNED_ITEMS = [
  DEFAULT_AVATAR,
  DEFAULT_BUDDY,
  DEFAULT_THEME,
  DEFAULT_FRAME
];

function normalizeShopItemId(id?: string) {
  if (!id) return id;

  const legacyMap: Record<string, string> = {
    'rainbow-frame': 'frame-rainbow',
    'gold-frame': 'frame-gold',
    'heart-frame': 'frame-heart'
  };

  return legacyMap[id] ?? id;
}

function normalizeOwnedItems(items?: string[]) {
  return Array.from(
    new Set([...(items ?? DEFAULT_OWNED_ITEMS), ...DEFAULT_OWNED_ITEMS].map((item) => normalizeShopItemId(item) ?? item))
  );
}

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
    ownedItems: normalizeOwnedItems(user.ownedItems),
    equippedAvatar: normalizeShopItemId(user.equippedAvatar) ?? DEFAULT_AVATAR,
    equippedBuddy: normalizeShopItemId(user.equippedBuddy) ?? DEFAULT_BUDDY,
    equippedTheme: normalizeShopItemId(user.equippedTheme) ?? DEFAULT_THEME,
    equippedFrame: normalizeShopItemId(user.equippedFrame) ?? DEFAULT_FRAME,
    enrolledSessionIds: user.enrolledSessionIds ?? []
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
    const parsed = JSON.parse(raw) as MockDatabase;

    if (!parsed.users) {
      return getEmptyDatabase();
    }

    return parsed;
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

export function getLatestMockUser(role = 'child'): MockUserData | null {
  const database = readMockDatabase();
  const users = Object.values(database.users)
    .filter((user) => user.role === role)
    .map(applyUserDefaults)
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

  return users[0] ?? null;
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

  const normalizedData: Partial<MockUserData> = {
    ...data,
    ownedItems: data.ownedItems ? normalizeOwnedItems(data.ownedItems) : undefined,
    equippedAvatar: normalizeShopItemId(data.equippedAvatar),
    equippedBuddy: normalizeShopItemId(data.equippedBuddy),
    equippedTheme: normalizeShopItemId(data.equippedTheme),
    equippedFrame: normalizeShopItemId(data.equippedFrame)
  };

  const updatedUser: MockUserData = applyUserDefaults({
    ...(existingUser ?? {}),
    ...normalizedData,
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
  const normalizedItemId = normalizeShopItemId(itemId) ?? itemId;
  const user = getMockUser(username, 'child') ?? saveMockUser(username, 'child', {});

  const currentCoins = user.careCoins ?? DEFAULT_CARE_COINS;
  const ownedItems = normalizeOwnedItems(user.ownedItems);

  if (ownedItems.includes(normalizedItemId)) {
    return user;
  }

  if (currentCoins < price) {
    return user;
  }

  return saveMockUser(username, 'child', {
    careCoins: currentCoins - price,
    ownedItems: [...ownedItems, normalizedItemId]
  });
}

export function equipShopItem(
  username: string,
  item: {
    id: string;
    type: ShopItemType;
  }
): MockUserData {
  const normalizedItemId = normalizeShopItemId(item.id) ?? item.id;
  const user = getMockUser(username, 'child') ?? saveMockUser(username, 'child', {});
  const ownedItems = normalizeOwnedItems(user.ownedItems);

  const isDefaultItem = DEFAULT_OWNED_ITEMS.includes(normalizedItemId);

  if (!ownedItems.includes(normalizedItemId) && !isDefaultItem) {
    return user;
  }

  const updates: Partial<MockUserData> = {};

  if (item.type === 'avatar') {
    updates.equippedAvatar = normalizedItemId;
  }

  if (item.type === 'buddy') {
    updates.equippedBuddy = normalizedItemId;
  }

  if (item.type === 'theme') {
    updates.equippedTheme = normalizedItemId;
  }

  if (item.type === 'frame') {
    updates.equippedFrame = normalizedItemId;
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

export function enrollInSession(username: string, sessionId: string): MockUserData {
  const user = getMockUser(username, 'child') ?? saveMockUser(username, 'child', {});
  const enrolledSessionIds = user.enrolledSessionIds ?? [];

  if (enrolledSessionIds.includes(sessionId)) {
    return user;
  }

  return saveMockUser(username, 'child', {
    enrolledSessionIds: [...enrolledSessionIds, sessionId]
  });
}

export function cancelSessionEnrollment(username: string, sessionId: string): MockUserData {
  const user = getMockUser(username, 'child') ?? saveMockUser(username, 'child', {});
  const enrolledSessionIds = user.enrolledSessionIds ?? [];

  return saveMockUser(username, 'child', {
    enrolledSessionIds: enrolledSessionIds.filter((id) => id !== sessionId)
  });
}

export function getEnrolledSessionIds(username: string): string[] {
  const user = getMockUser(username, 'child');

  return user?.enrolledSessionIds ?? [];
}

export function clearMockDatabase() {
  if (typeof window === 'undefined') {
    return;
  }

  localStorage.removeItem(STORAGE_KEY);
}
