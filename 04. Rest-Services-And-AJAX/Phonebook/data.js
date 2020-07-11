function getUrl(endPoint) {
    return `https://bus-schedule-3c03a.firebaseio.com/phonebook/${endPoint}.json`
}

export async function loadContacts() {
    return await (await fetch(getUrl(''))).json();
}

export async function createContact(contact) {
    console.log(getUrl(''))
    return await (await fetch(getUrl(''), {
        method: 'POST',
        body: JSON.stringify(contact)
    })).json();
}

export async function deleteContact(id) {
    return await (await fetch(getUrl(id), { method: "DELETE" })).json();
}