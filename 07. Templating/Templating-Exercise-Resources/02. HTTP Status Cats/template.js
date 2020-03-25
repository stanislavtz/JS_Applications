(async () => {
    const allCats = document.querySelector('#allCats');
    

    Handlebars.registerPartial(
        'cat',
        await fetch('./catTemplate.hbs').then(x => x.text())
    );

    const template = Handlebars.compile(
        await fetch('./allCatsTemplate.hbs').then(x => x.text())
    );

    const htmlToAdd = template({ cats: cats });

    allCats.innerHTML = htmlToAdd;

    const catsBtns = document.querySelectorAll('button.showBtn');

    catsBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const parent = e.target.parentNode;
            const statusDiv = parent.querySelector(`.status`);

            const { display } = statusDiv.style;

            if(display === 'none') {
                statusDiv.style.display = 'block';
                btn.textContent =  'Hide status code';
            }
            else {
                statusDiv.style.display = 'none';
                btn.textContent =  'Show status code';
            }
        });
    });
})()