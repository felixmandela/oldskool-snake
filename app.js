const playArea = document.querySelector(".play-area");
const scoreBoard = document.querySelector(".scoreboard")
document.addEventListener("keydown", handleRestartButton)
document.addEventListener("keydown", handleDirectionChange)

let foodX;
let foodY;
let snakeX = 15;
let snakeY = 15;
let moveX = 0;
let moveY = 0;
let snakeBody = [];
let runGame;
let baseScore = 0;
let highScore = 0;


const getRandomFoodPosition = () => {
    foodX = Math.floor(Math.random() * 20) + 1;
    foodY = Math.floor(Math.random() * 20) + 1;
}

function handleDirectionChange(e) {

    if (e.key === "ArrowUp" && moveY !== 1) {
        moveX = 0;
        moveY = -1;
    }
    else if (e.key === "ArrowDown" && moveY !== -1) {
        moveX = 0;
        moveY = 1;
    }
    else if (e.key === "ArrowLeft" && moveX !== 1) {
        moveX = -1;
        moveY = 0;
    }
    else if (e.key === "ArrowRight" && moveX !== -1) {
        moveX = 1;
        moveY = 0;
    };
}

function handleRestartButton(e) {
    if (e.key === " ") {
        restartGame();
    }
}

function restartGame() {
    clearInterval(runGame)
    snakeX = 15
    snakeY = 15
    moveX = 0
    moveY = 0
    snakeBody = []
    baseScore = 0
    startGame()
}

function updateScoreboard() {
    const updatedScoreboard = `
        <span class="score">SCORE: ${baseScore}</span>
        <span class="high-score">HIGH SCORE: ${highScore}</span>
    `;
    scoreBoard.innerHTML = updatedScoreboard;
}

function moveSnake() {
    // arrange new position for the board, currently only for food
    let newPosition = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;


    // define position based on arrow pressed
    snakeX += moveX;
    snakeY += moveY;


    // logic for eating food
    if (foodX === snakeX && foodY === snakeY) {
        snakeBody.push([,]);
        getRandomFoodPosition();
        if (baseScore == highScore) {
            highScore++
        }
        baseScore++
    }

    // logic for gameover
    // snake crash the wall / out of bound
    if (snakeX <= 0 || snakeX > 20 || snakeY <= 0 || snakeY > 20) {
        alert("game over")
        restartGame()
    }

    // add the snake length everytime it eats food
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }


    snakeBody[0] = [snakeY, snakeX]

    // logic for gameover
    // ssnake crash into its own body
    for (let i = snakeBody.length - 1; i > 0; i--) {
        if (snakeBody[0][0] === snakeBody[i][0] && snakeBody[0][1] === snakeBody[i][1]) {
            alert("game over")
            restartGame()
        }
    }

    // for every added snake body part, add new element into newPosition
    for (let i = 0; i < snakeBody.length; i++) {
        newPosition += `<div class="player" style="grid-area: ${snakeBody[i][0]} / ${snakeBody[i][1]}"></div>`;
    }

    updateScoreboard();
    // print and update the snake and food
    playArea.innerHTML = newPosition;
}

function startGame() {
    getRandomFoodPosition();
    runGame = setInterval(moveSnake, 100)
}

startGame();
