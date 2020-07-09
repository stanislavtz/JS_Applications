function solve() {
    const connectionRef = document.querySelector('.info');
    const departBtn = document.querySelector('#depart');
    const arriveBtn = document.querySelector('#arrive');

    let currentStopId = '';

    function getBusInfo(id){
        if(!id) {
            id = 'depot';
        }

        return fetch(`http://localhost:8000//schedule/${id}.json`);
    }

    function depart() {
        getBusInfo(currentStopId)
        .then(x => x.json())
        .then(x => {
            connectionRef.textContent = `Next stop ${x.name}`;
        });

        departBtn.disabled = true;
        arriveBtn.disabled = false;
    }

    function arrive() {
        getBusInfo(currentStopId)
        .then(x => x.json())
        .then(x => {
            connectionRef.textContent = `Arriving at ${x.name}`;
            currentStopId = x.next;
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