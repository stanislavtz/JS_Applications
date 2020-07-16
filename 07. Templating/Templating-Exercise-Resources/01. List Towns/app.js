(async function listTowns() {
    const townString = await fetch('./townTemplate.hbs').then(r => r.text());
    const allTownsString = await fetch('./allTownsTemplate.hbs').then(r => r.text());

    Handlebars.registerPartial('town', townString);
    const template = Handlebars.compile(allTownsString);

    const inputRef = document.querySelector('#towns');
    const loadBtn = document.querySelector('#btnLoadTowns');
    const root = document.querySelector('#root');

    loadBtn.addEventListener('click', getTowns);

    async function getTowns() {
        const towns = inputRef.value
            .split(', ')
            .sort((a, b) => a.localeCompare(b));

        const htmlToAdd = template({ towns });

        root.innerHTML = htmlToAdd;

        inputRef.value = '';
    }
})()