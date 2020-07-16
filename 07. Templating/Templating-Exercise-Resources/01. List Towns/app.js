(async function listTowns() {
    const townTemplate = await fetch('./town.hbs').then(r => r.text());
    const townsTemplate = await fetch('./towns.hbs').then(r => r.text());

    Handlebars.registerPartial('town', townTemplate);
    const template = Handlebars.compile(townsTemplate);

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