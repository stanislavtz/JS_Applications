import * as data from'./data.js';

(function solve(){
    const loadBtn = document.querySelector('#loadBooks');
    loadBtn.addEventListener('click', loadBooks);
    
    function loadBooks() {
        const books = data.getBooks();
        console.log(books)
    }
})()
