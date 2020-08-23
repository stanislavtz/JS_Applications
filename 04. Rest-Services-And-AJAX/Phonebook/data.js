function getUrl(endPoint) {
    return `http://localhost:8000/phonebook/${endPoint}`;
}

export function loadContacts() {
    return fetch(getUrl(``)).then(r => r.json());
}

export function createContact(contact) {
    return fetch(getUrl(''), {
        method: 'POST',
        body: JSON.stringify(contact)
    })
        .then(r => r.json());
}

export function deleteContact(id) {
    return fetch(getUrl(`${id}`), {
        method: "DELETE"
    })
        .then(r => r.json());
}