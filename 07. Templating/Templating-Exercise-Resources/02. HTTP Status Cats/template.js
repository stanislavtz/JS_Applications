(async () => {
    const allCats = document.querySelector('#allCats');

    Handlebars.registerPartial(
        'cat',
        await fetch('./catTemplate.hbs').then(x => x.text())
    );

    const templateFn = Handlebars.compile(
        await fetch('./allCatsTemplate.hbs').then(x => x.text())
    );

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