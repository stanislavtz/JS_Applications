const baseUrl = "https://fisher-game.firebaseio.com/catches/";

function getUrl(endPoint) {
    return `${baseUrl}${endPoint}.json`;
}

export async function getAllCatches() {
    return await((await fetch(getUrl(''))).json());
}

export async function addCatch(c) {
    return await((await fetch(getUrl(''), {method: "POST", body: JSON.stringify(c)})).json());
}

export async function deleteCatch(id) {
    return await (await fetch(getUrl(id), {method: "DELETE"})).json();
}

export async function updateCatch(id, c) {
    return await (await fetch(getUrl(id), {method: "PUT", body: JSON.stringify(c)})).json();
}