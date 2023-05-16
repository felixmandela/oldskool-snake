const playArea = document.querySelector('.play-area');
const scoreBoard = document.querySelector('.scoreboard')
document.addEventListener('keydown', handleRestartButton)
document.addEventListener('keydown', handleDirectionChange)
const gameboyBody = document.getElementById('gameboy')
const gameOverScreen = document.getElementById('gameover-screen')
const screenStyle = document.getElementById('screen')
const lightSwitch = document.getElementById('light-toggle')
const audioSwitch = document.getElementById('audio-toggle')
const arrowUpButton = document.getElementById('arrow-up-button')
const arrowDownButton = document.getElementById('arrow-down-button')
const arrowLeftButton = document.getElementById('arrow-left-button')
const arrowRightButton = document.getElementById('arrow-right-button')
const startButton = document.getElementById('start-toggle')


let foodX;
let foodY;
let snakeX = 10;
let snakeY = 10;
let moveX = 0;
let moveY = 0;
let snakeBody = [];
let runGame;
let baseScore = 0;
let highScore = 0;
let audioOn = false;

// audio

const playSwitchSound = function () {
    const switchSound = new Audio('assets/audio/switch-audio-2.mp3')
    switchSound.play()
}

const playGameOverSound = function () {
    const gameOverSound = new Audio('assets/audio/death-audio-2.mp3')
    gameOverSound.play()
}

const playEatFoodSound = function () {
    const eatFoodSound = new Audio('assets/audio/eat-food-audio.mp3')
    eatFoodSound.play()
}

const playLevelPassedSound = function () {
    const levelPassedSound = new Audio('assets/audio/level-passed-audio.mp3')
    levelPassedSound.play()
}

const playGameStartSound = function () {
    const gameStartSound = new Audio('assets/audio/game-start-audio-2.mp3')
    gameStartSound.play()
}


// switch logic
lightSwitch.onclick = function () {
    playSwitchSound()
    if (lightSwitch.checked) {
        screenStyle.style.opacity = 1;
    } else { screenStyle.style.opacity = 0.65; }
}

audioSwitch.onclick = function () {
    playSwitchSound()
    if (audioSwitch.checked) {
        audioOn = true;
    } else { audioOn = false }
}

// arrow button logic
arrowUpButton.onclick = function () {
    moveX = 0;
    moveY = -1;
}
arrowDownButton.onclick = function () {
    moveX = 0;
    moveY = 1;
}
arrowLeftButton.onclick = function () {
    moveX = -1;
    moveY = 0;
}
arrowRightButton.onclick = function () {
    moveX = 1;
    moveY = 0;
}

// start button logic
startButton.onclick = function () {
    restartGame();
}

//gameover logic
const gameOver = function () {
    clearInterval(runGame)
    gameboyBody.style.animation = 'shake 0.2s linear';
    screenStyle.style.filter = 'grayscale(1)';
    gameOverScreen.style.opacity = 1;
}


const getRandomFoodPosition = () => {
    foodX = Math.floor(Math.random() * 20) + 1;
    foodY = Math.floor(Math.random() * 20) + 1;
}

function handleDirectionChange(e) {

    if (e.key === 'ArrowUp' && moveY !== 1) {
        moveX = 0;
        moveY = -1;
    }
    else if (e.key === 'ArrowDown' && moveY !== -1) {
        moveX = 0;
        moveY = 1;
    }
    else if (e.key === 'ArrowLeft' && moveX !== 1) {
        moveX = -1;
        moveY = 0;
    }
    else if (e.key === 'ArrowRight' && moveX !== -1) {
        moveX = 1;
        moveY = 0;
    };
}

function handleRestartButton(e) {
    if (e.key === ' ') {
        restartGame();
    }
}

function restartGame() {
    if (audioOn) {
        playGameStartSound()
    }
    clearInterval(runGame)
    snakeX = 10
    snakeY = 10
    moveX = 0
    moveY = 0
    snakeBody = []
    baseScore = 0
    gameOverScreen.style.opacity = 0;
    startGame()
}

function updateScoreboard() {
    const updatedScoreboard = `
        <span class='score'>SCORE: ${baseScore}</span>
        <span class='high-score'>HIGH SCORE: ${highScore}</span>
    `;
    scoreBoard.innerHTML = updatedScoreboard;
}

function moveSnake() {
    // arrange new position for the board, currently only for food
    let newPosition = `<div class='food' style='grid-area: ${foodY} / ${foodX}'></div>`;


    // define position based on arrow pressed
    snakeX += moveX;
    snakeY += moveY;


    // logic for eating food
    if (foodX === snakeX && foodY === snakeY) {
        if (baseScore == highScore) {
            highScore++
        }
        baseScore++
        if (audioOn) {
            if (baseScore % 5 === 0) {
                playLevelPassedSound()
            } else {
                playEatFoodSound()
            }
        }
        snakeBody.push([,]);
        getRandomFoodPosition();
        gameboyBody.style.animation = '';
        if (baseScore % 5 === 0) {
            gameboyBody.style.filter = `drop-shadow(0 0 ${baseScore * 0.03}rem rgb(255,${255 - 2 * baseScore},0))`
            gameboyBody.style.animation = 'level-up 0.3s ease'
        }

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
            if (audioOn) {
                playGameOverSound()
            }
            gameOver()
            return
        }
    }

    // for every added snake body part, add new element into newPosition
    for (let i = 0; i < snakeBody.length; i++) {
        newPosition += `<div class='player' style='grid-area: ${snakeBody[i][0]} / ${snakeBody[i][1]}'></div>`;
    }

    // logic for gameover
    // snake crash the wall / out of bound
    if (snakeX <= 0 || snakeX > 20 || snakeY <= 0 || snakeY > 20) {
        if (audioOn) {
            playGameOverSound()
        }
        gameOver()
        return
    }

    updateScoreboard();
    // print and update the snake and food
    playArea.innerHTML = newPosition;
}



function startGame() {
    getRandomFoodPosition();
    screenStyle.style.filter = 'grayscale(0)';
    gameboyBody.style.filter = 'none'
    gameboyBody.style.animation = '';
    runGame = setInterval(moveSnake, 150)
}

startGame();
