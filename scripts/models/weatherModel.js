class WeatherModel {
    constructor() {
        this.apiKey = '40f962aa9cd203517a5ed25b0081b04a';
        this.baseUrl = 'https://api.openweathermap.org/data/2.5';
    }

    getCurrentWeather(location, units = 'metric') {
        let url = ''

        if (/^-?\d+\.\d+,-?\d+\.\d+$/.test(location)) {
            url = `${this.baseUrl}/weather?lat=${location.split(',')[0]}&lon=${location.split(',')[1]}&units=${units}&appid=${this.apiKey}`;
        } else {
            url = `${this.baseUrl}/weather?q=${location}&units=${units}&appid=${this.apiKey}`;
        }

        return fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Location not found');
                }
                return response.json();
            });
    }

    getForecast(location, units = 'metric') {
        let url = ''

        if (/^-?\d+\.\d+,-?\d+\.\d+$/.test(location)) {
            url = `${this.baseUrl}/forecast?lat=${location.split(',')[0]}&lon=${location.split(',')[1]}&units=${units}&appid=${this.apiKey}`;
        } else {
            url = `${this.baseUrl}/forecast?q=${location}&units=${units}&appid=${this.apiKey}`;
        }

        return fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Location not found');
                }
                return response.json();
            });
    }
}