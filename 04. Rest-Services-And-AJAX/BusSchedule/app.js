let result = (function solve() {
    const busInfo = document.querySelector('.info');
    const departBtn = document.querySelector('#depart');
    const arriveBtn = document.querySelector('#arrive');

    const baseUrl = `http://localhost:8000/schedule/`;

    const getUrl = function (id) {
        return baseUrl + `${id}.json`;
    }
    
    let currentId = 'depot';
    let currentStop;
    let result;

    async function depart() {
        result = await fetch(getUrl(currentId)).then(r => r.json());

        busInfo.textContent = `Next stop ${result.name}`;
        currentStop = result.name;
        currentId = result.next;

        departBtn.disabled = true;
        arriveBtn.disabled = false;
    }

    async function arrive() {
        busInfo.textContent = `Arriving at ${currentStop}`;
        departBtn.disabled = false;
        arriveBtn.disabled = true;
    }

    return {
        depart,
        arrive
    };
})();