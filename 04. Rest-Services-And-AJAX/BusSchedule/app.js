function solve() {
    const departBtn = document.querySelector('#depart');
    const arriveBtn = document.querySelector('#arrive');
    const infoEl = document.querySelector('.info');
   
    const url = "http://localhost:8000/schedule/";
    
    let nextBusStop = "depot";
    let busStop;
    
    function getUrl(input) {
        return `${url}${input}`;
    }

    async function depart() {
        busStop = await fetch(getUrl(nextBusStop)).then(r => r.json());
        nextBusStop = busStop.next;
        infoEl.textContent = `Next stop ${busStop.name}`;

        arriveBtn.disabled = false;
        departBtn.disabled = true;
    }

    function arrive() {
        infoEl.textContent = `Arriving at ${busStop.name}`;

        arriveBtn.disabled = true;
        departBtn.disabled = false;
    }
   
    return {
        depart,
        arrive
    };
};

const result = solve(); 