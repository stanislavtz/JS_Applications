import * as data from './data.js';
import el from '../domElCreator.js';

(function solve() {
    const title = document.querySelector('#title');
    const author = document.querySelector('#author');
    const isbn = document.querySelector('#isbn');

    const loadBtn = document.querySelector('#loadBooks');
    loadBtn.addEventListener('click', loadBooks);

    const submitBtn = document.querySelector('form button');
    submitBtn.addEventListener('click', addBook);

    async function loadBooks() {
        const tBody = document.querySelector('tbody');
        tBody.innerHTML = '<tr><td colspan="4"><h3>Loading...</h3></td></tr>';

        const books = await data.getBooks();
        tBody.textContent = '';

        books
            .sort((a, b) => a.title.localeCompare(b.title))
            .sort((a, b) => a.author.localeCompare(b.author))
            .map(b => renderBook(b));

        title.value = '';
        author.value = '';
        isbn.value = '';

        function renderBook(book) {
            const tr = el('tr');
            const tdTilte = el('td', `${book.title}`);
            const tdAuthor = el('td', `${book.author}`);
            const tdISBN = el('td', `${book.isbn}`);
            const tdBTNS = el('td');

            const editBtn = el('button', 'Edit');

            editBtn.addEventListener('click', async () => {
                const newBook = {
                    title: title.value,
                    author: author.value,
                    isbn: isbn.value
                };
                await data.updateBook(book, newBook);
                loadBooks();
            });

            const delBtn = el('button', 'Delete');
            delBtn.addEventListener('click', async () => {
                await data.deleteBook(book.objectId);
                loadBooks();
            });

            tdBTNS.appendChild(editBtn);
            tdBTNS.appendChild(delBtn);

            tr.appendChild(tdTilte);
            tr.appendChild(tdAuthor);
            tr.appendChild(tdISBN);
            tr.appendChild(tdBTNS);

            return tBody.appendChild(tr);
        }
    }

    async function addBook(e) {
        e.preventDefault();
        const books = await data.getBooks();

        const book = {
            title: title.value,
            author: author.value,
            isbn: isbn.value
        };

        if(books.map(b => b.title).includes(book.title)) {
            title.value = '';
            title.placeholder='This title exist'
            return;
        }


        try {
            await data.addBook(book)
            loadBooks();
        } catch (error) {
            console.error(error);
        }

    }
})()
