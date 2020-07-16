(function listTowns() {
    const tempFile = './template.hbs';

    const inputRef = document.querySelector('#towns');
    const loadBtn = document.querySelector('#btnLoadTowns');
    const root = document.querySelector('#root');

    loadBtn.addEventListener('click', getTowns);

    async function getTowns() {
        const townsCollection = inputRef.value
            .split(', ')
            .sort((a, b) => a.localeCompare(b));
        
        const obj = {
            towns: townsCollection
        }

        const res = await fetch(tempFile);
        const data = await res.text();
        const template = Handlebars.compile(data);
        const htmlToAdd = template(obj);

        root.innerHTML = htmlToAdd;

        inputRef.value = '';
    }
})()