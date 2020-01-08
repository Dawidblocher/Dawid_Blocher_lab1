window.addEventListener('DOMContentLoaded', appStart)
const holes = []
const screenWidth =document.querySelector('.game-wrap').clientWidth;
const screenHeight =document.querySelector('.game-wrap').clientHeight;

function appStart(){
    const ball = new Ball();

    for(let i = 0; i<9; i++){
        const x = Math.floor(Math.random() * ((screenWidth-100)  -100)) + 100
        const y = Math.floor(Math.random() * ((screenHeight -100) - 100)) +100
        const hole = new Hole(i, x, y);

        holes.push(hole)
    }
}