-- Create user_progress table to store study progress
create table if not exists public.user_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  progress jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(user_id)
);

-- Enable RLS
alter table public.user_progress enable row level security;

-- RLS Policies
create policy "Users can view their own progress"
  on public.user_progress
  for select
  using (auth.uid() = user_id);

create policy "Users can insert their own progress"
  on public.user_progress
  for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own progress"
  on public.user_progress
  for update
  using (auth.uid() = user_id);

create policy "Users can delete their own progress"
  on public.user_progress
  for delete
  using (auth.uid() = user_id);

-- Create trigger to auto-create user_progress on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.user_progress (user_id, progress)
  values (new.id, '{}'::jsonb)
  on conflict (user_id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();

-- Create updated_at trigger
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists on_user_progress_updated on public.user_progress;

create trigger on_user_progress_updated
  before update on public.user_progress
  for each row
  execute function public.handle_updated_at();
