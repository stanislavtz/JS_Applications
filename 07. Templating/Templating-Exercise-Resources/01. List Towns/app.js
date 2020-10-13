(async function () {
    const townString = await (await fetch('./templates/townTemplate.hbs')).text();
    const allTownsString = await (await fetch('./templates/allTownsTemplate.hbs')).text();

    Handlebars.registerPartial('town', townString);
    const templateFn = Handlebars.compile(allTownsString);

    const inputRef = document.querySelector('#towns');
    const loadBtn = document.querySelector('#btnLoadTowns');
    const root = document.querySelector('#root');

    loadBtn.addEventListener('click', getTowns);

    function getTowns(e) {
        e.preventDefault();
        const towns = inputRef.value
            .split(', ')
            .sort((a, b) => a.localeCompare(b));

        if (!towns[0]) { alert("ERROR"); return; }

        const htmlToAdd = templateFn({ towns });
        root.innerHTML = htmlToAdd;
        inputRef.value = '';
    }
})()