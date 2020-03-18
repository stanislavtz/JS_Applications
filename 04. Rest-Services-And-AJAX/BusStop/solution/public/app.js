function getInfo() {

    const inputStopId = document.querySelector('#stopId');
    const stopName = document.querySelector('#stopName');

    const busesRef = document.querySelector("#buses");

    fetch('http://localhost:3000/businfo')
    .then(x => x.json())
    .then(x => {
        const valueToAppend = x[inputStopId.value];
        
        if (!valueToAppend) {
            stopName.textContent = 'Error';
            return;
        }
        
        stopName.textContent = valueToAppend.name;

        Object.entries(valueToAppend.buses).forEach(([busId, time]) => {
            let bus = document.createElement('li');
            bus.textContent = `Bus ${busId} arrives in ${time}`;

            busesRef.appendChild(bus);
        });
    });
}