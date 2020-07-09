function getInfo() {
    const stopId = document.querySelector('#stopId');
    const stopName = document.querySelector('#stopName');
    const buses = document.querySelector("#buses");

    const url = `https://judgetests.firebaseio.com/businfo/${stopId.value}.json`;

    fetch(url)
        .then(x => x.json())
        .then(res => {
            buses.textContent = '';
            stopName.textContent = res.name;

            Object.entries(res.buses).forEach(([busId, time]) => {
                const li = document.createElement('li');
                li.textContent = `Bus ${busId} arrives in ${time}`;
                buses.appendChild(li);
            });

            stopId.value = '';
        })
        .catch((err) => {
            stopName.textContent = "Error";
            stopId.value = '';
            buses.textContent = '';

            throw new Error('Invalid busstop name!!!');
        });
}