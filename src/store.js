import { STORAGE_KEY, HISTORY_KEY, SEED_BUSINESSES, SEED_HISTORY } from "./data.js";
import { parseBusinessArray, parseHistory } from "./security.js";

export function loadBusinesses(storage = localStorage) {
  const raw = storage.getItem(STORAGE_KEY);
  if (raw === null) return structuredClone(SEED_BUSINESSES);
  const parsed = parseBusinessArray(raw, structuredClone(SEED_BUSINESSES));
  if (!parsed.ok) {
    storage.removeItem(STORAGE_KEY);
    return structuredClone(SEED_BUSINESSES);
  }
  return parsed.value;
}
export function saveBusinesses(items, storage = localStorage) {
  storage.setItem(STORAGE_KEY, JSON.stringify(items));
}
export function loadHistory(storage = localStorage) {
  const raw = storage.getItem(HISTORY_KEY);
  return raw === null ? structuredClone(SEED_HISTORY) : parseHistory(raw, structuredClone(SEED_HISTORY));
}
export function saveHistory(items, storage = localStorage) {
  storage.setItem(HISTORY_KEY, JSON.stringify(items.slice(0,200)));
}
