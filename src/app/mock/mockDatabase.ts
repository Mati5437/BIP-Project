export type AgeGroup = 'young' | 'teen' | 'advanced';
export type EnergyLevel = 'high' | 'medium' | 'low';

export interface MockUserData {
  username: string;
  role: string;
  ageGroup?: AgeGroup;
  energyLevel?: EnergyLevel;
  energyPopupCompleted?: boolean;
  createdAt: string;
  updatedAt: string;
}

interface MockDatabase {
  users: Record<string, MockUserData>;
}

const STORAGE_KEY = 'carequest_mock_database_v1';

function getUserKey(username: string, role: string) {
  return `${role}:${username.trim().toLowerCase()}`;
}

function getEmptyDatabase(): MockDatabase {
  return {
    users: {}
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

  return database.users[key] ?? null;
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

  const updatedUser: MockUserData = {
    ...existingUser,
    ...data,
    username,
    role,
    createdAt: existingUser?.createdAt ?? now,
    updatedAt: now
  };

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

export function clearMockDatabase() {
  if (typeof window === 'undefined') {
    return;
  }

  localStorage.removeItem(STORAGE_KEY);
}