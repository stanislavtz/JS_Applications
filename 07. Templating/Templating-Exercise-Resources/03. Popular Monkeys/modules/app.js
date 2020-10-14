import monkeys from "./monkeys.js";

(async () => {
    const monkeyEl = await (await fetch('./templates/monkeyTemplate.hbs')).text();
    const allMonkeysEl = await (await fetch('./templates/allMonkeysTemplate.hbs')).text();

    Handlebars.registerPartial('monkey', monkeyEl);
    const templateFn = Handlebars.compile(allMonkeysEl);
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