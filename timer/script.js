let container = document.querySelector("#container");
setInterval(resizeGame, 50);

function resizeGame() {
    let gameRatio = container.offsetWidth / container.offsetHeight;
    let windowRatio = window.innerWidth / window.innerHeight;
    
    container.style.position = "absolute";
    container.style.left = `${(window.innerWidth - container.offsetWidth) / 2}px`;
    container.style.top = `${(window.innerHeight - container.offsetHeight) / 2}px`;

    let newScale;
    if (gameRatio > windowRatio) {
        newScale = window.innerWidth / container.offsetWidth - 0.05;
        if (newScale > 1) newScale = 1;
    }
    else {
        newScale = window.innerHeight / container.offsetHeight - 0.05;
        if (newScale > 1) newScale = 1;
    }
    container.style.transform = `scale(${newScale})`;
}

let shiftClickCount = 0;

document.addEventListener('keydown', function(event) {
    if (event.shiftKey) {
        shiftClickCount++;
        if (shiftClickCount === 5) {
            shiftClickCount = 0;
            window.location.href = 'https://jiegetools.netlify.app';
        }
    }
});

let copyright = document.getElementById("copyright")

document.addEventListener('keydown', function(event) {
    if (event.code === 'KeyQ') {
        copyright.style.display = "none";
    }
});

copyright.addEventListener('click', function() {
    copyright.style.display = "none";
});

// Get the input elements
const hoursInput = document.getElementById('hours-input');
const minutesInput = document.getElementById('minutes-input');
const secondsInput = document.getElementById('seconds-input');
const endTextInput = document.getElementById('end-text-input');
const startTimerBtn = document.getElementById('start-timer-btn');
const timerDisplay = document.getElementById('timer-display');
const timeInput = document.getElementById('time-input');
const label = document.getElementById('label');

function startTimer() {
    const hours = parseInt(hoursInput.value);
    const minutes = parseInt(minutesInput.value);
    const seconds = parseInt(secondsInput.value);
    const endText = endTextInput.value;

    timeInput.style.display = "none";
    endTextInput.style.display = "none";
    startTimerBtn.style.display = "none";
    label.style.display = "none";

    if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
      alert("Please don't leave any of it blank.");
      location.reload();
    }

    let totalSeconds = hours * 3600 + minutes * 60 + seconds + 1;

    let intervalId = setInterval(() => {
      totalSeconds -= 1;

      const hoursDisplay = Math.floor(totalSeconds / 3600);
      const minutesDisplay = Math.floor((totalSeconds % 3600) / 60);
      const secondsDisplay = totalSeconds % 60;
      timerDisplay.textContent = `${hoursDisplay.toString().padStart(2, '0')}:${minutesDisplay.toString().padStart(2, '0')}:${secondsDisplay.toString().padStart(2, '0')}`;

      if (totalSeconds === 0) {
        clearInterval(intervalId);
        timerDisplay.textContent = endText;
      }
    }, 1000);
  }

// Add event listener to the start timer button
startTimerBtn.addEventListener('click', startTimer);