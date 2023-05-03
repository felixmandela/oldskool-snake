const playarea = document.querySelector(".play-area");
document.addEventListener("keydown", changeDirection)

let foodX;
let foodY;
let snakeX = 15;
let snakeY = 15;
let newPosition = '';
let moveX = 0;
let moveY = 0;

const randomFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

function changeDirection(d) {
    if (d.key == "ArrowUp") {
        moveX = 0;
        moveY = -1;
    }
    else if (d.key == "ArrowDown") {
        moveX = 0;
        moveY = 1;
    }
    else if (d.key == "ArrowLeft") {
        moveX = -1;
        moveY = 0;
    }
    else if (d.key == "ArrowRight") {
        moveX = 1;
        moveY = 0;
    };
}

const runGame = () => {
    snakeX += moveX;
    snakeY += moveY;
    newPosition = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;
    newPosition += `<div class="player" style="grid-area: ${snakeY} / ${snakeX}"></div>`;
    playarea.innerHTML = newPosition;
}


randomFoodPosition();
setInterval(runGame, 1000 / 10)