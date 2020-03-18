function attachEvents() {
    fetch(`https://judgetests.firebaseio.com/locations.json`)
        .then(j => j.json())
        .then(console.log)
}

attachEvents();