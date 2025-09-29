let milliseconds = 0,
  seconds = 0,
  minutes = 0,
  hours = 0;

let display = document.getElementById("stopwatch-display");
let interval = null;
let running = false;
let lapsContainer = document.getElementById("laps");

function updateTime() {
  milliseconds += 10;
  if (milliseconds === 1000) {
    milliseconds = 0;
    seconds++;
  }
  if (seconds === 60) {
    seconds = 0;
    minutes++;
  }
  if (minutes === 60) {
    minutes = 0;
    hours++;
  }

  let h = hours < 10 ? "0" + hours : hours;
  let m = minutes < 10 ? "0" + minutes : minutes;
  let s = seconds < 10 ? "0" + seconds : seconds;
  let ms = milliseconds.toString().padStart(3, "0");

  display.textContent = `${h}:${m}:${s}.${ms}`;
}

// Start/Stop Toggle Button
let startStopBtn = document.getElementById("start-stop-button");

startStopBtn.addEventListener("click", () => {
  if (!running) {
    // Start
    interval = setInterval(updateTime, 10);
    running = true;
    startStopBtn.textContent = "Stop";
  } else {
    // Stop
    clearInterval(interval);
    running = false;
    startStopBtn.textContent = "Start";
  }
});

// Reset Button
document.getElementById("reset-button").addEventListener("click", () => {
  clearInterval(interval);
  running = false;
  milliseconds = seconds = minutes = hours = 0;
  display.textContent = "00:00:00.000";
  lapsContainer.innerHTML = "";
  startStopBtn.textContent = "Start";
});

// Lap Button
document.getElementById("lap-button").addEventListener("click", () => {
  if (running) {
    let lapTime = display.textContent;
    let lapItem = document.createElement("div");
    lapItem.className = "lap-item";
    lapItem.textContent = `Lap ${
      lapsContainer.children.length + 1
    }: ${lapTime}`;
    lapsContainer.appendChild(lapItem);
  }
});

// Theme Toggle
let toggleBtn = document.getElementById("toggleTheme");
let body = document.body;

toggleBtn.addEventListener("click", () => {
  if (body.classList.contains("light")) {
    body.classList.replace("light", "dark");
    toggleBtn.textContent = "Switch to Light Mode ☀️";
  } else {
    body.classList.replace("dark", "light");
    toggleBtn.textContent = "Switch to Dark Mode 🌙";
  }
});
