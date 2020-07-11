function getInfo() {
    const stopId = document.querySelector('#stopId');
    const buses = document.querySelector("div ul");
    const stopName = document.querySelector("#stopName");
    const baseUrl = `https://bus-schedule-3c03a.firebaseio.com/busStop/businfo/`;

    const url = function (id) {
        return `${baseUrl}${id}.json`;
    }

    fetch(url(stopId.value))
        .then(res => res.json())
        .then(result => {
            buses.textContent = '';
            stopName.textContent = result.name;

            Object.entries(result.buses).forEach(([busId, time]) => {
                const li = document.createElement('li');
                li.textContent = `Bus ${busId} arrives in ${time}`;

                buses.appendChild(li);
            });
        })
        .catch(err => {
            stopName.textContent = "Error";
            buses.textContent = '';

            console.error("Invalid stopId!!!");
        });

    stopId.value = '';
}