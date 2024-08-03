let video = document.getElementById("video");

document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    }
});

let shiftClickCount = 0;

document.addEventListener('keydown', function(event) {
    if (event.shiftKey) {
        shiftClickCount++;
        if (shiftClickCount === 5) {
            shiftClickCount = 0;
            window.location.href = 'https://jiegetools.netlify.app/rick';
        }
    }
});