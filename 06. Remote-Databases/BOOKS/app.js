import * as data from './data.js';
import el from '../domEl.js';

const submitBtn = document.querySelector("form > button");
const loadBooksBtn = document.querySelector("#loadBooks");
const booksList = document.querySelector("table tbody");
const wornningDiv = el('div', ``, {
    className: "wrong-input"
});
wornningDiv.style.display = "none";
document.querySelector("form").appendChild(wornningDiv);

const inputs = {
    titleEl: document.querySelector("#title"),
    authorEl: document.querySelector("#author"),
    isbnEl: document.querySelector("#isbn")
};

window.addEventListener("load", attachEvents);

function attachEvents() {
    loadBooksBtn.addEventListener("click", listBooks);
    submitBtn.addEventListener("click", addBook);
    booksList.addEventListener("click", createInputTag);
}

async function addBook(e) {
    e.preventDefault();
    for (const key of Object.keys(inputs)) {
        const wornEl = document.querySelector(".wrong-input")
        if (!inputs[key].value) {
            wornEl.textContent = `Please input correct ${key.substring(0, key.length - 2)}`;
            wornEl.style.display = "block";
            return;
        }
        wornEl.style.display = "none";
    }

    const book = {
        title: inputs.titleEl.value,
        author: inputs.authorEl.value,
        isbn: inputs.isbnEl.value
    }

    Object.keys(inputs).forEach(key => inputs[key].value = '');
    return await data.addBook(book);
}

async function listBooks() {
    booksList.innerHTML = 'Loading...';
    try {
        const books = await data.loadBooks();
        booksList.innerHTML = '';
        books.sort((a, b) => a.author.localeCompare(b.author)).forEach(renderBook);
    } catch (error) {
        booksList.innerHTML = error.message;
    }
}

function renderBook(book) {
    const editBtn = el("button", "Edit", { "id": "edit" });
    const deleteBtn = el("button", "Delete", { "id": "delete" });
    const element = el("tr", [
        el("td", book.title),
        el("td", book.author),
        el("td", book.isbn),
        el("td", [
            editBtn,
            deleteBtn
        ])
    ]);

    booksList.appendChild(element);

    editBtn.addEventListener("click", async function (e) {
        const newValueElements = e.target.parentNode.parentNode.querySelectorAll("input");
        newValueElements.forEach(element => {
            const newValue = element.value;
            element.parentNode.textContent = newValue;
            element.remove();
        });

        const newInfoArray = Array.from(e.target.parentNode.parentNode.children).filter(ch => ch.children.length === 0);
        const newBook = {
            title: newInfoArray[0].textContent,
            author: newInfoArray[1].textContent,
            isbn: newInfoArray[2].textContent,
        }

        await data.updateBook(book.objectId, newBook);        
    });

    deleteBtn.addEventListener("click", async function () {
        element.remove();
        await data.deleteBook(book.objectId);
    });
}

function createInputTag(e) {
    if (e.target.tagName === "TD" && e.target.children.length === 0) {
        const element = e.target;
        const inputEl = el("input", '', { "type": "text", "placeholder": element.textContent });
        inputEl.value = element.textContent;
        e.target.innerHTML = '';
        e.target.appendChild(inputEl);
    }
}