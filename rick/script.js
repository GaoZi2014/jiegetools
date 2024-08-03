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

let spaceClickCount = 0;

document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        spaceClickCount++;
        if (spaceClickCount === 5) {
            spaceClickCount = 0;
            window.location.href = 'https://jiegetools.netlify.app/rick/vid_onlymd';
        }
    }
});

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

let video = document.getElementById("video");
let videoWrapper = document.getElementById("video-wrapper");
let description = document.getElementById("des");

function next() {
    let btnContainer = document.getElementById("play-pause-button");

    btnContainer.innerHTML = '<button onclick="play()">Play</button><br><button id="pause-btn" onclick="pause()">Pause</button>';
    description.innerHTML = 'Click "Play" to play the video.';
    videoWrapper.style.height = "480px";
    setTimeout(resizeGame, 500);
}

function play() {
    let title = document.getElementById("title");
    title.style.fontSize = "28px";
    setTimeout(resizeGame, 500);
    description.innerHTML = 'Never Gonna Give You Up';
    video.style.transform = "scale(1)";
    video.style.opacity = "1";
    video.play();
}

function pause() {
    video.style.transform = "scale(0.1)";
    video.style.opacity = "0";
    video.pause();
}

let copyright = document.getElementById("copyright")

document.addEventListener('keydown', function(event) {
    if (event.code === 'KeyQ') {
        copyright.style.display = "none";
    }
});