const appId = '073AB9AC-15B2-8B1B-FF3A-8D533EA5FC00';
const apiKey = '3819B039-46E8-4468-A24E-FF32E4B2A261';

function host(endPoint) {
    return `https://api.backendless.com/${appId}/${apiKey}/data/${endPoint}`;
}

export async function getBooks() {
    const response = await fetch(host('books'));
    const data = await response.json()
    return data;
}

export async function addBook(book) {

}

export async function updateBook(id) {

}

export async function deleteBook(id) {

}
getBooks()