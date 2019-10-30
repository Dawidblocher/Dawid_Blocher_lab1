document.addEventListener('DOMContentLoaded', appStart);

function appStart() {
    const myPs = new Photoshop('canvas');
    const btnColor = document.querySelector('#color');
    const btnSize = document.querySelector('#range');
    const btnFile = document.querySelector('#file');

    document
        .querySelector('#squareBtn')
        .addEventListener('click', () => {
            myPs.setBrush('square')
        })

    document
        .querySelector('#circleBtn')
        .addEventListener('click', () => {
            myPs.setBrush('circle')
        })

    btnColor.addEventListener('change', () => myPs.setColorBrush(btnColor.value));
    btnSize.addEventListener('change', () => myPs.setSizeBrush(btnSize.value))
    document.querySelector('#clear').addEventListener('click', () => myPs.clearWorkspace());
    document.querySelector('#rangeDark').addEventListener('change', (e) => myPs.darkenFilter(e,this.value));
    myPs.drawImage(btnFile.value);
    
}
