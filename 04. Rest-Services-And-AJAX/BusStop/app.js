async function getInfo() {
    const stopIdEl = document.querySelector('#stopId');
    const stopNameEl = document.querySelector("#stopName");
    const busesUl = document.querySelector("#buses");

    const baseUrl = `http://localhost:8000/businfo/`;
    const url = function (id) {
        return `${baseUrl}${id}.json`;
    }

    try {
        busesUl.textContent = '';

        let result = await fetch(url(stopIdEl.value)).then(r => r.json());
        stopNameEl.textContent = result.name;

        Object.entries(result.buses).forEach(([busId, bTime]) => {
            const li = document.createElement('li');
            li.textContent = `Bus ${busId} arrives in ${bTime}`;
            busesUl.appendChild(li);
        });
    } catch (error) {
        stopNameEl.textContent = 'Error';
        return;
    } 

    stopIdEl.value = '';
}