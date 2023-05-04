const playArea = document.querySelector(".play-area");
const scoreBoard = document.querySelector(".scoreboard")
document.addEventListener("keydown", restartButton)
document.addEventListener("keydown", changeDirection)


let foodX;
let foodY;
let snakeX = 15;
let snakeY = 15;
let moveX = 0;
let moveY = 0;
let snakeBody = [];
let startGame;
let baseScore = 0;
let highScore = 0;

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



function restartGame() {
    clearInterval(startGame)
    snakeX = 15
    snakeY = 15
    moveX = 0
    moveY = 0
    snakeBody = []
    baseScore = 0
    game()
}

function restartButton(d) {
    if (d.key === " ") {
        restartGame();
    }
}

function game() {
    const runGame = () => {
        let newPosition = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;
        let updatedScore = `<span class="score">SCORE: ${baseScore}</span>
        <span class="high-score">HIGH SCORE: ${highScore}</span>`
        snakeX += moveX;
        snakeY += moveY;

        if (foodX === snakeX && foodY === snakeY) {
            snakeBody.push([,]);
            randomFoodPosition();
            if (baseScore == highScore) {
                highScore++
            }
            baseScore++

        }

        if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
            clearInterval(startGame)
            alert("game over")
            restartGame()
        }
        snakeBody[0] = [snakeY, snakeX]


        for (let i = snakeBody.length - 1; i > 0; i--) {
            snakeBody[i] = snakeBody[i - 1];
        }


        for (let i = 0; i < snakeBody.length; i++) {
            newPosition += `<div class="player" style="grid-area: ${snakeBody[i][0]} / ${snakeBody[i][1]}"></div>`;
        }
        scoreBoard.innerHTML = updatedScore;
        playArea.innerHTML = newPosition;
    }


    randomFoodPosition();
    startGame = setInterval(runGame, 1000)
}


game()