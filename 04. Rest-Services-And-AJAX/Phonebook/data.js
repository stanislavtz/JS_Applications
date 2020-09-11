function getUrl(input) {
    return `http://localhost:8000/` + input;
}

export function loadContacts() {
    return fetch(getUrl('phonebook')).then(r => r.json());
}

export function createContact(contact) {
    const obj = {
        method: 'POST',
        body: JSON.stringify(contact)
    };

    return fetch(getUrl('phonebook'), obj).then(r => r.json());
}

export function deleteContact(id) {
    const obj = { method: 'DELETE' };

    return fetch(getUrl(`phonebook/${id}`), obj);
}