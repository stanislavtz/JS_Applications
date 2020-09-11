function getUrl(input) {
    return `http://localhost:8000/phonebook/${input}`;
}

export function loadContacts() {
    return fetch(getUrl('')).then(r => r.json());
}

export function createContact(contact) {
    const obj = {
        method: 'POST',
        body: JSON.stringify(contact)
    };

    return fetch(getUrl(''), obj).then(r => r.json());
}

export function deleteContact(id) {
    const obj = { method: 'DELETE' };

    return fetch(getUrl(id), obj);
}