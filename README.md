# +ParkX Smart Parking

A Next.js App Router smart-city parking system. Drivers authenticate through Supabase Auth, reserve slots with a transaction-safe PostgreSQL RPC, and receive live slot changes through Supabase Realtime. The prior Spring/MySQL application is not part of this rebuild.

## Features

- Email/password registration, login, logout and role-based screens
- UUID-backed profiles, slots and reservations with RLS policies
- Atomic `reserve_parking_slot` RPC uses `FOR UPDATE` locking and range-conflict checks
- Atomic cancellation, PostgreSQL expiry function and Supabase Realtime subscriptions
- Responsive parking grid, reservation form validation, dashboard, admin slot management and searchable reservation list

## Setup

1. Create a Supabase project. In SQL Editor, execute `supabase/migrations/20260926_initial.sql`, then `supabase/seed.sql`.
2. In Supabase Dashboard enable Email Auth. Realtime is enabled by the migration publication statement.
3. Copy `.env.example` to `.env.local` and set only `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`. Never expose a service-role key.
4. Install and run: `pnpm install`, `pnpm dev`; production: `pnpm build && pnpm start`.
5. Create normal users via `/register`. Make an admin after creating that Auth user: `update public.profiles set role='admin' where email='admin@example.com';`.

## Database / security

RLS limits users to their own profiles and reservations; only admins can mutate slot data or inspect all reservations. Reservation creation and cancellation are only granted via secure RPCs that use `auth.uid()`, not a client-provided user ID. The migration enables `pg_cron` and schedules `select public.expire_reservations()` every five minutes. This releases only slots that have no remaining active reservation.

## Architecture

`app/` holds App Router pages, `components/` holds UI/domain components, `lib/supabase/` creates browser clients, `lib/validations/` contains Zod rules, `hooks/` owns realtime cleanup, and `supabase/` holds reproducible schema/seed SQL.

## Deployment

Deploy to Vercel, add the two public Supabase environment variables in Vercel settings, and configure Supabase Auth redirect URLs for the deployed domain. Use Supabase SQL migrations/CLI in CI before deployment.

## Notes / troubleshooting

No sample password is committed. Seed slots are usable after an authenticated user signs up; reservations require valid Supabase Auth users so they cannot safely be seeded with fabricated identities. If sign-up does not log in immediately, disable email confirmation for a demo project or confirm the email. If live updates fail, confirm both tables are present in the `supabase_realtime` publication and Realtime is enabled in the Supabase dashboard.
