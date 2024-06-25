// script.js

let startTime;
let updatedTime;
let difference = 0; // Initialize difference to 0
let tInterval;
let running = false;
let lapNumber = 1;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');
const animationContainer = document.getElementById('animationContainer');
const smoke = document.querySelector('.smoke');

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', recordLap);

function startStop() {
    if (!running) {
        startTime = new Date().getTime() - difference;
        tInterval = setInterval(getShowTime, 10);
        startStopBtn.innerHTML = "Pause";
        running = true;
        startAnimation();
    } else {
        clearInterval(tInterval);
        difference = new Date().getTime() - startTime;
        startStopBtn.innerHTML = "Start";
        running = false;
        stopAnimation();
    }
}

function reset() {
    clearInterval(tInterval);
    difference = 0; // Reset difference to 0
    running = false;
    display.innerHTML = "00:00:00.0";
    startStopBtn.innerHTML = "Start";
    laps.innerHTML = "";
    lapNumber = 1;
    stopAnimation();
}

function recordLap() {
    if (running) {
        const li = document.createElement('li');
        li.innerText = `Lap ${lapNumber}: ${display.innerText}`;
        laps.appendChild(li);
        lapNumber++;
    }
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((difference % 1000) / 100);

    display.innerHTML = (hours > 9 ? hours : "0" + hours) + ":" +
                        (minutes > 9 ? minutes : "0" + minutes) + ":" +
                        (seconds > 9 ? seconds : "0" + seconds) + "." + milliseconds;
}

function startAnimation() {
    smoke.style.animationPlayState = 'running';
}

function stopAnimation() {
    smoke.style.animationPlayState = 'paused';
}
