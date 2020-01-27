window.addEventListener('DOMContentLoaded', appStart)
const holes = []
const screenWidth = document.querySelector('.game-wrap').clientWidth;
const screenHeight = document.querySelector('.game-wrap').clientHeight;

function appStart() {
    const game = new Game(9);

}