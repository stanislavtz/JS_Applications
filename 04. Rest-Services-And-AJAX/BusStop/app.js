function getInfo() {
    const stopIdEl = document.querySelector('#stopId');
    const busesUl = document.querySelector("#buses");
    const stopNameEl = document.querySelector("#stopName");
    const baseUrl = `http://localhost:8000/businfo/`;

    const url = function (id) {
        return `${baseUrl}${id}.json`;
    }

    fetch(url(stopIdEl.value))
        .then(res => res.json())
        .then(result => {
            busesUl.textContent = '';
            stopNameEl.textContent = result.name;

            Object.entries(result.buses).forEach(([busId, time]) => {
                const li = document.createElement('li');
                li.textContent = `Bus ${busId} arrives in ${time}`;

                busesUl.appendChild(li);
            });
        })
        .catch(err => {
            stopNameEl.textContent = "Error";
            busesUl.textContent = '';

            stopIdEl.placeholder = "Invalid stopId!!!";
            setTimeout(stopIdEl.placeholder = '!!! TRY AGAIN !!!', 5000);
        });

    stopIdEl.value = '';
}