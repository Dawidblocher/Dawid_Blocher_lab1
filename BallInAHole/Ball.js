class Ball {
    constructor(checkBallInHole) {
        this.x = 100;
        this.y = 100;
        this.size = 30;
        this.ball = document.createElement("div");
        this.createBall();
        this.moveRateX = 0;
        this.moveRateY = 0;
        this.startmove();
        this.checkBallInHole = checkBallInHole;
        this.gameLoop;
    }

    createBall() {
        this.ball.classList.add('ball');
        this.ball.style.width = this.size + 'px';
        this.ball.style.height = this.size + 'px';
        this.ball.style.left = this.x + 'px';
        this.ball.style.top = this.y + 'px';
        document.querySelector('.game-wrap').appendChild(this.ball);
    }

    startmove() {
        this.moveEvent = window.addEventListener('deviceorientation', (e) => this.handleBallSpeed(e.gamma, e.beta), true)
        this.gameLoop = setInterval(() => this.move(), 10);
    }

    move = () => {
        this.ball.style.left = this.x + 'px';
        this.ball.style.top = this.y + 'px';
        this.x += this.moveRateX
        this.y += this.moveRateY
        this.checkBallInHole()
    }

    handleBallSpeed = (gamma, beta) => {
        this.moveRateX += gamma / 200;
        this.moveRateY += beta / 200;
    }

}