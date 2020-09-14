const stopIdEl = document.querySelector('#stopId');
const stopNameEl = document.querySelector('#stopName');
const busesListEl = document.querySelector('#buses');
const url = 'http://localhost:8000/businfo/';

function getUrl(endPoint) {
    return `${url}${endPoint}`;
}

async function getInfo() {
    busesListEl.textContent = '';

    try {
        let result = await fetch(getUrl(stopIdEl.value)).then(r => r.json());
        if(!result.name) { throw new Error()}

        stopNameEl.textContent = result.name;

        for (const key in result.buses) {
            const li = document.createElement('li');
            li.textContent = `Bus ${key} arrives in ${result.buses[key]}`;
            busesListEl.appendChild(li);
        }
    } catch (error) {
        stopNameEl.textContent = 'Error';
    }

    stopIdEl.value = '';
}
