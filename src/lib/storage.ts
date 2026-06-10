import { VideoRecord } from "@/types";

const STORAGE_KEY = "ai_video_generator_history";

export function getHistory(): VideoRecord[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function addToHistory(record: VideoRecord): void {
  const history = getHistory();
  history.unshift(record);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

export function updateHistoryItem(id: string, updates: Partial<VideoRecord>): void {
  const history = getHistory();
  const index = history.findIndex((item) => item.id === id);
  if (index !== -1) {
    history[index] = { ...history[index], ...updates };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  }
}

export function clearHistory(): void {
  localStorage.removeItem(STORAGE_KEY);
}
