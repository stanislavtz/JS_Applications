const url = "http://localhost:8000/messenger";

export function loadMessages() {
    return fetch(url).then(r => r.json());
}

export function sendMessage(author, content) {
    return fetch(url, {
        method: "POST",
        body: JSON.stringify({
            author: author,
            content: content
        })
    });
}