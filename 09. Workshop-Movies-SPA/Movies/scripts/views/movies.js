import { getAllMovies, createMovie } from '../data.js';
import { showError, showInfo } from '../notification.js';

let movie;

export async function catalog() {
    const token = localStorage.getItem("userToken");
    if (!token) {
        return;
    }

    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
        movie: await this.load('./templates/movies/movie.hbs')
    }

    const movies = await getAllMovies();

    this.app.userData.movies = movies;

    await this.partial("./templates/movies/catalog.hbs", this.app.userData);
}

export async function create() {
    const token = localStorage.getItem("userToken");
    if (!token) {
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
    if (!token) {
        return;
    }

    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
    }

    this.app.userData.movie = movie;
    await this.partial("./templates/movies/details.hbs", this.app.userData);
}

export async function edit() {
    const token = localStorage.getItem("userToken");
    if (!token) {
        return;
    }

    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
    }

    await this.partial("./templates/movies/edit.hbs", this.app.userData);
}

export async function createPost() {
    try {
        if (this.params.title.length < 6) {
            throw new Error("The title should be at least 6 characters long.");
        }

        if (this.params.description.length < 10) {
            throw new Error("The description should be at least 10 characters long.");
        }

        if (!this.params.imageUrl.startsWith('http')) {
            throw new Error("The image should start with http:// or https://");
        }

        movie = {
            title: this.params.title,
            description: this.params.description,
            image: this.params.imageUrl,
            genres: this.params.genres,
            tickets: ++this.params.tickets
        };

        const result = await createMovie(movie);
        if (result.hasOwnProperty('errorData')) {
            throw new Error(result.message);
        }

        showInfo('Movie created successfully.');

        this.redirect(`#/details/${result.objectId}`);
        // this.redirect('#/home');

        return result;

    } catch (error) {
        showError(error.message);
    }
}