let copyright = document.getElementById("copyright")

document.addEventListener('keydown', function(event) {
    if (event.code === 'KeyQ') {
        copyright.style.display = "none";
    }
});

copyright.addEventListener('click', function() {
    copyright.style.display = "none";
});