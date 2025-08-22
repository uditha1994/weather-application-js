class WeatherView {
    constructor() {
        //DOM elements
        this.locationInput = document.getElementById('location-input');
        this.searchBtn = document.getElementById('search-btn');
        this.toggleUnitBtn = document.getElementById('toggle-unit');
        this.savedLocationContainer = document.getElementById('saved-locations');

        this.currentCity = document.getElementById('current-city');
        this.currentDate = document.getElementById('current-date');
        this.currentWeatherIcon = document.getElementById('current-weather-icon');
        this.currentWeatherDesc = document.getElementById('current-desc');
        this.currentTemp = document.getElementById('current-temp');
        this.currentTempMax = document.getElementById('current-temp-max');
        this.currentTempMin = document.getElementById('current-temp-min');
        this.currentWind = document.getElementById('current-wind');
        this.currentHumidy = document.getElementById('current-humidity');
        this.currentUV = document.getElementById('current-uv');
        this.currentPrecitipation = document.getElementById('current-precipitation');

        this.forecastContainer = document.getElementById('forecast-container');

        this.currentUnit = metric;
    }

    displayCurrentWeather(data) {
        //update location and date
        this.currentCity.textContent = `${data.name}, ${data.sys.country}`;
        this.currentDate.textContent = new Date(data.dt * 1000)
            .toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

        //update weather icon and description
        this.currentWeatherIcon.src =
            `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        this.currentWeatherIcon.alt = data.weather[0].description

        this.currentWeatherDesc.textContent = data.weather[0].description;

        //update weather details
        this.currentTemp.textContent = `${Math.round(data.main.temp)} °C`;
        this.currentTempMax.textContent = `H: ${Math.round(data.main.temp_max)} °C`
        this.currentTempMin.textContent = `L: ${Math.round(data.main.temp_min)} °C`

        this.currentWind.textContent =
            `${data.wind.speed} ${this.currentUnit === 'metric' ? 'km/h' : 'mph'}`;
        this.currentHumidy.textContent = `${data.main.humidity} %`;
        this.currentUV.textContent = '--';
        this.currentPrecitipation.textContent = '--'
    }

    displayForecast(data) {
        //clear previous
        this.forecastContainer.innerHTML = '';

        //group forecast by day
        const dailyForecast = {};

        data.list.forEach(item => {
            const date = new Date(item.dt * 1000).toLocaleDateString();
            if (!dailyForecast[date]) {
                dailyForecast[date] = [];
            }
            dailyForecast[date].push(item);
        });

        let dayCount = 0;

        for (const date in dailyForecast) {
            if (dayCount >= 5) {
                break;
            }

            const dayData = dailyForecast[date];
            const middayForecast = dayData[Math.floor(dayData.length / 2)];
            const dayName = new Date(middayForecast.dt * 1000)
                .toLocaleDateString('en-US', { weekday: 'short' });
            const iconUrl = `https://openweathermap.org/img/wn/${middayForecast.weather[0].icon}.png`;

            const temps = dayData.map(item => item.main.temp);
            const maxTemp = Math.round(Math.max(...temps));
            const minTemp = Math.round(Math.min(...temps));

            // create forecast card
            const forecastCard = document.createElement('div');
            forecastCard.className = 'forcast-card';

            forecastCard.innerHTML = `
                <h3>${dayName}</h3>
                <img src="${iconUrl}" alt="${middayForecast.weather[0].description}">
                <p>${middayForecast.weather[0].description}</p>
                <div class="forcast-temp">
                    <span>${maxTemp}</span>
                    <span>${minTemp}</span>
                </div>
            `;

            this.forecastContainer.appendChild(forecastCard);
            dayCount++;
        }
    }

    displaySavedLocations(locations) {
        this.savedLocationContainer.innerHTML = '';

        locations.forEach(location => {
            const locationElement = document.createElement('div');
            locationElement.className = 'saved-location';
            locationElement.textContent = location;
            this.savedLocationContainer.appendChild(locationElement);
        });
    }

    clearSavedLocations() {
        this.savedLocationContainer.innerHTML = '';
    }

    toggleUnits() {
        this.currentUnit = this.currentUnit ===
            'metric' ? 'imperial' : 'metric';
        this.toggleUnitBtn.textContent = this.currentUnit ===
            'metric' ? '°C / °F' : '°F / °C';
        return this.currentUnit;
    }

    showError(message) {
        alert(message);
    }

    bindEvent(
        handleSearch,
        handleToggleUnit,
        handleSavedLocationClick) {

        this.searchBtn.addEventListener('click', () => {
            const location = this.locationInput.value.trim();
            if (location) {
                handleSearch(location);
            }
        });

        this.locationInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const location = this.locationInput.value.trim();
                if (location) {
                    handleSearch(location);
                }
            }
        });

        this.toggleUnitBtn.addEventListener('click', () => {
            const newUnit = this.toggleUnits();
            handleToggleUnit(newUnit);
        });

        this.savedLocationContainer.addEventListener('click', (e)=>{
            if(e.target.classList.contains('saved-location')){
                handleSavedLocationClick(e.target.textContent);
            }
        });

    }
}