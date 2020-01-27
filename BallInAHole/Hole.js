class Hole {
    constructor(id, x = 0, y = 0) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.size = 50;
        this.createHole();
    }

    createHole() {
        const hole = document.createElement("div");
        hole.classList.add('hole');
        hole.id = `hole-${this.id}`;
        hole.style.width = this.size + 'px';
        hole.style.height = this.size + 'px';
        hole.style.left = this.x + 'px';
        hole.style.top = this.y + 'px';
        hole.style.zIndex = 100 - this.id
        document.querySelector('.game-wrap').appendChild(hole);
    }

}