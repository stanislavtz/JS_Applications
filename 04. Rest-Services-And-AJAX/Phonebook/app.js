function attachEvents() {
    const btnLoad = document.getElementById('btnLoad');
    const btnCreate = document.getElementById('btnCreate');

    const person = document.getElementById('person');
    const phone = document.getElementById('phone');
    const phonebook = document.getElementById('phonebook');

    let nextId;

    function getDB() {
        return fetch('https://phonebook-448f6.firebaseio.com/phonebook.json')
            .then(x => x.json())
            .then(x => {
                nextId = Object.keys(x)[Object.keys(x).length - 1];
                return Object.entries(x);
            })
    }

    btnLoad.addEventListener('click', () => {
        loadPhoneBook();
    });


    btnCreate.addEventListener('click', () => {
        let newPerson = {
            person: person.value,
            phone: phone.value
        }

        getDB()
        .then(
            fetch(`https://phonebook-448f6.firebaseio.com/phonebook/${Number(nextId) + 1}.json`, {
                method: 'PUT',
                body: JSON.stringify(newPerson)
            })
            .then(() => {
                person.value = '';
                phone.value = '';
                loadPhoneBook();
            })
        );
    });

    function loadPhoneBook() {
        phonebook.innerHTML = '';
        getDB()
        .then(usersToDisplay => {
            Array.from(usersToDisplay).forEach(([id, user]) => {
                if (user) {
                    let span = document.createElement('span');
    
                    const btnDelete = document.createElement('button');
                    btnDelete.setAttribute('id', 'btnDelete');
                    btnDelete.textContent = 'Delete';
                    btnDelete.addEventListener('click', () => {
                        fetch(`https://phonebook-448f6.firebaseio.com/phonebook/${Number(id)}.json`, {
                            method: 'DELETE'
                        })
                        .then(loadPhoneBook);
                    });
    
                    let personLi = document.createElement('li');
                    
                    personLi.textContent = `${user.person}: ${user.phone}`;
                    personLi.append(btnDelete);
    
                    span.appendChild(personLi);
    
                    phonebook.appendChild(span);
                }
            });
        });
    }
}

attachEvents();