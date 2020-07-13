const appId = '073AB9AC-15B2-8B1B-FF3A-8D533EA5FC00';
const apiKey = '3819B039-46E8-4468-A24E-FF32E4B2A261';

function host(endPoint) {
    return `https://api.backendless.com/${appId}/${apiKey}/data/${endPoint}`;
}

export async function getBooks() {
    const res = await fetch(host('books'));
    const body = await res.json()
    return body;
}

export async function addBook(book) {
    for (const key of Object.keys(book)) {
        if (!book[key]) {
            document.querySelector(`#${key}`).placeholder = `Place correct ${key}!`;
            throw new Error(`The ${key} should not be empty!!!`);
        }
    }

    const res = await fetch(host('books'), {
        method: 'POST',
        body: JSON.stringify(book),
        headers: {
            "Content-Type": "application/json"
        }
    });

    const body = await res.json();
    return body;
}

export async function updateBook(book, newBook) {
    Object.keys(newBook).map(key => {
        if(!newBook[key]){
            newBook[key] = book[key];
        }
    });

    const res = await fetch(host(`books/${book.objectId}`), {
        method: 'PUT',
        body: JSON.stringify(newBook),
        headers: {
            "Content-Type": "application/json"
        }
    });

    return await res.json();
}

export async function deleteBook(id) {
    const res = await fetch(host(`books/${id}`), {
        method: 'DELETE'
    });
    return res;
}