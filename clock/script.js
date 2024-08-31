let container = document.querySelector("#container");
setInterval(resizeGame, 50);
setInterval(updateClock, 50);
setTimeout(hideTips, 8000);

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

const clockElement = document.getElementById('clock');

function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    clockElement.innerText = `${hours}:${minutes}:${seconds}`;
    clockElement.style.fontSize = `${window.innerWidth / 6}px`;
    clockElement.style.textAlign = 'center';
    clockElement.style.position = 'absolute';
    clockElement.style.top = '50%';
    clockElement.style.left = '50%';
    clockElement.style.transform = 'translate(-50%, -50%)';
}

let copyright = document.getElementById("copyright")

document.addEventListener('keydown', function(event) {
    if (event.code === 'KeyQ') {
        copyright.style.display = "none";
    }
});

copyright.addEventListener('click', function() {
    copyright.style.display = "none";
});

function hideTips() {
    document.getElementById("tips").style.opacity = "0";
    setTimeout(function() {
        document.getElementById("tips").style.display = "none";
    }, 800)
}

const colorChanger = document.getElementById("colorChanger");
let isColorChangerVisible = false;

document.addEventListener('keydown', function(event) {
  if (event.code === 'KeyS') {
    isColorChangerVisible = true;
    colorChanger.style.display = "block";
  } else if (event.code === 'KeyH') {
    isColorChangerVisible = false;
    colorChanger.style.display = "none";
  }
});

let dblClickCount = 0;

document.addEventListener('click', function(event) {
  dblClickCount++;
  if (dblClickCount % 2 === 1) {
    colorChanger.style.display = "block";
  } else {
    colorChanger.style.display = "none";
  }
});

const colorInput = document.getElementById('colorInput');
const applyButton = document.getElementById('applyColor');

applyButton.addEventListener('click', () => {
    const colorCode = colorInput.value.trim();
    if (colorCode.match(/^([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)) {
        document.body.style.backgroundColor = "#" + colorCode;
    } else {
        alert('Invalid color code. Please enter a valid hex code (e.g. FFFFFF).');
    }
});