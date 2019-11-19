document.addEventListener('DOMContentLoaded', appStart);

function appStart(){
    const app = new WeatherApp('483a82149295d0154a809580a3d890f2');
    const cityInput = document.querySelector('#city');
    const searchBtn = document.querySelector('#search');
    cityInput.addEventListener('change', () => app.handleChangeCity(cityInput.value));
    searchBtn.addEventListener('click', () => app.getData());
}