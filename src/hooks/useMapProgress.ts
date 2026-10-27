import { useEffect, useRef, useState } from "react";
import { MAP_LESSONS } from "@/lib/map-lessons";

type Attempt = { answers: number[]; finished: boolean; bestScore?: number };
type Saved = Record<string, Attempt>;
const KEY = "xp-mapa-progresso-v2";
export function useMapProgress() {
  const [attempts, setAttempts] = useState<Saved>({});
  const [loaded, setLoaded] = useState(false);
  const latest = useRef<Saved>({});
  useEffect(() => {
    let safe: Saved = {};
    try {
      const parsed: unknown = JSON.parse(sessionStorage.getItem(KEY) || "{}");
      if (parsed && typeof parsed === "object") {
        for (const lesson of MAP_LESSONS) {
          const value = (parsed as Saved)[lesson.id];
          if (!value || !Array.isArray(value.answers)) continue;
          const answers: number[] = [];
          for (const [i, answer] of value.answers.slice(0, 10).entries()) {
            const q = lesson.questions[i];
            if (!q || !Number.isInteger(answer) || answer < 0 || answer >= q.options.length) break;
            answers.push(answer);
          }
          const score = answers.filter((a, i) => a === lesson.questions[i]?.correct).length;
          const bestScore = typeof value.bestScore === "number" && Number.isInteger(value.bestScore) ? Math.min(10, Math.max(0, value.bestScore)) : undefined;
          safe[lesson.id] = { answers, finished: value.finished === true && answers.length === 10, bestScore: bestScore ?? (answers.length === 10 ? score : undefined) };
        }
      }
    } catch { /* Browser storage may be unavailable. */ }
    latest.current = safe;
    setAttempts(safe);
    setLoaded(true);
  }, []);
  function save(id: string, attempt: Attempt) {
    const next = { ...latest.current, [id]: attempt };
    latest.current = next;
    setAttempts(next);
    try { sessionStorage.setItem(KEY, JSON.stringify(next)); } catch { /* Keep this session usable. */ }
  }
  function answer(id: string, choice: number) {
    const lesson = MAP_LESSONS.find(l => l.id === id);
    const current = latest.current[id];
    const answers = [...(current?.answers ?? []), choice];
    if (!lesson || answers.length > 10 || current?.finished) return;
    const finished = answers.length === 10;
    const score = answers.filter((a, i) => a === lesson.questions[i]?.correct).length;
    save(id, { answers, finished, bestScore: finished ? Math.max(current?.bestScore ?? 0, score) : current?.bestScore });
  }
  function restart(id: string) {
    save(id, { answers: [], finished: false, bestScore: latest.current[id]?.bestScore });
  }
  return { attempts, loaded, answer, restart };
}