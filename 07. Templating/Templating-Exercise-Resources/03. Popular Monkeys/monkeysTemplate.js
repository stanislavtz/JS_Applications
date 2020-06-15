import { monkeys } from "./monkeys.js";

(async () => {

    Handlebars.registerPartial(
        'monkey',
        await fetch('./monkeyTemplate.hbs').then(x => x.text())
    );

    const template = Handlebars.compile(await fetch('./allMonkeysTemplate.hbs').then(x => x.text()));

    const htmlToAdd = template({ monkeys });

    console.log(htmlToAdd);

    document.querySelector('section').innerHTML += htmlToAdd;

    const infoBtns = document.querySelectorAll('button');

    infoBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const parent = e.target.parentNode;
            const currentInfo = parent.querySelector(`p`);

            const { display } = currentInfo.style;

            if (display === 'none') {
                currentInfo.style.display = 'block';
            }
            else {
                currentInfo.style.display = 'none';
            }
        });
    });
})()



