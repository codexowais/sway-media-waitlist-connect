# Sway Media Waitlist Connect

Continue working on the existing Sway Media project.

IMPORTANT:
Do NOT rebuild the website.
Do NOT redesign anything.
Do NOT change the existing hero, logo, typography, animations, STG flash video, distortion effect, responsive layout, or waitlist UI.

The frontend is already built.

Your task is ONLY to connect the existing waitlist to Supabase and make the database/backend fully functional.

==================================================
1. INSPECT THE EXISTING PROJECT FIRST
==================================================

Before making changes, inspect the existing repository and understand:

- current framework
- package.json
- existing waitlist form
- src/app/api/waitlist/route.ts
- src/lib/waitlist.ts
- validation utilities
- existing Supabase files
- existing migrations
- existing environment variables
- existing Resend integration

Do not create duplicate functionality.

Reuse the existing waitlist architecture wherever possible.

==================================================
2. CONNECT TO SUPABASE
==================================================

Use Lovable's Supabase integration.

Connect this project to the Supabase project intended for Sway Media.

IMPORTANT:

If a Supabase project is already connected to this Lovable project, use that project.

Do NOT create another Supabase project.

If there are multiple possible Supabase projects and you cannot determine which one belongs to Sway Media, STOP and ask me before making database changes.

==================================================
3. INSPECT SUPABASE BEFORE CREATING ANYTHING
==================================================

First inspect the existing database.

Check whether a table called:

public.waitlist

already exists.

If it exists:
- inspect its columns
- inspect constraints
- inspect RLS
- inspect policies
- do NOT create a duplicate table

If it does not exist, create it.

==================================================
4. WAITLIST DATABASE
==================================================

The required schema is:

public.waitlist

id:
- uuid
- primary key
- default gen_random_uuid()

email:
- text
- not null
- unique

created_at:
- timestamptz
- not null
- default now()

The resulting structure should be equivalent to:

CREATE TABLE public.waitlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now()
);

==================================================
5. ROW LEVEL SECURITY
==================================================

Enable Row Level Security on:

public.waitlist

IMPORTANT SECURITY REQUIREMENT:

The browser must NOT directly access the waitlist table.

Do NOT create public policies that allow:

- SELECT
- UPDATE
- DELETE

The waitlist should only be accessed by the secure server-side API.

Do not expose the waitlist records to visitors.

==================================================
6. EXISTING API
==================================================

Preserve the existing API architecture:

Waitlist Form
↓
POST /api/waitlist
↓
Validate email
↓
Normalize email
↓
Supabase
↓
public.waitlist

Do not replace the existing form with direct client-side Supabase queries.

The browser should call the existing API route.

The Supabase privileged credential must remain server-side.

==================================================
7. EMAIL NORMALIZATION
==================================================

When a visitor submits:

"  HELLO@SWAYMEDIA.IN  "

the API should store:

"hello@swaymedia.in"

Continue using the existing validation logic.

Reject invalid emails.

Do not weaken validation.

==================================================
8. DUPLICATE EMAILS
==================================================

The email column must be UNIQUE.

If a visitor submits an email that already exists:

- do not create another row
- do not throw an ugly database error to the visitor
- return a clean successful response
- do not send duplicate confirmation emails

Preserve the existing duplicate-signup behavior if it is already implemented.

==================================================
9. RESEND
==================================================

Inspect the existing Resend integration.

If Resend is already implemented, preserve it.

The expected flow is:

Supabase
↓
Store signup

Resend
↓
Send visitor confirmation
↓
Send Sway Media notification

Do not redesign the email templates unless necessary.

Required environment variables:

SUPABASE_URL=
SUPABASE_SECRET_KEY=
RESEND_API_KEY=
RESEND_FROM_EMAIL=
WAITLIST_NOTIFICATION_EMAIL=

Keep all secrets server-side.

Never expose:

SUPABASE_SECRET_KEY
RESEND_API_KEY

through client-side code.

Never use NEXT_PUBLIC_ for these secrets.

==================================================
10. ENVIRONMENT VARIABLES
==================================================

Update .env.example if necessary.

It should contain placeholders only:

SUPABASE_URL=
SUPABASE_SECRET_KEY=
RESEND_API_KEY=
RESEND_FROM_EMAIL=
WAITLIST_NOTIFICATION_EMAIL=

Do NOT put real credentials into GitHub.

Do NOT hardcode API keys.

Do NOT expose secrets in frontend components.

==================================================
11. DATABASE MIGRATION
==================================================

If this project uses Supabase migrations, create a proper migration for the waitlist table.

The migration should:

- create public.waitlist
- make email unique
- add created_at
- enable RLS
- avoid unsafe public policies

Do not:

- drop existing tables
- delete existing data
- modify unrelated tables
- reset the database

==================================================
12. FRONTEND MUST REMAIN UNCHANGED
==================================================

Preserve the current Sway Media experience exactly.

Do NOT change:

- hero
- logo
- typography
- colors
- spacing
- distortion effect
- STG flash video
- background animation
- CTA styling
- waitlist interaction
- mobile design

Only connect the existing waitlist functionality to the backend.

==================================================
13. TEST THE IMPLEMENTATION
==================================================

After implementing the Supabase integration:

Run the existing tests.

Run:

npm test

Then:

npm run lint

Then:

npm run build

Fix any errors.

Do not disable tests.

Do not delete tests.

==================================================
14. VERIFY THE DATABASE
==================================================

Verify through Supabase that:

public.waitlist exists.

Verify:

- id is UUID
- id is primary key
- email is NOT NULL
- email is UNIQUE
- created_at has a default
- RLS is enabled
- there are no unsafe public policies

==================================================
15. TEST A SIGNUP
==================================================

Perform a development/test signup using a test email.

Example:

test@swaymedia.in

Verify that the row appears in:

public.waitlist

Then submit the same email again.

Verify that:

- no duplicate row is created
- the API handles it gracefully
- duplicate emails are not sent

Do not use anyone else's personal email.

==================================================
16. SECURITY CHECK
==================================================

Before finishing, verify:

- Supabase secret is server-only
- Resend API key is server-only
- no secrets are hardcoded
- no secrets use NEXT_PUBLIC_
- browser cannot directly read waitlist records
- RLS is enabled
- no public SELECT policy exists
- no unnecessary database permissions were created

==================================================
17. FINAL REPORT
==================================================

When finished, tell me:

1. Which Supabase project was connected
2. Whether public.waitlist already existed
3. What schema was created/updated
4. Whether RLS is enabled
5. What policies exist
6. Whether the API successfully stores signups
7. Whether duplicate signups are handled
8. Whether Resend is configured
9. Required environment variables
10. Test result
11. Lint result
12. Production build result
13. Any remaining manual configuration

IMPORTANT:

Do not claim that real email delivery works unless the Resend API key and verified sender domain are actually configured and a real end-to-end test has succeeded.

Do not claim the database is connected unless you have actually verified it through Supabase.

Do not make unrelated changes.

The goal is:

MAKE THE EXISTING SWAY MEDIA WAITLIST ACTUALLY WORK.

Nothing else.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/4d053fef-c9be-4df8-ba81-89052d20fc34).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
