CREATE TABLE public.user_progress (
  user_id UUID PRIMARY KEY,
  journey_xp INTEGER NOT NULL DEFAULT 180,
  mission_progress JSONB NOT NULL DEFAULT '{}'::jsonb,
  mission_done JSONB NOT NULL DEFAULT '{}'::jsonb,
  lessons_completed JSONB NOT NULL DEFAULT '{}'::jsonb,
  academy_xp INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_progress TO authenticated;
GRANT ALL ON public.user_progress TO service_role;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own select" ON public.user_progress FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "own insert" ON public.user_progress FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own update" ON public.user_progress FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own delete" ON public.user_progress FOR DELETE TO authenticated USING (auth.uid() = user_id);