(async function () {
    const townString = await (await fetch('./townTemplate.hbs')).text();
    const allTownsString = await (await fetch('./allTownsTemplate.hbs')).text();

    Handlebars.registerPartial('town', townString);
    const templateFn = Handlebars.compile(allTownsString);

    const inputRef = document.querySelector('#towns');
    const loadBtn = document.querySelector('#btnLoadTowns');
    const root = document.querySelector('#root');

    loadBtn.addEventListener('click', getTowns);

    function getTowns() {
        const towns = inputRef.value
            .split(', ')
            .sort((a, b) => a.localeCompare(b));

        const htmlToAdd = templateFn({ towns });
        root.innerHTML = htmlToAdd;
        inputRef.value = '';
    }
})()