# Änderungsprotokoll – Egg Timer

> **Antwort auf: „Kannst du mir sagen, was du gemacht hast?"**
>
> Hier ist eine vollständige, verständliche Übersicht aller Änderungen, die am Projekt vorgenommen wurden – mit Erklärung warum.

---

## Was wurde geändert und warum?

### 1. Fehlende Bild-Dateien behoben (Fenster-Icons)

**Problem:**
In allen HTML-Seiten wurden die Fenster-Icons so referenziert:
```html
<img src="assets/minimize.png">
<img src="assets/close.png">
```
Diese Dateien existierten **nicht** im `assets/`-Ordner. Die Icons waren daher unsichtbar.

**Lösung:**
Die tatsächlich vorhandenen Dateinamen wurden verwendet:
```html
<img src="assets/8664917_window_minimize_icon.png">
<img src="assets/211651_close_round_icon.png">
```

---

### 2. Animiertes GIF für Rührei war kaputt

**Problem:**
In `script.js` wurde folgende Datei referenziert:
```js
gif: 'assets/egg-scrambled.gif'
```
Die Datei heißt aber:
```
assets/egg-scramble.gif   ← kein 'd' am Ende
```
Die Animation des Rühreis wurde deshalb **nie angezeigt**.

**Lösung:**
```js
gif: 'assets/egg-scramble.gif'  // korrekter Dateiname
```

---

### 3. Snooze-Button hat immer weiches Ei neu gestartet

**Problem:**
In `done.html` war der Snooze-Button so programmiert:
```html
<button onclick="window.location.href='timer.html?egg=soft'">Snooze</button>
```
Egal welches Ei gewählt wurde — nach dem Drücken von „Snooze" wurde **immer** ein weiches Ei neu gestartet.

**Lösung:**
Der Snooze-Button liest nun den Ei-Typ aus der URL und gibt ihn weiter:
```js
var egg = new URLSearchParams(window.location.search).get('egg') || 'soft';
document.getElementById('snooze-btn').addEventListener('click', function() {
    window.location.href = 'timer.html?egg=' + encodeURIComponent(egg);
});
```

---

### 4. App zu einer Single-Page-Application (SPA) zusammengeführt

**Problem:**
Die App war auf 4 separate HTML-Seiten aufgeteilt:
- `index.html` → Start-Screen
- `menu.html` → Auswahl des Ei-Typs
- `timer.html` → Countdown
- `done.html` → Fertig-Meldung

Das bedeutete:
- Jede Seite hatte denselben `<head>`-Block (viermal dupliziert).
- Bei jedem Seitenwechsel wurde die gesamte Seite neu geladen.
- Es gab keinen einfachen Weg, den Zustand (z.B. welches Ei gewählt wurde) zwischen den Seiten zu teilen.

**Lösung:**
Alle 4 Screens wurden in ein einziges `index.html` zusammengeführt. Jeder Screen ist ein `<div>` mit dem `hidden`-Attribut — nur der aktive Screen ist sichtbar:
```html
<div id="screen-start">...</div>
<div id="screen-menu" hidden>...</div>
<div id="screen-timer" hidden>...</div>
<div id="screen-done" hidden>...</div>
```
Das JavaScript blendet die Screens ein und aus, ohne die Seite neu zu laden.

Die alten Seiten (`menu.html`, `timer.html`, `done.html`) wurden **nicht gelöscht** — sie sind repariert und funktionieren weiterhin, falls jemand direkt auf sie verlinkt hat.

---

### 5. Timer-Logik verbessert (setInterval statt setTimeout)

**Problem:**
Der originale Timer in `script.js` verwendete einen rekursiv aufrufenden `setTimeout`:
```js
function updateTimer() {
    // ...
    if(time > 0) {
        time--;
        setTimeout(updateTimer, 1000); // ruft sich selbst auf
    }
}
```
Das Problem: Einmal gestartet, konnte dieser Timer **nicht gestoppt** werden. Der „Cancel"-Button führte zwar zur Menu-Seite, aber der Timer lief im Hintergrund weiter und machte den „Fertig"-Sound, selbst wenn der Nutzer abgebrochen hatte.

**Lösung:**
Stattdessen wird nun `setInterval` verwendet, das mit `clearInterval` jederzeit gestoppt werden kann:
```js
timerInterval = setInterval(function() {
    if (remaining > 0) {
        remaining--;
        timerEl.textContent = formatTime(remaining);
    } else {
        clearInterval(timerInterval); // sauber stoppen
        // ...
    }
}, 1000);

// Im Cancel-Button:
document.getElementById('btn-cancel').addEventListener('click', function() {
    clearInterval(timerInterval); // Timer wirklich stoppen
    showScreen('screen-menu');
});
```

---

