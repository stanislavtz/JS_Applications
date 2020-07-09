function solve() {
    const busInfo = document.querySelector('.info');
    const departBtn = document.querySelector('#depart');
    const arriveBtn = document.querySelector('#arrive');

    const baseUrl = `https://bus-schedule-3c03a.firebaseio.com/busSchedule/schedule/`;

    let stopId = 'depot';
    let tempStop;

    const getUrl = function (id) {
        return baseUrl + `${id}.json`;
    }

    function depart() {
        fetch(getUrl(stopId))
            .then(res => res.json())
            .then(busStop => {
                busInfo.textContent = `Next stop ${busStop.name}`;
                tempStop = busStop;
            });

        departBtn.disabled = true;
        arriveBtn.disabled = false;
    }

    function arrive() {
        busInfo.textContent = `Arriving at ${tempStop.name}`;
        stopId = tempStop.next;

        departBtn.disabled = false;
        arriveBtn.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();