class Photoshop {
    constructor(targetElementId) {
        this.canvas = document.querySelector('#' + targetElementId)
        this.canvas.width = window.innerWidth - 200;
        this.ctx = canvas.getContext('2d')
        this.canvas.addEventListener('touchmove', (e) => this.onTouchMove(e))
        this.canvas.addEventListener('touchstart', (e) => this.onTouchMove(e))
        this.brushShapeName = 'square';
        this.brushColor = '#000';
        this.brushSize = 10;
        this.selectedImg = './img/testObraz.jpg';

    }
    setSizeCanvas(e) {
        this.canvas.width = e.target.innerWidth - 200;
    }

    onTouchMove(e) {
        // pobierz pędzel
        this.brushShape = new Brush(this.brushShapeName, this.brushColor, this.brushSize);
        // ustal położenie
        let x = e.touches[0].clientX - this.canvas.offsetLeft - 8;
        let y = e.touches[0].clientY - this.canvas.offsetTop - 8;
        console.log(e.touches[0].clientX - this.canvas.offsetLeft);
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
            case 'img':
                this.drawImage(this.selectedImg, x, y)
                break;
            case 'picker':

                this.pickColor(e);

                break;

        }
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

    blackAndWhiteFilter(amount = 1.2) {
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