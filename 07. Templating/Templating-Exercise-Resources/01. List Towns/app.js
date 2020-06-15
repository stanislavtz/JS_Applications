(function listTowns() {
    const tempFile = './template.hbs';

    const inputRef = document.querySelector('#towns');
    const loadBtn = document.querySelector('#btnLoadTowns');
    const root = document.querySelector('#root');

    loadBtn.addEventListener('click', getTowns);

    function getTowns() {
        const townsCollection = inputRef.value.split(', ');

        fetch(tempFile)
            .then(data => data.text())
            .then(data => {
                const template = Handlebars.compile(data);
                const htmlToAdd = template({towns: townsCollection});

                root.innerHTML = htmlToAdd;
            })

        inputRef.value = '';
    }
})()