class WeatherApp
{
    constructor(apiKey){
        this.city = null;
        this.apiKey = apiKey;
        this.data = null;
    }

    handleChangeCity(city){
        this.city = city;
    }

    getData(){
        if(this.city){
            const api= `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.apiKey}`;
            fetch(api)
                .then(response => {
                if (response.ok) {
                  return response;
                }
                 throw Error("Błąd");
                })
                .then(response => response.json())
                .then(data => {
                    this.data = data;
                    this.displayWeather();
                    console.log(data)
                })
                .catch(error => console.log(error))
        }
    }

    displayWeather(){
        const wrap = document.querySelector('.weather');
        wrap.innerHTML = Math.floor(this.data.main.temp - 273.15) +1;
    }
}
