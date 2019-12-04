class Photoshop {
    constructor(targetElementId) {
        this.canvas = document.querySelector('#' + targetElementId)
        this.canvas.width = window.innerWidth - 200;
        this.ctx = canvas.getContext('2d');
        this.canvas.addEventListener('touchmove', (e) => this.onTouchMove(e))
        this.canvas.addEventListener('touchstart', (e) => this.onTouchMove(e))
        this.canvas.addEventListener('mousemove', (e) => this.onMouseMove(e))
        this.canvas.addEventListener('mousedown', (e) => this.onMouseDown(e))
        this.canvas.addEventListener('mouseup', (e) => this.onMouseUp(e))
        this.canPaint = false;
        this.brushShapeName = 'square';
        this.brushColor = '#000';
        this.brushSize = 10;
        this.selectedImg = './img/testObraz.jpg';

    }
    setSizeCanvas(e) {
        this.canvas.width = e.target.innerWidth - 200;
    }

    onMouseDown(e) {
        this.canPaint = true;
        this.brushShape = new Brush(this.brushShapeName, this.brushColor, this.brushSize);
        // ustal położenie
        let x = e.layerX;
        let y = e.layerY;
        this.ctx.beginPath();
        this.ctx.fillStyle = this.brushShape.color;
        this.ctx.strokeStyle = this.brushShape.color;
        switch (this.brushShape.shape) {
            case 'square':
                this.drawSquare(x, y);
                break;
            case 'circle':
                this.drawCircle(x, y);
                break;
            case 'star':
                this.drawStar(x, y);
                break;
            case 'img':
                this.drawImage(this.selectedImg, x, y)
                break;
        }
        this.ctx.stroke();
    }
    onMouseUp(e) {
        this.canPaint = false;
    }

    onMouseMove(e) {
        if (this.canPaint) {
            this.brushShape = new Brush(this.brushShapeName, this.brushColor, this.brushSize);
            // ustal położenie
            let x = e.layerX;
            let y = e.layerY;
            this.ctx.beginPath();
            this.ctx.fillStyle = this.brushShape.color;
            this.ctx.strokeStyle = this.brushShape.color;
            switch (this.brushShape.shape) {
                case 'square':
                    this.drawSquare(x, y);
                    break;
                case 'circle':
                    this.drawCircle(x, y);
                    break;
                case 'star':
                    this.drawStar(x, y);
                    break;
                case 'img':
                    this.drawImage(this.selectedImg, x, y)
                    break;
            }
            this.ctx.stroke();
        }

    }

    onTouchMove(e) {
        // pobierz pędzel
        this.brushShape = new Brush(this.brushShapeName, this.brushColor, this.brushSize);
        // ustal położenie
        let x = e.touches[0].clientX - this.canvas.offsetLeft - 8;
        let y = e.touches[0].clientY - this.canvas.offsetTop - 8;
        this.ctx.beginPath();
        this.ctx.fillStyle = this.brushShape.color;
        this.ctx.strokeStyle = this.brushShape.color;
        switch (this.brushShape.shape) {
            case 'square':
                this.drawSquare(x, y);
                break;
            case 'circle':
                this.drawCircle(x, y);
                break;
            case 'star':
                this.drawStar(x, y);
                break;
            case 'img':
                this.drawImage(this.selectedImg, x, y)
                break;
        }
        this.ctx.stroke();
    }

    drawSquare(x, y) {
        this.ctx.fillRect(x - (this.brushShape.size / 2), y - (this.brushShape.size / 2), this.brushShape.size, this.brushShape.size);
    }

    drawCircle(x, y) {
        this.ctx.arc(x, y, this.brushShape.size / 2, 0, 10 * Math.PI);
        this.ctx.fill();
    }

    drawStar(x, y) {
        const size = this.brushShape.size / 10;
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo((x + 20 * size), y);
        this.ctx.lineTo((x - 10 * size), (y + 20 * size));
        this.ctx.lineTo(x, (y - 15 * size));
        this.ctx.lineTo((x + 10 * size), (y + 20 * size));
        this.ctx.lineTo(x - 20 * size, y);
        this.ctx.lineTo(x, y);
        this.ctx.fill();
        this.ctx.stroke();

    }

    setBrush(brushShape) {
        this.brushShapeName = brushShape;
        if (this.brushShapeName === 'img') {
            document.querySelector('.imgChoose').classList.toggle('active');
        } else {
            document.querySelector('.imgChoose').classList.remove('active');
        }
    }

    setColorBrush(color) {
        this.brushColor = color;
    }

    setSizeBrush(size) {
        document.querySelector('.labelSize').innerHTML = `Size: ${size}`;
        this.brushSize = size;
    }

    clearWorkspace() {
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
    }

    drawImage(img, x, y) {
        if (document.querySelector('.imgChoose').classList[1] !== 'active')
            return;
        this.clearWorkspace()
        const image = new Image();
        image.src = img;
        image.addEventListener('load', () => {
            this.ctx.drawImage(image, x, y);
        })
    }


    darkenFilter(amount = 30) {
        const canvasData = this.ctx.getImageData(0, 0, this.canvas.width, 600);
        for (let i = 0; i < canvasData.data.length; i += 4) {
            canvasData.data[i] -= amount
            canvasData.data[i + 1] -= amount
            canvasData.data[i + 2] -= amount
        }
        this.ctx.putImageData(canvasData, 0, 0)
    }

    brightnesFilter(amount = 30) {
        const canvasData = this.ctx.getImageData(0, 0, this.canvas.width, 600);
        for (let i = 0; i < canvasData.data.length; i += 4) {
            canvasData.data[i] += amount
            canvasData.data[i + 1] += amount
            canvasData.data[i + 2] += amount
        }
        this.ctx.putImageData(canvasData, 0, 0)
    }
    contrastFilter(amount = 1.2) {
        const canvasData = this.ctx.getImageData(0, 0, this.canvas.width, 600);
        for (let i = 0; i < canvasData.data.length; i += 4) {
            canvasData.data[i] *= amount
            canvasData.data[i + 1] *= amount
            canvasData.data[i + 2] *= amount
        }
        this.ctx.putImageData(canvasData, 0, 0)
    }

    blackAndWhiteFilter() {
        const canvasData = this.ctx.getImageData(0, 0, this.canvas.width, 600);
        for (let i = 0; i < canvasData.data.length; i += 4) {
            let grayscale = canvasData.data[i] * .3 + canvasData.data[i + 1] * .59 + canvasData.data[i + 2] * .11;
            canvasData.data[i] = grayscale
            canvasData.data[i + 1] = grayscale
            canvasData.data[i + 2] = grayscale
        }
        this.ctx.putImageData(canvasData, 0, 0)
    }
    chooseImg(img) {
        this.selectedImg = img;
    }


}