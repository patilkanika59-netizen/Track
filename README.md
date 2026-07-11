# Rhythm — Daily Routine Tracker

A React + Vite app for tracking daily health routines, with Supabase for
auth/storage and an AI assistant page for habit questions.

## Pages
- **Home** (`/`) — landing page
- **Advantages** (`/advantages`) — why routine tracking helps
- **About** (`/about`) — product story
- **Sign up** (`/signup`) / **Log in** (`/login`) — Supabase email/password auth
- **Dashboard** (`/dashboard`, protected) — add, complete, delete routines; daily progress dial
- **AI Assistant** (`/ai-assistant`, protected) — chat about building healthier habits

## Project structure
```
routine-tracker/
├─ src/
│  ├─ main.jsx              # app entry, router + auth provider
│  ├─ App.jsx                # routes
│  ├─ index.css              # Tailwind + design tokens
│  ├─ supabaseClient.js      # Supabase client (reads .env)
│  ├─ context/AuthContext.jsx
│  ├─ components/
│  │  ├─ Navbar.jsx
│  │  ├─ Footer.jsx
│  │  ├─ ProtectedRoute.jsx
│  │  ├─ DayDial.jsx         # circular daily-progress ring
│  │  └─ RoutineCard.jsx
│  └─ pages/
│     ├─ Home.jsx
│     ├─ Advantages.jsx
│     ├─ About.jsx
│     ├─ Login.jsx
│     ├─ Signup.jsx
│     ├─ Dashboard.jsx
│     └─ AIAssistant.jsx
├─ supabase/
│  ├─ schema.sql              # tables + row-level security policies
│  └─ functions/ai-assistant/index.ts  # Edge Function proxying the AI call
├─ .env.example
└─ package.json
```

## 1. Install
```bash
npm install
```

## 2. Set up Supabase
1. Create a project at https://supabase.com.
2. In **SQL Editor**, run everything in `supabase/schema.sql`. This creates
   `routines` and `routine_logs` tables with row-level security, so each
   user can only see their own data.
3. In **Project settings → API**, copy the **Project URL** and **anon public key**.
4. Copy `.env.example` to `.env` and fill in both values:
   ```
   VITE_SUPABASE_URL=https://your-project-ref.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```
5. In **Authentication → Providers**, email/password is enabled by default —
   no extra setup needed for sign up/login to work.

## 3. Run locally
```bash
npm run dev
```
Visit the printed localhost URL.

## 4. (Optional) Enable the AI assistant
The AI Assistant page calls a Supabase Edge Function (`ai-assistant`) instead
of calling an AI API directly from the browser, so your API key is never
exposed to users. To enable it:

```bash
# install the Supabase CLI if you haven't: https://supabase.com/docs/guides/cli
supabase login
supabase link --project-ref your-project-ref
supabase functions deploy ai-assistant
supabase secrets set ANTHROPIC_API_KEY=sk-ant-your-key
```

The function in `supabase/functions/ai-assistant/index.ts` calls the
Anthropic Messages API with a health-routine system prompt. Swap in any
other AI provider's API by editing that one file — the frontend only
expects `{ reply: string }` back.

Until the function is deployed, the Assistant page still renders and shows
a friendly message explaining it's not connected yet.

## 5. Build for production
```bash
npm run build
```
Deploy the `dist/` folder to any static host (Vercel, Netlify, Cloudflare Pages, etc).

## Notes
- Styling uses Tailwind CSS with a small custom token set (see
  `tailwind.config.js`): ink (#16213A), dawn (#FF8A5B), sage (#9FB8A8),
  paper (#F6F3EC).
- All routine data is scoped to `auth.uid()` via RLS — users cannot read or
  write each other's data even with the anon key.
