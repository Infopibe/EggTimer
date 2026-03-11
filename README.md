# 🍳 Egg Timer

Ein spaßiger Pixel-Art Eierkocher für den Webbrowser – und als App für Android und iOS installierbar.

Die App unterstützt vier Ei-Typen: **Weiches Ei**, **Hartes Ei**, **Spiegelei** und **Rührei**.

---

## App-Konzept

Die App imitiert ein retro Desktop-Fenster und führt den Nutzer durch drei einfache Schritte:

```
[Start] → [Ei wählen] → [Countdown] → [Fertig!]
```

| Screen | Beschreibung |
|---|---|
| **Start** | Willkommensscreen mit animierten Wolken und einem „Start"-Button |
| **Menü** | Vier Ei-Karten (Weich / Hart / Spiegel / Rühr) mit Pixel-Icons |
| **Timer** | Animiertes Ei-GIF, Countdown-Anzeige und ein „Abbrechen"-Button |
| **Fertig** | Celebrations-GIF, „Snooze" (gleiches Ei neu starten) und „Schließen" |

Die gesamte App läuft in einer einzigen `index.html` (Single Page Application), lädt sofort,
funktioniert offline und kann auf Android und iOS als Progressive Web App (PWA) **installiert** werden.

---

## Plattform-Unterstützung

| Plattform | So funktioniert es |
|---|---|
| **Webbrowser** | `index.html` direkt öffnen oder auf einem Server hosten (z.B. GitHub Pages) |
| **Android** | Gehostete URL in Chrome aufrufen → „Zum Startbildschirm hinzufügen" |
| **iOS (Safari)** | Gehostete URL in Safari aufrufen → Teilen → „Zum Home-Bildschirm" |

> **Hinweis:** Offline-Unterstützung und PWA-Installation erfordern HTTPS.
> GitHub Pages, Netlify und Vercel bieten dies kostenlos an.

---

## Was wurde optimiert?

Vollständige Details: siehe **[CHANGELOG.md](CHANGELOG.md)**

Kurzübersicht:

- **Single Page Application** – alle 4 HTML-Seiten zu einer `index.html` zusammengeführt
- **Kaputte Bild-Referenzen behoben** – `minimize.png` / `close.png` existierten nicht
- **Rührei-Animation behoben** – falscher Dateiname `egg-scrambled.gif` → `egg-scramble.gif`
- **Snooze-Bug behoben** – startete immer weiches Ei, egal was gewählt wurde
- **Timer-Logik verbessert** – `setInterval` + `clearInterval` statt unkündbarem `setTimeout`
- **PWA-Support** – `manifest.json` und `sw.js` für Installation und Offline-Betrieb
- **Mobile Meta-Tags** – native Statusleiste auf iPhone, `viewport-fit=cover` für Notch

---

## Deployment (GitHub Pages – empfohlen, kostenlos)

1. Repository auf GitHub hochladen (bereits erledigt).
2. Im Repository auf **Settings → Pages** gehen.
3. Unter *Source*: **Deploy from a branch** → `main` → `/ (root)` wählen.
4. Auf **Save** klicken. Die App ist dann erreichbar unter:
   ```
   https://<dein-benutzername>.github.io/<repo-name>/
   ```
5. URL teilen – Nutzer können die App sofort auf Android und iOS installieren.

---

## Nächste Schritte (was du selbst tun musst)

| Aufgabe | Warum nötig? | Hinweise |
|---|---|---|
| **GitHub Pages aktivieren** | HTTPS für PWA-Install & Offline | Settings → Pages → main → / |
| **App-Icon erstellen** | Stores brauchen 512x512 px Icon | [Canva](https://canva.com) oder [RealFaviconGenerator](https://realfavicongenerator.net) |
| **Google Play Store** | App im Play Store veröffentlichen | Google Play Konto ($25 einmalig) + [PWABuilder](https://www.pwabuilder.com) |
| **Apple App Store** | App im App Store veröffentlichen | Apple Developer Konto ($99/Jahr) + [PWABuilder](https://www.pwabuilder.com) |
| **Eigene Domain** | Professionelle URL (z.B. `eggtimer.app`) | Domain kaufen (~$10/Jahr), auf GitHub Pages zeigen |
| **Push-Benachrichtigungen** | Timer-Alarm auch bei gesperrtem Bildschirm | Benötigt Backend, z.B. Firebase |
