class Game {
    constructor(howManyHole) {
        this.points = 0;
        this.holes = [];
        this.ball = new Ball(this.checkBallInHole);
        this.timeStart = Date.now();
        this.timeEnd;
        this.howManyHole = howManyHole;
        this.generateHole();
    }

    generateHole = () => {
        const screenWidth = document.querySelector('.game-wrap').clientWidth;
        const screenHeight = document.querySelector('.game-wrap').clientHeight;
        for (let i = 0; i < this.howManyHole; i++) {
            const x = Math.floor(Math.random() * ((screenWidth - 100) - 100)) + 100
            const y = Math.floor(Math.random() * ((screenHeight - 100) - 100)) + 100
            const hole = new Hole(i, x, y);
            this.holes.push(hole)
        }
        this.setActiveHole();
    }

    setActiveHole = () => {
        const holeActive = document.querySelector(`#hole-${this.holes[this.points].id}`)
        holeActive.classList.add('active');
    }

    checkBallInHole = () => {
        const ballXMin = (Math.floor(this.ball.x))
        const ballXMax = ballXMin + this.ball.size
        const ballYMin = (Math.floor(this.ball.y))
        const ballYMax = ballYMin + this.ball.size

        const holeXMin = this.holes[this.points].x + 5;
        const holeXMax = this.holes[this.points].x + this.holes[this.points].size - 5;
        const holeYMin = this.holes[this.points].y + 5;
        const holeYMax = this.holes[this.points].y + this.holes[this.points].size - 5;

        if ((((ballYMin > holeYMin) && (ballYMax < holeYMax)) && ((ballXMin > holeXMin) && (ballXMax < holeXMax)))) {
            this.handlePoint();
        }
    }

    handlePoint = () => {
        const holeActive = document.querySelector(`#hole-${this.holes[this.points].id}`)
        holeActive.remove();
        this.points++;

        if (this.howManyHole == this.points) {
            clearInterval(this.ball.gameLoop);
            this.timeEnd = Date.now() - this.timeStart
            const gamepanel = document.createElement('div');
            gamepanel.classList.add('game-panel');
            const p = document.createElement('p');
            p.classList.add('time')
            p.innerHTML = `Twój czas
            ${this.timeEnd * 0.001} sekund`
            gamepanel.appendChild(p);
            document.querySelector('body').appendChild(gamepanel);
        } else {
            this.setActiveHole();
        }
    }
}