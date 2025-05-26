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

        let time = egg.time;
        const timerEl = document.getElementById("timer-countdown");
        const sound = document.getElementById("timer-sound");

        function updateTimer() {
            const min = String(Math.floor(time / 60)).padStart(2, '0');
            const sec = String(time % 60).padStart(2, '0');
            timerEl.textContent = `${min}:${sec}`;
            if(time > 0) {
                time--;
                setTimeout(updateTimer, 1000);
            } else {
                timerEl.textContent = "00:00";
                sound.play();
                setTimeout(() => {
                    window.location.href = "done.html";
                }, 1400); // nach Sound
            }
        }
        updateTimer();
    }
};

