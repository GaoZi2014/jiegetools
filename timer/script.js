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

let timerInput = document.getElementById('timer-input');
let endTextInput = document.getElementById('end-text-input');
let startTimerBtn = document.getElementById('start-timer-btn');
let timerDisplay = document.getElementById('timer-display');

// Add styles to timerDisplay

startTimerBtn.addEventListener('click', startTimer);

function startTimer() {
    let duration = parseInt(timerInput.value);
    let endText = endTextInput.value;

    if (isNaN(duration) || duration <= 0) {
        alert('Invalid timer duration');
        return;
    }

    // Hide input fields and button
    timerInput.style.display = "none";
    endTextInput.style.display = "none";
    startTimerBtn.style.display = "none";

    timerDisplay.textContent = duration.toString();
    let intervalId = setInterval(() => {
        duration--;
        timerDisplay.textContent = duration.toString();

        if (duration === 0) {
            clearInterval(intervalId);
            timerDisplay.textContent = endText;
        }
    }, 1000);
}