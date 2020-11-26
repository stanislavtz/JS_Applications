import { showError, showInfo } from '../notification.js';
import * as moviesData from '../data.js';

export async function allMovies() {
    const token = sessionStorage.getItem("userToken");

    if (!token) {
        return;
    }

    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
        movie: await this.load('./templates/movies/movie.hbs'),
        controls: await this.load('./templates/movies/movieControls.hbs')
    }

    const search = this.params.search || '';

    const movies = (await moviesData.getAllMovies(search)).sort((a, b) => b.tickets - a.tickets);

    this.app.userData.movies = movies;

    const obj = {
        origin: encodeURIComponent('#/catalog'),
        search
    };

    const context = Object.assign(obj, this.app.userData)

    this.partial("./templates/movies/catalog.hbs", context);
}

export async function myMovies() {
    const token = sessionStorage.getItem("userToken");
    
    if (!token) {
        return;
    }

    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
        movie: await this.load('./templates/movies/movie.hbs'),
        controls: await this.load('./templates/movies/myMovieControls.hbs'),
        movieControls: await this.load('./templates/movies/movieControls.hbs')

    }

    const userId = sessionStorage.getItem('userId');

    const myMovies = (await moviesData.getMoviesByOwner(userId)).sort((a, b) => b.tickets - a.tickets);

    this.app.userData.movies = myMovies;

    const obj = {
        isMyMovies: true,
        origin: encodeURIComponent('#/my_movies')
    };

    const context = Object.assign(obj, this.app.userData)

    this.partial("./templates/movies/catalog.hbs", context);
}

export async function create() {
    const token = sessionStorage.getItem("userToken");
    
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

        const result = await moviesData.createMovie(movie);

        if (result.hasOwnProperty('errorData')) {
            throw new Error(result.message);
        }

        showInfo('Movie created successfully.');

        this.redirect(`#/details/${result.objectId}`);

        return result;
    } catch (error) {
        console.error(error);
        showError(error.message);
    }
}

export async function details() {
    const token = sessionStorage.getItem("userToken");
    
    if (!token) {
        return;
    }

    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
        movie: await this.load('./templates/movies/movie.hbs')
    }

    const movie = (await moviesData.getMovieById(this.params.id));

    const context = Object.assign(movie, this.app.userData);

    context.origin = encodeURIComponent(`#/details/${this.params.id}`);

    this.partial("./templates/movies/details.hbs", context);
}

export async function edit() {
    const token = sessionStorage.getItem("userToken");
    
    if (!token) {
        return;
    }

    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
    }

    const movie = await moviesData.getMovieById(this.params.id);

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
            throw new Error("The image should start with \"http://\" or \"https://\".");
        }

        const movie = {
            title: this.params.title,
            description: this.params.description,
            image: this.params.imageUrl,
            genres: this.params.genres,
            tickets: Number(this.params.tickets)
        };

        const movieId = this.params.id;

        const result = await moviesData.updateMovie(movieId, movie);

        if (result.hasOwnProperty('errorData')) {
            throw new Error(result.message);
        }

        showInfo('Movie created successfully.');

        this.redirect(`#/details/${result.objectId}`);

        return result;
    } catch (error) {
        console.error(error);
        showError(error.message);
    }
}

export async function buy() {
    try {
        const movie = await moviesData.getMovieById(this.params.id)

        const result = await moviesData.buyTicket(movie);
        
        if (result.hasOwnProperty('errorData')) {
            this.redirect('#/catalog');
            throw new Error(result.message);
        }

        showInfo(`Successfully bought ticket for ${movie.title}!`);

        this.redirect(this.params.origin);
    } catch (error) {
        console.error(error);
        showError(error.message);
    }
}

export async function del() {
    const confirmDel = confirm("Are you sure you want to delete this movie?");

    if (!confirmDel) {
        return this.redirect('#/my_movies');
    }

    try {
        const result = await moviesData.deleteMovie(this.params.id);

        if (result.hasOwnProperty('errorData')) {
            throw new Error(result.message);
        }

        showInfo('Movie removed successfully!');

        this.redirect('#/my_movies');
    } catch (error) {
        showError(error.message);
    }
}