function attachEvents() {
    const btnLoad = document.getElementById('btnLoad');
    const btnCreate = document.getElementById('btnCreate');

    const person = document.getElementById('person');
    const phone = document.getElementById('phone');
    const phonebook = document.getElementById('phonebook');

    let nextId;

    function getDB(){
        return fetch('https://phonebook-448f6.firebaseio.com/phonebook.json')
                .then(x => x.json())
                .then(x => x.filter(x => !!x));
    } 

    btnLoad.addEventListener('click', () => {
        getDB()
            .then(userToDisplay => {
                nextId = userToDisplay.length + 1;
                userToDisplay.forEach(user => {
                    let personLi = document.createElement('li');
                    personLi.textContent = `${user.person}: ${user.phone}`;
                    phonebook.appendChild(personLi);
                });
            });
    });

    btnCreate.addEventListener('click', () => {
        let newPerson = {
            person: person.value,
            phone: phone.value
        }

        getDB()
            .then(id => {
                fetch(`https://phonebook-448f6.firebaseio.com/phonebook/${id.length + 1}.json`, {
                    method: 'PUT',
                    body: JSON.stringify(newPerson)
                })
            });
    });
}

attachEvents();