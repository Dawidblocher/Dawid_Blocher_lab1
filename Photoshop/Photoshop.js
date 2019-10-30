class Photoshop {
    constructor(targetElementId) {
        this.canvas = document.querySelector('#' + targetElementId)
        this.ctx = canvas.getContext('2d')
        this.canvas.addEventListener('touchmove', (e) => this.onTouchMove(e))
        this.canvas.addEventListener('touchstart', (e) => this.onTouchMove(e))
        this.brushShapeName = 'square';
        this.brushColor = '#000';
        this.brushSize = 10;

    }

    onTouchMove(e) {
        // pobierz pędzel
        this.brushShape = new Brush(this.brushShapeName, this.brushColor, this.brushSize);
        // ustal położenie
        let x = e.touches[0].clientX - this.canvas.offsetLeft;
        let y = e.touches[0].clientY - this.canvas.offsetTop
        this.ctx.beginPath();
        this.ctx.fillStyle = this.brushShape.color;
        this.ctx.strokeStyle = this.brushShape.color;
        switch (this.brushShape.shape) {
            case 'square':
                this.ctx.fillRect(x - (this.brushShape.size / 2), y - (this.brushShape.size / 2), this.brushShape.size, this.brushShape.size);
                break;
            case 'circle':
                this.ctx.arc(x, y, this.brushShape.size / 2, 0, 10 * Math.PI);
                this.ctx.fill();
                break;
        }
        this.ctx.stroke();

    }

    setBrush(brushShape) {
        this.brushShapeName = brushShape;
    }

    setColorBrush(color) {
        this.brushColor = color;
    }

    setSizeBrush(size) {
        this.brushSize = size;
    }

    clearWorkspace() {
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
    }

    drawImage(){
        const image = new Image();
        image.src = './testObraz.jpg';
        image.addEventListener('load', () => {
            this.ctx.drawImage(image,0,0)
        })
    }

    darkenFilter(e,amount = 30){
        const canvasData = this.ctx.getImageData(0,0,900,600);
        console.log(e)
        for(let i = 0; i < canvasData.data.length; i+=4){
                canvasData.data[i] -= amount
                canvasData.data[i+1] -= amount
                canvasData.data[i+2] -= amount         
        }
        this.ctx.putImageData(canvasData, 0, 0)
    }
}