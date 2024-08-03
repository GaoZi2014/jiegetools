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

let copyright = document.getElementById("copyright")

document.addEventListener('keydown', function(event) {
    if (event.code === 'KeyQ') {
        copyright.style.display = "none";
    }
});