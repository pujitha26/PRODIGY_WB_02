let startTime;
let updatedTime;
let difference;
let timerInterval;
let isRunning = false;
let laps = [];

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('lapsList');

function startStop() {
    if (!isRunning) {
        startTime = new Date().getTime() - (difference || 0);
        timerInterval = setInterval(updateDisplay, 10); // Update every 10 milliseconds
        startStopBtn.textContent = 'Pause';
        isRunning = true;
    } else {
        clearInterval(timerInterval);
        startStopBtn.textContent = 'Start';
        isRunning = false;
    }
}

function reset() {
    clearInterval(timerInterval);
    display.textContent = '00:00:00.00';
    startStopBtn.textContent = 'Start';
    isRunning = false;
    difference = 0;
    laps = [];
    updateLaps();
}

function lap() {
    if (isRunning) {
        const lapTime = display.textContent;
        laps.push(lapTime);
        updateLaps();
    }
}

function updateDisplay() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    const time = new Date(difference);
    const minutes = String(time.getUTCMinutes()).padStart(2, '0');
    const seconds = String(time.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(Math.floor(time.getUTCMilliseconds() / 10)).padStart(2, '0'); // Show hundredths of a second
    display.textContent = `${minutes}:${seconds}:${milliseconds}`;
}

function updateLaps() {
    lapsList.innerHTML = '';
    laps.forEach((lap, index) => {
        const li = document.createElement('li');
        li.textContent = `Lap ${index + 1}: ${lap}`;
        lapsList.appendChild(li);
    });
}

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);
