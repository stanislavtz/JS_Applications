import monkeys from "./monkeys.js";
(async () => {
    Handlebars.registerPartial(
        'monkey',
        await fetch('./templates/monkeyTemplate.hbs').then(x => x.text())
    );

    const templateFn = Handlebars.compile(await fetch('./templates/allMonkeysTemplate.hbs').then(x => x.text()));
    const htmlToAdd = templateFn({ monkeys });

    document.querySelector('section').innerHTML = htmlToAdd;
    document.querySelector('.monkeys').addEventListener('click', (e) => {
        if(e.target.localName !== 'button') { return }

        const p = e.target.parentNode.querySelector('p');

        const { display } = p.style;

        if(display === 'none') {
            p.style.display = 'block';
        } else  {
            p.style.display = 'none'
        }
    });
})()