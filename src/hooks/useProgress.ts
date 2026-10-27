import { useCallback, useEffect, useRef, useState } from "react";

export type Progress = {
  journey_xp: number;
  mission_progress: Record<string, number>;
  mission_done: Record<string, boolean>;
  lessons_completed: Record<string, boolean>;
  academy_xp: number;
};

export const DEFAULT_PROGRESS: Progress = {
  journey_xp: 180,
  mission_progress: {},
  mission_done: {},
  lessons_completed: {},
  academy_xp: 0,
};

const STORAGE_KEY = "xp-journey-progress";

function loadProgress(): Progress {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    return { ...DEFAULT_PROGRESS, ...(JSON.parse(raw) as Partial<Progress>) };
  } catch {
    return DEFAULT_PROGRESS;
  }
}

export function useProgress() {
  const [progress, setProgress] = useState<Progress>(DEFAULT_PROGRESS);
  const [loaded, setLoaded] = useState(false);
  const latest = useRef(progress);
  latest.current = progress;

  useEffect(() => {
    setProgress(loadProgress());
    setLoaded(true);
  }, []);

  const update = useCallback(
    (patch: Partial<Progress> | ((p: Progress) => Partial<Progress>)) => {
      const base = latest.current;
      const changes = typeof patch === "function" ? patch(base) : patch;
      const next = { ...base, ...changes };
      latest.current = next;
      setProgress(next);
      try {
        window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // storage unavailable — progress lives only in memory this session
      }
    },
    []
  );

  return { progress, update, loaded };
}
