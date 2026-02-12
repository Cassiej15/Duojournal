import AsyncStorage from "@react-native-async-storage/async-storage";

export type JournalEntry = {
  id: string;
  author: "mom" | "daughter";
  createdAt: string;
  text: string;
  prompt?: string;
};

const STORAGE_KEY = "duojournal.entries.v1";

export async function getEntries(): Promise<JournalEntry[]> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as JournalEntry[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function addEntry(entry: JournalEntry): Promise<void> {
  const entries = await getEntries();
  const updated = [entry, ...entries];
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export async function clearEntries(): Promise<void> {
  await AsyncStorage.removeItem(STORAGE_KEY);
}

