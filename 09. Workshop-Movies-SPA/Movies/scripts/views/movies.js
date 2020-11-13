import { getAllMovies, getMoviesByOwner, getMovieById, createMovie, buyTicket as ticketBuy, updateMovie } from '../data.js';
import { showError, showInfo } from '../notification.js';

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

    this.partial("./templates/movies/catalog.hbs", this.app.userData);
}

export async function ownMovies() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
        ownMovie: await this.load('./templates/movies/ownMovie.hbs')
    }

    const userId = localStorage.getItem('userId');
    const ownMovies = await getMoviesByOwner(userId);

    this.app.userData.movies = ownMovies;
    // this.app.userData.ownMovies = ownMovies;
    const context = Object.assign({myMovie: true}, this.app.userData)

    this.partial("./templates/movies/catalog.hbs", context);
    // this.partial("./templates/movies/ownMoviesCatalog.hbs", this.app.userData);
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

    this.partial("./templates/movies/create.hbs", this.app.userData);
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

        const movie = {
            title: this.params.title,
            description: this.params.description,
            image: this.params.imageUrl,
            genres: this.params.genres,
            tickets: Number(this.params.tickets)
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
        console.error(error);
        showError(error.message);
    }
}

export async function details() {
    const token = localStorage.getItem("userToken");
    if (!token) {
        return;
    }

    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
        movie: await this.load('./templates/movies/movie.hbs')

    }

    const movie = (await getMovieById(this.params.id));

    const context = Object.assign(movie, this.app.userData);

    this.partial("./templates/movies/details.hbs", context);
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

    localStorage.setItem('movieId', this.params.id);

    const movie = await getMovieById(this.params.id);

    const context = Object.assign(movie, this.app.userData)

    this.partial("./templates/movies/edit.hbs", context);
}

export async function editPost() {
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

        const movie = {
            title: this.params.title,
            description: this.params.description,
            image: this.params.imageUrl,
            genres: this.params.genres,
            tickets: Number(this.params.tickets)
        };

        const movieId = localStorage.getItem('movieId');
        localStorage.removeItem('movieId');
       
        const result = await updateMovie(movieId, movie);


        if (result.hasOwnProperty('errorData')) {
            throw new Error(result.message);
        }

        showInfo('Movie created successfully.');

        this.redirect(`#/details/${result.objectId}`);
        // this.redirect('#/home');
        return result;
    } catch (error) {
        console.error(error);
        showError(error.message);
    }
}

export async function buyTicket() {
    try {
        const movie = (await getAllMovies()).find(m => m.objectId === this.params.id);

        const result = await ticketBuy(movie);
        if (result.hasOwnProperty('errorData')) {
            throw new Error(result.message);
        }

        showInfo(`Successfully bought ticket for ${movie.title}!`);

        this.redirect('#/catalog');
    } catch (error) {
        console.error(error);
        showError(error.message);
    }
}