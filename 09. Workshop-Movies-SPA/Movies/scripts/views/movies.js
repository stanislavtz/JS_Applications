import { createMovie } from '../data.js'

export async function catalog() {
    const token = localStorage.getItem("userToken");
    if(!token) {
        return;
    }
    
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
    }

    await this.partial("./templates/movies/catalog.hbs", this.app.userData);
}

export async function create() {
    const token = localStorage.getItem("userToken");
    if(!token) {
        return;
    }

    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
    }

    await this.partial("./templates/movies/create.hbs", this.app.userData);
}

export async function details() {
    const token = localStorage.getItem("userToken");
    if(!token) {
        return;
    }

    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
    }

    await this.partial("./templates/movies/details.hbs", this.app.userData);
}

export async function edit() {
    const token = localStorage.getItem("userToken");
    if(!token) {
        return;
    }
    
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
    }

    await this.partial("./templates/movies/edit.hbs", this.app.userData);
}

export async function createPost() {
    const movie = {
        title: this.params.title,
        description: this.params.description,
        image: this.params.imageUrl,
        genres: this.params.genres,
        tickets: ++this.params.tickets
    };
    this.redirect('#/create')
    return await createMovie(movie);
}