const appId = '0B226E9E-0FEE-198C-FFB8-A1F33FE1C200';
const appKey = 'E34C4B0E-ED31-489F-BCA1-389C7640DB60';
const dbUrl = `https://api.backendless.com/${appId}/${appKey}/data/books`;

function getUrl(endP) {
    return `${dbUrl}${endP}`;
}

export async function loadBooks() {
    const response = await fetch(getUrl(""));
    const books = await response.json();
    if(Object.keys(books).length === 0) {
        throw new Error("BooksList is empty");
    }

    return books;
}

export async function addBook(book) {
    const res = await fetch(getUrl(""), {
        method: "POST",
        body: JSON.stringify(book),
        headers: {
            "Content-Type": "application/json"
        }
    });
    const newBook = await res.json();

    return newBook;
}

export async function updateBook(id, obj) {
    const res = await fetch(getUrl(`/${id}`), {
        method: "PUT",
        body: JSON.stringify(obj),
        headers: {
            "Content-Type": "application/json"
        }
    });
    const updatedBook = await res.json();

    return updatedBook;
}

export async function deleteBook(id) {
    const res = await fetch(getUrl(`/${id}`), { method: "DELETE" });
    const result = await res.json();

    return result;
}



















// const appId = '073AB9AC-15B2-8B1B-FF3A-8D533EA5FC00';
// const apiKey = '3819B039-46E8-4468-A24E-FF32E4B2A261';

// function host(endPoint) {
//     return `https://api.backendless.com/${appId}/${apiKey}/data/${endPoint}`;
// }

// export async function getBooks() {
//     const res = await fetch(host('books'));
//     const books = await res.json()
//     return books;
// }

// export async function addBook(book) {
//     for (const key of Object.keys(book)) {
//         if (!book[key]) {
//             document.querySelector(`#${key}`).placeholder = `Place correct ${key}!`;
//             throw new Error(`The ${key} should not be empty!!!`);
//         }
//     }

//     const res = await fetch(host('books'), {
//         method: 'POST',
//         body: JSON.stringify(book),
//         headers: {
//             "Content-Type": "application/json"
//         }
//     });

//     const newbook = await res.json();
//     return newbook;
// }

// export async function updateBook(book, newBook) {
//     Object.keys(newBook).map(key => {
//         if(!newBook[key]){
//             newBook[key] = book[key];
//         }
//     });

//     const res = await fetch(host(`books/${book.objectId}`), {
//         method: 'PUT',
//         body: JSON.stringify(newBook),
//         headers: {
//             "Content-Type": "application/json"
//         }
//     });

//     return await res.json();
// }

// export async function deleteBook(id) {
//     const res = await fetch(host(`books/${id}`), {
//         method: 'DELETE'
//     });
//     return res;
// }