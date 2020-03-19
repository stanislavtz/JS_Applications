function attachEvents() {
    const url = `https://judgetests.firebaseio.com/locations.json`;

    const elements = {
        inputValue: document.querySelector('#location'),
        getBtn: document.querySelector('#submit'),
        forecast: document.querySelector('#forecast'),
        currentWeather: document.querySelector('#current'),
        upcomingWeather: document.querySelector('#upcoming'),
    }

    const symbols = {
        's': '☀',
        'p': '⛅',
        'o': '☁',
        'r': '☂',
        'd': '°'
    }

    const errorHandler = () => {
        elements.forecast.style.display = 'block';
        elements.currentWeather.textContent = 'Error';
        elements.upcomingWeather.style.display = 'none';
    }

    const jsonModifier = (j) => j.json();

    elements.getBtn.addEventListener('click', getCurrentLocation);

    function getCurrentLocation() {
        const location = elements.inputValue.value;
        elements.inputValue.value = '';

        fetch(url)
            .then(jsonModifier)
            .then(x => {
                const currentLocation = x.find(c => c.name === location);
                const cityCode = currentLocation.code;

                Promise.all([
                    getCurrentWeather(cityCode),
                    getUpcommingWeather(cityCode)
                ])
                .then(showCurrentLocationWeather)
                .catch(errorHandler);
            })
            .catch(errorHandler);
    }

    function getCurrentWeather(code) {
        return fetch(`https://judgetests.firebaseio.com/forecast/today/${code}.json`)
            .then(jsonModifier)
            .catch(errorHandler);
    }

    function getUpcommingWeather(code) {
        return fetch(`https://judgetests.firebaseio.com/forecast/upcoming/${code}.json`)
            .then(jsonModifier)
            .catch(errorHandler);
    }

    function showCurrentLocationWeather([todayForrecast, upcommingForecast]) {
        elements.forecast.style.display = 'block';

        showCurrentForecast(todayForrecast, upcommingForecast);
    }

    function showCurrentForecast(today, upcomming) {
        if (elements.currentWeather.textContent = 'Error') {
            elements.currentWeather.innerHTML = ''
            elements.upcomingWeather.style.display = 'block';

        }

        clearContent('forecasts');

        const { condition, high, low } = today.forecast;
        const currentForcastDiv = createHTMLElement('div', ['forecasts']);
        const symbolSpan = createHTMLElement('span', ['condition', 'symbol'], `${symbols[condition[0].toLowerCase()]}`);
        const conditions = createHTMLElement('span', ['condition']);
        const degreaseData = `${low}${symbols.d}/${high}${symbols.d}`;
        const cityNameSpan = createHTMLElement('span', ['forecast-data'], today.name);
        const degreaseSpan = createHTMLElement('span', ['forecast-data'], degreaseData);
        const conditionSpan = createHTMLElement('span', ['forecast-data'], condition);
        conditions.appendChild(cityNameSpan);
        conditions.appendChild(degreaseSpan);
        conditions.appendChild(conditionSpan);
        currentForcastDiv.appendChild(symbolSpan);
        currentForcastDiv.appendChild(conditions);
        elements.currentWeather.appendChild(currentForcastDiv);

        showUpcommingForceast(upcomming);
    }

    function showUpcommingForceast({ forecast, name }) {
        
        clearContent('forecast-info');

        const forecastDiv = createHTMLElement('div', ['forecast-info']);

        forecast.forEach(({ condition, high, low }) => {
            const upcommingSpam = createHTMLElement('spam', ['upcoming']);

            const symbolSpam = createHTMLElement('spam', ['symbol'], symbols[condition[0].toLowerCase()]);

            const degreaseInfo = `${low}${symbols.d}/${high}${symbols.d}`;
            const degreaseSpam = createHTMLElement('spam', ['forecast-data'], degreaseInfo);
            const weatherSpam = createHTMLElement('spam', ['forecast-data'], condition);

            upcommingSpam.appendChild(symbolSpam);
            upcommingSpam.appendChild(degreaseSpam);
            upcommingSpam.appendChild(weatherSpam);

            forecastDiv.appendChild(upcommingSpam);
        });

        elements.upcomingWeather.appendChild(forecastDiv);
    }

    function createHTMLElement(tagName, classNames, text) {
        let element = document.createElement(tagName);

        if (classNames) {
            element.classList.add(...classNames);
        }

        if (text) {
            element.textContent = text;
        }

        return element;
    }

    function clearContent(name) {
        if (document.querySelector(`.${name}`)) {
            document.querySelector(`.${name}`).remove();
        }
    }
}

attachEvents();