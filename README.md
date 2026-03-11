# 🍳 Egg Timer

A fun pixel-art egg timer web app for **Soft Boiled**, **Hard Boiled**, **Fried** and **Scrambled** eggs.

---

## App Concept

The app mimics a retro desktop window and guides the user through three simple steps:

```
[Start Screen] → [Choose Egg] → [Countdown Timer] → [Done!]
```

| Screen | Description |
|---|---|
| **Start** | Welcome screen with animated clouds and a single "Start" button |
| **Menu** | Four egg type cards (Soft / Hard / Fried / Scrambled) with pixel icons |
| **Timer** | Animated egg GIF, countdown display and a Cancel button |
| **Done** | Celebration GIF, Snooze (restart same egg) and Close buttons |

The entire experience lives in a single `index.html` (Single Page Application), so it loads
instantly, works offline, and can be **installed on Android and iOS** as a Progressive Web App (PWA).

---

## Platform Support

| Platform | How it works |
|---|---|
| **Web browser** | Open `index.html` directly or host it on any static server (e.g. GitHub Pages) |
| **Android** | Visit the hosted URL in Chrome → tap "Add to Home Screen" → works like a native app |
| **iOS (Safari)** | Visit the hosted URL in Safari → Share → "Add to Home Screen" |

> **Note:** Full offline support requires the app to be served over HTTPS (GitHub Pages, Netlify, Vercel, etc.). HTTPS is also required for the service worker to activate.

---

## What was done (code optimizations)

- **Single Page Application** – merged `menu.html`, `timer.html` and `done.html` into one `index.html`, eliminating duplicated `<head>` blocks and full-page navigations.
- **Fixed broken asset references** – `assets/minimize.png` and `assets/close.png` did not exist; corrected to the actual filenames (`8664917_window_minimize_icon.png`, `211651_close_round_icon.png`).
- **Fixed scrambled egg animation** – `script.js` referenced `egg-scrambled.gif` but the file is `egg-scramble.gif`.
- **Fixed Snooze button** – the original `done.html` always restarted as *soft boiled* regardless of which egg was chosen. The Snooze button now restarts the correct egg type.
- **Replaced recursive `setTimeout`** with `setInterval` + `clearInterval` so the timer can be properly cancelled when the user presses "Cancel".
- **Added PWA support** – `manifest.json` and `sw.js` (service worker) enable offline usage and home-screen installation on Android & iOS.
- **Added mobile meta tags** – `theme-color`, `apple-mobile-web-app-capable` and related tags for a native-like experience.
- **Added `.gitignore`** – excludes `.DS_Store` files from the repository.

---

## Deployment (GitHub Pages – recommended, free)

1. Push this repository to GitHub (already done).
2. Go to **Settings → Pages** in your repository.
3. Under *Source*, select **Deploy from a branch** → `main` → `/ (root)`.
4. Click **Save**. Your app will be live at:
   ```
   https://<your-username>.github.io/<repo-name>/
   ```
5. Share the URL — users can immediately add it to their home screen on Android and iOS.

---

## Next steps for you (things that require your action)

| Task | Why it's needed | Notes |
|---|---|---|
| **Publish to GitHub Pages** | Makes the app accessible via HTTPS so PWA install & offline mode work | Free, takes ~2 minutes |
| **Create a proper app icon** | The current icon is a small PNG egg; stores require 512x512 px and specific formats | Use [Canva](https://canva.com) or [RealFaviconGenerator](https://realfavicongenerator.net) |
| **Publish to Google Play Store** | Optional – lets users find the app in the Play Store | Requires a Google Play developer account ($25 one-time fee) and wrapping the PWA with [Bubblewrap](https://github.com/GoogleChromeLabs/bubblewrap) or [PWABuilder](https://www.pwabuilder.com) |
| **Publish to Apple App Store** | Optional – lets iPhone users find the app in the App Store | Requires an Apple Developer account ($99/year); use [PWABuilder](https://www.pwabuilder.com) to generate an Xcode project |
| **Custom domain** | Makes the URL look professional (e.g. `eggtimer.app`) | Buy a domain (~$10/year) and point it to GitHub Pages |
| **Push notifications** | Could remind users when the timer is done even if the screen is locked | Requires additional server-side code or a service like Firebase |
