-- CiteGlow · Supabase schema
-- 在 Supabase SQL Editor 中整段执行一次

-- 每位用户一行，papers 为完整论文数组 JSON
create table if not exists public.user_library (
  user_id uuid primary key references auth.users(id) on delete cascade,
  papers jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);

-- 仅本人可读写
alter table public.user_library enable row level security;

create policy "Users can read own library"
  on public.user_library for select
  using (auth.uid() = user_id);

create policy "Users can insert own library"
  on public.user_library for insert
  with check (auth.uid() = user_id);

create policy "Users can update own library"
  on public.user_library for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete own library"
  on public.user_library for delete
  using (auth.uid() = user_id);
