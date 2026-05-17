# LifeOS

A personal life-management app — tasks, projects, trips, workouts, books, style, reference. Single-user, runs in the browser, installs as a PWA on your phone.

Live: _add your GitHub Pages URL here once deployed_

---

## Deploy to GitHub Pages (one-time setup)

### 1. Create a GitHub repo

1. Go to <https://github.com/new>
2. Name it `lifeos` (or whatever)
3. **Private** is fine — GitHub Pages works with private repos on free accounts now.
4. Don't add a README/`.gitignore`/license — this project already has them.
5. Create the repo. Copy the SSH or HTTPS URL it shows you.

### 2. Push this project up

In a terminal, from this folder:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <paste-the-repo-url-here>
git push -u origin main
```

### 3. Turn on GitHub Pages

1. In the repo on github.com → **Settings** → **Pages** (left sidebar).
2. **Source**: "Deploy from a branch"
3. **Branch**: `main`, folder `/ (root)`
4. Click **Save**.
5. Wait ~30 seconds. Refresh. The page will show a green box with your URL — something like `https://<your-username>.github.io/lifeos/`.

Open it. The app should load. Data is still localStorage at this point — that's fine for now.

### 4. Updating the live site

Any push to `main` redeploys automatically:

```bash
git add .
git commit -m "Whatever changed"
git push
```

Live site updates in ~30 seconds.

---

## Project layout

```
index.html              ← the app (deployed entry point)
public/                 ← PWA icons
docs/supabase.sql       ← Supabase schema (run this in SQL editor — Step 2)
explorations/           ← design explorations, not deployed
LifeOS Explorations.html, LifeOS v1.html  ← older versions, kept for reference
```

The `*.jsx` files in the root are dev scratch from earlier explorations — not loaded by `index.html`. Safe to delete later.

---

## Next steps

- [x] Step 1: deploy as-is to GitHub Pages (localStorage only)
- [ ] Step 2: create Supabase project, run `docs/supabase.sql`
- [ ] Step 3: wire Supabase client + magic-link auth into `index.html`
- [ ] Step 4: one-time migration of existing localStorage data → Supabase
- [ ] Step 5: PWA manifest + service worker (installable, offline-capable)
