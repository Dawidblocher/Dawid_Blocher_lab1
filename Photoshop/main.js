document.addEventListener('DOMContentLoaded', appStart);

function appStart() {
    const myPs = new Photoshop('canvas');
    const btnColor = document.querySelector('#color');
    const btnSize = document.querySelector('#range');
    window.addEventListener('resize', (e) => myPs.setSizeCanvas(e))

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

    document
        .querySelectorAll('.selectImg').forEach(img => img.addEventListener('click', () => {
            myPs.chooseImg(img.src);
            document.querySelectorAll('.selectImg').forEach(item => item.classList.remove('imgActive'));
            img.classList.add('imgActive');
        }))

    document
        .querySelector('#imgBtn')
        .addEventListener('click', () => {
            myPs.setBrush('img')
        })


    btnColor.addEventListener('change', () => myPs.setColorBrush(btnColor.value));
    btnSize.addEventListener('change', () => myPs.setSizeBrush(btnSize.value))
    document.querySelector('#clear').addEventListener('click', () => myPs.clearWorkspace());
    document.querySelector('#darken').addEventListener('click', () => myPs.darkenFilter());
    document.querySelector('#brightnes').addEventListener('click', () => myPs.brightnesFilter());
    document.querySelector('#contrast').addEventListener('click', () => myPs.contrastFilter());
    document.querySelector('#black').addEventListener('click', () => myPs.blackAndWhiteFilter());



}