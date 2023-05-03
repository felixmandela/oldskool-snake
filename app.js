const playarea = document.querySelector(".play-area");

let foodX = Math.floor(Math.random() * 30) + 1;
let foodY = Math.floor(Math.random() * 30) + 1;

const runGame = () => {
    playarea.innerHTML = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`
}

runGame()