(async () => {
    const allCats = document.querySelector('#allCats');
    const allCatsStr = await (await fetch('./templates/allCatsTemplate.hbs')).text();
    const catStr = await (await fetch('./templates/catTemplate.hbs')).text();

    Handlebars.registerPartial("cat", catStr);
    const templateFn = Handlebars.compile(allCatsStr);

    const htmlToAdd = templateFn({ cats });
    allCats.innerHTML = htmlToAdd;

    allCats.addEventListener('click', (e) => {
        if (e.target.localName !== 'button') { return }

        const infoDiv = e.target.parentElement.querySelector('.status');
        let { display } = infoDiv.style;

        if(display === 'none') {
            e.target.textContent = 'Hide status code';
            infoDiv.style.display = 'block';
        } else {
            e.target.textContent = 'Show status code';
            infoDiv.style.display = 'none';
        }
    });
})()