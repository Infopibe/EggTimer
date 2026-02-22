// Mapping Eier-Arten auf Infos
const eggs = {
    soft:  { label: "Soft Boiled Egg",  gif: "assets/egg-soft.gif",  time: 3 * 60 },
    hard:  { label: "Hard Boiled Egg",  gif: "assets/egg-hard.gif",  time: 8 * 60 },
    fried: { label: "Fried Egg",        gif: "assets/egg-fried.gif", time: 5 * 60 },
    scrambled: { label: "Scrambled Egg", gif: "assets/egg-scrambled.gif", time: 7 * 60 }
};

function getQueryParam(param) {
    return new URLSearchParams(window.location.search).get(param);
}

window.onload = function() {
    // TIMER LOGIK
    if(document.getElementById("egg-type-label")) {
        const type = getQueryParam('egg') || 'soft';
        const egg = eggs[type] || eggs['soft'];

        document.getElementById("egg-type-label").textContent = egg.label;
        document.getElementById("egg-gif").src = egg.gif;

        const timerEl = document.getElementById("timer-countdown");
        const sound = document.getElementById("timer-sound");

        const endTime = Date.now() + egg.time * 1000;
        let intervalId;
        let finished = false;

        function updateTimer() {
            const remaining = Math.max(0, Math.round((endTime - Date.now()) / 1000));
            const min = String(Math.floor(remaining / 60)).padStart(2, '0');
            const sec = String(remaining % 60).padStart(2, '0');
            timerEl.textContent = `${min}:${sec}`;
            if(remaining <= 0 && !finished) {
                finished = true;
                clearInterval(intervalId);
                sound.play();
                setTimeout(() => {
                    window.location.href = "done.html?egg=" + type;
                }, 1400); // nach Sound
            }
        }

        updateTimer();
        intervalId = setInterval(updateTimer, 250);

        window.addEventListener('beforeunload', function() {
            clearInterval(intervalId);
        });
    }
};

