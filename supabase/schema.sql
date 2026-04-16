create table if not exists influencers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  handle text, category text, followers text,
  event_name text, event_date text, venue text, custom_message text,
  token text unique not null default upper(substr(md5(random()::text || clock_timestamp()::text), 1, 10)),
  link_opened boolean default false, link_opened_at timestamptz,
  rsvp text default 'PENDING', plus_ones integer default 0,
  plus_handles text, creators_type text, gmail text,
  ticket_number text, notes text,
  created_at timestamptz default now(), responded_at timestamptz
);
alter table influencers enable row level security;
create policy "full_access" on influencers for all using (true) with check (true);