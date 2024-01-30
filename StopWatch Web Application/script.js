let isRunning = false;
let startTime;
let lapStartTime;
let laps = [];

function startPause() {
    if (!isRunning) {
        isRunning = true;
        startTime = new Date() - (lapStartTime || 0);
        lapStartTime = 0;
        document.getElementById('startPause').innerText = 'Pause';
        update();
    } else {
        isRunning = false;
        lapStartTime = new Date() - startTime;
        document.getElementById('startPause').innerText = 'Resume';
    }
}

function reset() {
    isRunning = false;
    startTime = 0;
    lapStartTime = 0;
    laps = [];
    document.getElementById('startPause').innerText = 'Start';
    document.getElementById('display').innerText = '00:00:00';
    updateLaps();
}

function lap() {
    if (isRunning) {
        const lapTime = new Date() - startTime;
        laps.push(formatTime(lapTime));
        updateLaps();
        lapStartTime = new Date();
    }
}

function update() {
    if (isRunning) {
        const elapsedTime = new Date() - startTime;
        document.getElementById('display').innerText = formatTime(elapsedTime);
        setTimeout(update, 10);
    }
}

function updateLaps() {
    const lapsList = document.getElementById('laps');
    lapsList.innerHTML = "";
    laps.forEach((lap, index) => {
        const li = document.createElement('li');
        li.innerText = `Lap ${index + 1}: ${lap}`;
        lapsList.appendChild(li);
    });
}

function formatTime(time) {
    const date = new Date(time);
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const seconds = date.getUTCSeconds().toString().padStart(2, '0');
    const milliseconds = Math.floor(date.getUTCMilliseconds() / 10).toString().padStart(2, '0');
    return `${minutes}:${seconds}:${milliseconds}`;
}