### 6. Event-Handler modernisiert

**Problem:**
Alle Buttons nutzten veraltete `onclick=`-Attribute direkt im HTML:
```html
<button onclick="window.location.href='menu.html'">Start</button>
```

**Lösung:**
Stattdessen werden jetzt saubere Event-Listener in `script.js` verwendet:
```js
document.getElementById('btn-start').addEventListener('click', function() {
    showScreen('screen-menu');
});
```
Das trennt HTML (Struktur) und JavaScript (Logik) sauber voneinander.

---

### 7. PWA-Unterstützung hinzugefügt (installierbar auf Android & iOS)

**Neues File: `manifest.json`**

Eine Web-App muss eine Manifest-Datei haben, damit Browser sie als installierbare App erkennen:
```json
{
    "name": "Egg Timer",
    "short_name": "Egg Timer",
    "display": "standalone",
    "background_color": "#ffeaa7",
    "theme_color": "#ffea79",
    "icons": [{ "src": "assets/egg-soft.png", "sizes": "512x512" }]
}
```

**Neues File: `sw.js` (Service Worker)**

Ein Service Worker ist ein kleines Script, das im Hintergrund läuft und alle App-Dateien im Cache speichert. Dadurch funktioniert die App auch **ohne Internetverbindung**:
```js
// Beim ersten Laden werden alle Dateien gecacht
caches.open('eggtimer-v1').then(cache => cache.addAll([
    './index.html', './style.css', './script.js', /* ... */
]));

// Bei jedem weiteren Laden: zuerst aus dem Cache antworten
self.addEventListener('fetch', event => {
    event.respondWith(caches.match(event.request) || fetch(event.request));
});
```

**Neue Meta-Tags in `index.html`**

Damit die App auf iPhones wie eine native App aussieht:
```html
<meta name="theme-color" content="#ffea79" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-title" content="Egg Timer" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
```

---

### 8. `.gitignore` hinzugefügt

macOS erstellt automatisch `.DS_Store`-Dateien in jedem Ordner. Diese Dateien gehören nicht ins Git-Repository. Die neue `.gitignore`-Datei sorgt dafür, dass sie künftig ignoriert werden.

---

### 9. `README.md` erstellt

Die App hatte keine Dokumentation. Die neue `README.md` enthält:
- App-Konzept mit Screen-Übersicht
- Plattform-Unterstützung (Web, Android, iOS)
- Schritt-für-Schritt-Anleitung für GitHub Pages Deployment
- Tabelle mit nächsten Schritten (was noch zu tun ist)

---

## Zusammenfassung aller geänderten Dateien

| Datei | Art der Änderung |
|---|---|
| `index.html` | Komplett neu: SPA mit allen 4 Screens, PWA-Meta-Tags, korrekte Icon-Referenzen |
| `script.js` | Komplett neu: SPA-Logik, `setInterval`, Event-Listener, Service-Worker-Registrierung |
| `done.html` | Repariert: Snooze-Bug behoben, korrekte Icon-Referenzen |
| `timer.html` | Repariert: eigenständige Inline-Logik, korrekte Icon- und GIF-Referenzen |
| `menu.html` | Repariert: korrekte Icon-Referenzen |
| `manifest.json` | Neu erstellt: PWA-Manifest für Installation auf Android & iOS |
| `sw.js` | Neu erstellt: Service Worker für Offline-Unterstützung |
| `README.md` | Neu erstellt: vollständige Dokumentation auf Deutsch |
| `.gitignore` | Neu erstellt: `.DS_Store`-Dateien werden ignoriert |

---

## Was musst du noch selbst tun?

| Aufgabe | Warum nötig? | Aufwand |
|---|---|---|
| **GitHub Pages aktivieren** | Damit die App per HTTPS erreichbar ist (nötig für PWA-Installation) | ~2 Minuten: Settings → Pages → main → / (root) |
| **App-Icon erstellen** | Für Play Store & App Store wird ein 512×512px Icon benötigt | [PWABuilder](https://www.pwabuilder.com) oder [Canva](https://canva.com) |
| **Google Play Store** | Damit Android-Nutzer die App im Store finden | Google Play Konto (einmalig $25) + [PWABuilder](https://www.pwabuilder.com) |
| **Apple App Store** | Damit iPhone-Nutzer die App im Store finden | Apple Developer Konto ($99/Jahr) + [PWABuilder](https://www.pwabuilder.com) |
| **Eigene Domain** | Für eine professionelle URL wie `eggtimer.app` | Domain kaufen (~$10/Jahr) und auf GitHub Pages zeigen |
| **Push-Benachrichtigungen** | Damit der Timer auch bei gesperrtem Bildschirm benachrichtigt | Komplexer — braucht Backend (z.B. Firebase) |
