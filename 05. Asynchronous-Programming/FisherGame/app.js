function attachEvents() {
    let CREATE_URL = 'https://fisher-game.firebaseio.com/catches.json';

    const elements = Array.from(document.querySelectorAll('#addForm input'));
    const addBtn = document.querySelector('#addForm button.add');
    
    addBtn.addEventListener('click', addCatch);

    async function addCatch() {
        const currentCatch = {
            angler: elements[0].value,
            weight: elements[1].value,
            species: elements[2].value,
            location: elements[3].value,
            bait: elements[4].value,
            captureTime: elements[5].value
        }

        const options = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(currentCatch)
        }

        try {
            const response = await fetch(CREATE_URL, options);
            const data = await response.json();
            
            const thisCatch = document.createElement('div');
            thisCatch.setAttribute('class', 'catch');
            thisCatch.setAttribute('data-id', `${data.name}`);

            thisCatch.innerHTML = ` 
            <label>Angler</label>
            <input type="text" class="angler" value="${currentCatch.angler}" />
            <hr>
            <label>Weight</label>      
            <input type="number" class="weight" value="${currentCatch.weight}" />
            <hr>
            <label>Species</label>
            <input type="text" class="species" value="${currentCatch.species}" />
            <hr>
            <label>Location</label>
            <input type="text" class="location" value="${currentCatch.location}" />
            <hr>
            <label>Bait</label>
            <input type="text" class="bait" value="${currentCatch.bait}" />
            <hr>
            <label>Capture Time</label>
            <input type="number" class="captureTime" value="${currentCatch.captureTime}" />
            <hr>
            <button class="update">Update</button>
            <button class="delete">Delete</button>
            `

            document.querySelector('#catches').appendChild(thisCatch);
            console.log(data)
            document.getElementsByClassName('delete')
            const deleteBtns =  Array.from(document.getElementsByClassName('delete'));
            console.log(deleteBtns);
            deleteBtn.addEventListener('click', deleteCatch(data.name));

        } catch (err) {
            console.error(err);
        }
    }

    async function deleteCatch(id) {
        try {
            const catchId = id;

            const response = await fetch(`https://fisher-game.firebaseio.com/catches/${catchId}.json`, {
                method: "DELETE",
                headers: {
                    'Content-type': 'application/json',
                }
            });
        } catch (err) {
            console.error(err);
        }
    }
}

attachEvents();