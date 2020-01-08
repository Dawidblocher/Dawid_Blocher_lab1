class Ball{
    constructor(){
        this.x = 100,
        this.y = 100, 
        this.size = 30,
        this.ball = document.createElement("div"),
        this.createBall(),
        this.moveRate = 2,
        window.addEventListener('deviceorientation', (e) => this.startmove(e))

    }

    createBall(){
        
        this.ball.classList.add('ball');
        this.ball.style.width = this.size + 'px';
        this.ball.style.height = this.size + 'px';
        this.ball.style.left = this.x + 'px';
        this.ball.style.top = this.y + 'px';
        document.querySelector('.game-wrap').appendChild(this.ball);
    }

    startmove(e){
        console.log(e)
        setInterval(() => this.move(e.alpha, e.beta), 10);
        

    }

    move = (alpha, beta) => {
        console.log(alpha)
        this.ball.style.left = this.x + alpha/100 + 'px';
        this.ball.style.top = this.y + beta/100 + 'px';
        this.x += alpha/100
        this.y += beta/100
    }

}
