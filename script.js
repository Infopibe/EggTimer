// Egg type definitions: label, animation gif, cooking time in seconds
const eggs = {
    soft:      { label: 'Soft Boiled Egg',  gif: 'assets/egg-soft.gif',     time: 3 * 60 },
    hard:      { label: 'Hard Boiled Egg',  gif: 'assets/egg-hard.gif',     time: 8 * 60 },
    fried:     { label: 'Fried Egg',        gif: 'assets/egg-fried.gif',    time: 5 * 60 },
    scrambled: { label: 'Scrambled Egg',    gif: 'assets/egg-scramble.gif', time: 7 * 60 }
};

// Window bar title per screen
const screenTitles = {
    'screen-start': 'Egg Timer ❤',
    'screen-menu':  'Egg Timer – Menu',
    'screen-timer': 'Egg Timer – Timer',
    'screen-done':  'Egg Timer – Done'
};

let currentEgg = 'soft';
let timerInterval = null;

/** Show one screen, hide all others, update window-bar title */
function showScreen(id) {
    document.querySelectorAll('.window-content').forEach(function(el) {
        el.hidden = true;
    });
    document.getElementById(id).hidden = false;
    document.getElementById('window-title').textContent = screenTitles[id] || 'Egg Timer';
}

/** Format seconds as MM:SS */
function formatTime(seconds) {
    var min = String(Math.floor(seconds / 60)).padStart(2, '0');
    var sec = String(seconds % 60).padStart(2, '0');
    return min + ':' + sec;
}

/** Start the countdown timer for the given egg type */
function startTimer(type) {
    currentEgg = type;
    var egg = eggs[type] || eggs['soft'];

    document.getElementById('egg-type-label').textContent = egg.label;
    document.getElementById('egg-gif').src = egg.gif;

    showScreen('screen-timer');

    var remaining = egg.time;
    var timerEl = document.getElementById('timer-countdown');
    var sound = document.getElementById('timer-sound');

    timerEl.textContent = formatTime(remaining);

    clearInterval(timerInterval);
    timerInterval = setInterval(function() {
        if (remaining > 0) {
            remaining--;
            timerEl.textContent = formatTime(remaining);
        } else {
            clearInterval(timerInterval);
            timerInterval = null;
            timerEl.textContent = '00:00';
            sound.play().catch(function() {});
            setTimeout(function() { showScreen('screen-done'); }, 1400);
        }
    }, 1000);
}

// --- Event listeners (set up after DOM is ready) ---

document.getElementById('btn-start').addEventListener('click', function() {
    showScreen('screen-menu');
});

document.querySelectorAll('.egg-option').forEach(function(btn) {
    btn.addEventListener('click', function() {
        startTimer(btn.dataset.egg);
    });
});

document.getElementById('btn-cancel').addEventListener('click', function() {
    clearInterval(timerInterval);
    timerInterval = null;
    showScreen('screen-menu');
});

// Snooze: restart the same egg type that was just cooked
document.getElementById('btn-snooze').addEventListener('click', function() {
    startTimer(currentEgg);
});

document.getElementById('btn-close').addEventListener('click', function() {
    showScreen('screen-start');
});

// Register service worker for offline / PWA support
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('sw.js').catch(function() {});
    });
}
