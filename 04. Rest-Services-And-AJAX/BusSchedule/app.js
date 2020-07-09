function solve() {
    const busInfo = document.querySelector('.info');
    const departBtn = document.querySelector('#depart');
    const arriveBtn = document.querySelector('#arrive');

    const baseUrl = `https://bus-schedule-3c03a.firebaseio.com/busSchedule`;

    let stopId = 'depot';

    const getUrl = function (id) {
        return `${baseUrl}/schedule/${id}.json`;
    }

    function depart() {
        fetch(getUrl(stopId))
            .then(res => res.json())
            .then(busStop => {
                busInfo.textContent = `Next stop ${busStop.name}`;
            });

        departBtn.disabled = true;
        arriveBtn.disabled = false;
    }

    function arrive() {
        const depotId = stopId
        fetch(getUrl(stopId))
            .then(res => res.json())
            .then(busStop => {
                busInfo.textContent = `Arriving at ${busStop.name}`;
                stopId = busStop.next;
            });

        departBtn.disabled = false;
        arriveBtn.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();