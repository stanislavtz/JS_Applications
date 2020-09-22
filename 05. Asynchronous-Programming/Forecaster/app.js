import * as data from "./data.js";
import el from "../cr_el.js"

window.addEventListener('load', attachEvents);

const symbols = {
    'sunny': "&#x2600;",
    'partly sunny': "&#x26C5;",
    'overcast': "&#x2601;",
    'rain': "&#x2614;",
    'degrees': "&#176;"
}

function attachEvents() {

    const getBtn = document.querySelector(`#submit`);
    const locationEl = document.querySelector('#location');
    const forecastEl = document.querySelector('#forecast');

    const currentEl = document.querySelector('#current');
    const upcomingEl = document.querySelector('#upcoming');

    getBtn.addEventListener('click', loadForecasts);

    async function loadForecasts() {
        try {
            let todayForecastData;
            let upcomingForecastData;

            const input = locationEl.value;
            const locations = await data.getLocation();
            const location = locations.find(l => l.name === input);
            const locationCode = location.code;
            
            Promise.all([
                todayForecastData = await data.getTodayForcast(locationCode),
                upcomingForecastData = await data.getUpcommingForcasts(locationCode)                
            ]);

            showCurrentForecast(todayForecastData);
            showUpcomingForecasts(upcomingForecastData);

            locationEl.value = '';
        } catch (error) {
            errorMessage()
        }
    }

    function showUpcomingForecasts(upcomingForecastData) {
        upcomingEl.lastChild.remove();

        const div = el('div', '', { className: 'forecast-info' });
        upcomingEl.appendChild(div);

        const forecasts = upcomingForecastData.forecast;
        forecasts.forEach(forecast => {
            const span = el('span', '', { className: 'upcoming' });
            const symbolSpan = el('span', '', { className: 'symbol' });
            const degreesSpan = el('span', '', { className: 'forecast-data' });
            const weatherSpan = el('span', forecast.condition, { className: 'forecast-data' });

            symbolSpan.innerHTML = symbols[forecast.condition.toLowerCase()];
            degreesSpan.innerHTML = `${forecast.low}${symbols.degrees}/${forecast.high}${symbols.degrees}`;

            span.appendChild(symbolSpan);
            span.appendChild(degreesSpan);
            span.appendChild(weatherSpan);

            div.append(span);
        });
    }

    function showCurrentForecast(todayForecastData) {
        currentEl.lastChild.remove();
        const condition = todayForecastData.forecast.condition;

        const div = el('div', '', { className: 'forecast' });
        const symbolSpan = el('span', '', { className: 'condition symbol' });
        const conditionSpan = el('span', '', { className: 'condition' });
        const locationSpan = el('span', todayForecastData.name, { className: 'forecast-data' });
        const degreesSpan = el('span', '', { className: 'forecast-data' });
        const weatherSpan = el('span', todayForecastData.forecast.condition, { className: 'forecast-data' });

        symbolSpan.innerHTML = symbols[condition.toLowerCase()];
        degreesSpan.innerHTML = `${todayForecastData.forecast.low}${symbols.degrees}/${todayForecastData.forecast.high}${symbols.degrees}`;

        conditionSpan.appendChild(locationSpan);
        conditionSpan.appendChild(degreesSpan);
        conditionSpan.appendChild(weatherSpan);
        div.appendChild(symbolSpan);
        div.appendChild(conditionSpan);
        currentEl.appendChild(div);

        forecastEl.style.display = "block";
    }

    function errorMessage() {
        window.alert('Error: Wrong location. Please reenter location!')
    }
}

