import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "stockholm-day-trips:saved";

function readStorage(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}

export function useSavedTrips() {
  const [savedIds, setSavedIds] = useState<string[]>([]);

  useEffect(() => {
    setSavedIds(readStorage());
  }, []);

  const persist = useCallback((next: string[]) => {
    setSavedIds(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    }
  }, []);

  const toggle = useCallback(
    (id: string) => {
      persist(
        savedIds.includes(id)
          ? savedIds.filter((x) => x !== id)
          : [...savedIds, id],
      );
    },
    [savedIds, persist],
  );

  const remove = useCallback(
    (id: string) => persist(savedIds.filter((x) => x !== id)),
    [savedIds, persist],
  );

  const isSaved = useCallback((id: string) => savedIds.includes(id), [savedIds]);

  return { savedIds, toggle, remove, isSaved };
}
