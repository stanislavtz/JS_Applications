let result = (function solve() {
    const busInfo = document.querySelector('.info');
    const departBtn = document.querySelector('#depart');
    const arriveBtn = document.querySelector('#arrive');

    const baseUrl = `http://localhost:8000/schedule/`;

    const getUrl = function (id) {
        return baseUrl + `${id}.json`;
    }
    
    let stopId = 'depot';
    let tempStop;

    function depart() {
        fetch(getUrl(stopId))
            .then(res => res.json())
            .then(busStop => {
                console.log(busStop)
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
})();