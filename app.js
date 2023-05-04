const playarea = document.querySelector(".play-area");
document.addEventListener("keydown", changeDirection)
document.addEventListener("keydown", restartButton)

let foodX;
let foodY;
let snakeX = 15;
let snakeY = 15;
let moveX = 0;
let moveY = 0;
let snakeBody = [];
let startGame;

const randomFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

function changeDirection(d) {
    if (d.key == "ArrowUp" && moveY !== 1) {
        moveX = 0;
        moveY = -1;
    }
    else if (d.key == "ArrowDown" && moveY !== -1) {
        moveX = 0;
        moveY = 1;
    }
    else if (d.key == "ArrowLeft" && moveX !== 1) {
        moveX = -1;
        moveY = 0;
    }
    else if (d.key == "ArrowRight" && moveX !== -1) {
        moveX = 1;
        moveY = 0;
    };
}



function game() {
    const runGame = () => {
        let newPosition = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;
        snakeX += moveX;
        snakeY += moveY;

        if (foodX === snakeX && foodY === snakeY) {
            snakeBody.push([,]);
            randomFoodPosition();
        }

        if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
            restartGame()
        }


        for (let i = snakeBody.length - 1; i > 0; i--) {
            snakeBody[i] = snakeBody[i - 1];
        }
        snakeBody[0] = [snakeY, snakeX]


        for (let i = 0; i < snakeBody.length; i++) {
            newPosition += `<div class="player" style="grid-area: ${snakeBody[i][0]} / ${snakeBody[i][1]}"></div>`;
        }
        playarea.innerHTML = newPosition;
    }


    randomFoodPosition();
    startGame = setInterval(runGame, 80)
}

function restartGame() {
    clearInterval(startGame)
    snakeX = 15
    snakeY = 15
    moveX = 0
    moveY = 0
    snakeBody = []
    game()
}

function restartButton(d) {
    if (d.key === " ") {
        restartGame();
    }
}

game()