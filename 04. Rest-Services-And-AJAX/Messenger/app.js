import * as data from "./data.js";

window.addEventListener('load', attachEvents);

function attachEvents() {
    const refereshBtn = document.querySelector('#refresh');
    const sendBtn = document.querySelector('#submit');

    refereshBtn.addEventListener("click", loadMessages);
    sendBtn.addEventListener('click', sendMessage);
}

async function sendMessage() {
    const nameEl = document.querySelector('#author');
    const messageEl = document.querySelector('#content');

    await data.sendMessage(nameEl.value, messageEl.value);

    nameEl.value = '';
    messageEl.value = '';
}

async function loadMessages() {
    const messageArea = document.querySelector("#messages");
    const messagesList = await data.loadMessages();

    messageArea.textContent = Object.entries(messagesList)
        .map(([id, message]) => `${message.author}: ${message.content}`)
        .join('\n');
}