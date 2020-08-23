async function attachEvents() {
    console.log('TODO...');
    const url = `http://localhost:8000/messenger`;
    let result = await fetch(url).then(r => r.json());
    console.log(result)
}

attachEvents();