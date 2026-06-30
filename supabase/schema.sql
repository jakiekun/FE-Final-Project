-- ============================================================
-- Duoz — Supabase schema
-- Run this in your Supabase project → SQL Editor → New query.
-- ============================================================

-- ---------- Profiles ----------
create table if not exists public.profiles (
  id            uuid primary key references auth.users (id) on delete cascade,
  gamertag      text,
  email         text,
  region        text,
  bio           text default '',
  games         jsonb default '[]'::jsonb,   -- [{ id, rank, roles: [] }]
  availability  text[] default '{}',
  playstyles    text[] default '{}',
  gameplays     jsonb default '[]'::jsonb,   -- [{ id, title, game, url }]
  connections   jsonb default '{}'::jsonb,   -- { steam: true, discord: true, ... }
  verified      boolean default false,
  rating        numeric default 5.0,
  created_at    timestamptz default now()
);

alter table public.profiles enable row level security;

drop policy if exists "profiles are viewable by everyone" on public.profiles;
create policy "profiles are viewable by everyone"
  on public.profiles for select using (true);

drop policy if exists "users insert own profile" on public.profiles;
create policy "users insert own profile"
  on public.profiles for insert with check (auth.uid() = id);

drop policy if exists "users update own profile" on public.profiles;
create policy "users update own profile"
  on public.profiles for update using (auth.uid() = id);

-- Auto-create a profile row when a new user signs up.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, gamertag, email)
  values (new.id, coalesce(new.raw_user_meta_data->>'gamertag', split_part(new.email, '@', 1)), new.email)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------- Likes / Matches ----------
create table if not exists public.swipes (
  id         bigint generated always as identity primary key,
  swiper     uuid references auth.users (id) on delete cascade,
  target     uuid references auth.users (id) on delete cascade,
  liked      boolean not null,
  created_at timestamptz default now(),
  unique (swiper, target)
);
alter table public.swipes enable row level security;
drop policy if exists "users manage own swipes" on public.swipes;
create policy "users manage own swipes"
  on public.swipes for all using (auth.uid() = swiper) with check (auth.uid() = swiper);

create table if not exists public.matches (
  id         bigint generated always as identity primary key,
  user_a     uuid references auth.users (id) on delete cascade,
  user_b     uuid references auth.users (id) on delete cascade,
  created_at timestamptz default now()
);
alter table public.matches enable row level security;
drop policy if exists "users see own matches" on public.matches;
create policy "users see own matches"
  on public.matches for select using (auth.uid() = user_a or auth.uid() = user_b);

-- ---------- Messages ----------
create table if not exists public.messages (
  id         bigint generated always as identity primary key,
  match_id   bigint references public.matches (id) on delete cascade,
  sender     uuid references auth.users (id) on delete cascade,
  body       text not null,
  created_at timestamptz default now()
);
alter table public.messages enable row level security;
drop policy if exists "match members read messages" on public.messages;
create policy "match members read messages"
  on public.messages for select using (
    exists (select 1 from public.matches m
            where m.id = match_id and (m.user_a = auth.uid() or m.user_b = auth.uid()))
  );
drop policy if exists "match members send messages" on public.messages;
create policy "match members send messages"
  on public.messages for insert with check (
    sender = auth.uid() and exists (
      select 1 from public.matches m
      where m.id = match_id and (m.user_a = auth.uid() or m.user_b = auth.uid()))
  );

-- Enable realtime for chat
alter publication supabase_realtime add table public.messages;
