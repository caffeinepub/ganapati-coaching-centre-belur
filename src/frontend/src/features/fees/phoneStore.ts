const PHONE_STORAGE_KEY = 'student_phones';

interface PhoneStore {
  [studentId: string]: string;
}

export function getPhoneStore(): PhoneStore {
  try {
    const stored = localStorage.getItem(PHONE_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

export function savePhoneToStore(studentId: string, phone: string): void {
  try {
    const store = getPhoneStore();
    store[studentId] = phone;
    localStorage.setItem(PHONE_STORAGE_KEY, JSON.stringify(store));
  } catch (error) {
    console.error('Failed to save phone to storage:', error);
  }
}

export function getPhoneFromStore(studentId: string): string | undefined {
  const store = getPhoneStore();
  return store[studentId];
}

export function removePhoneFromStore(studentId: string): void {
  try {
    const store = getPhoneStore();
    delete store[studentId];
    localStorage.setItem(PHONE_STORAGE_KEY, JSON.stringify(store));
  } catch (error) {
    console.error('Failed to remove phone from storage:', error);
  }
}
