var images = [
    "img/01.jpg",
    "img/02.jpg",
    "img/03.jpg",
    "img/04.jpg",
    "img/05.jpg"
]

var current = 0

function previous() {
    if (current > 0) {
        current = current - 1;
        document.getElementById("slideshow").
            setAttribute("src", images[current]);
        document.getElementById("currentNumber").innerText = current + 1;
    }
}

function next() {
    if (current < (images.length - 1)) {
        current = current + 1;
        document.getElementById("slideshow").
            setAttribute("src", images[current]);
        document.getElementById("currentNumber").innerText = current + 1;

    }
}