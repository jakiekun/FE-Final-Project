# Connecting Supabase

Supabase (PostgreSQL) is our database + auth + realtime + storage.
Project: `kserkrwlrhyalcmcshdz` → API URL `https://kserkrwlrhyalcmcshdz.supabase.co`

The app already ships with a **null-safe** Supabase client (`src/lib/supabaseClient.js`):
when the env vars below are present it connects; when they're missing it falls
back to mock auth/data so the live demo never breaks.

## What's still needed: the **anon public key**

1. Open the project → **Settings → API**.
2. Copy the **`anon` `public`** key (a long `eyJ...` JWT — *not* the database password,
   and *not* the `service_role` key).
3. Add it in two places:
   - **Local** `.env`:
     ```
     VITE_SUPABASE_ANON_KEY=eyJ...
     ```
   - **Vercel** → Project `duoz` → Settings → Environment Variables (Production):
     `VITE_SUPABASE_ANON_KEY = eyJ...`  (and `VITE_SUPABASE_URL` = the URL above)

> The anon key is safe to expose in frontend code — Row Level Security (below) protects the data.

## Create the tables

In the project → **SQL Editor → New query**, paste the contents of
[`supabase/schema.sql`](supabase/schema.sql) and run it. It creates `profiles`,
`swipes`, `matches`, `messages` with RLS policies and realtime on `messages`.

## Then

Once the anon key is set, auth + profiles + chat switch from mock to real Supabase.
(The DB password is only for direct Postgres connections — keep it secret; rotate it if it was shared.)
