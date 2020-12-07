import * as data from '../data.js';
import { showError, showSuccess } from '../notification.js';

export async function createPage() {
    const token = sessionStorage.getItem('userToken');

    if (!token) {
        return;
    }

    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    }

    await this.partial('./templates/movies/create.hbs', this.app.userData);
}

export async function detailsPage() {
    const token = sessionStorage.getItem('userToken');

    if (!token) {
        return;
    }

    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    }

    const movie = await data.getMovieById(this.params.id);
    const isOwner = movie.ownerId === sessionStorage.getItem('userId');

    this.app.userData.movie = movie;
    this.app.userData.isOwner = isOwner;

    if (movie.likers.includes(sessionStorage.getItem('email'))) {
        this.app.userData.isLiked = true;
    } else {
        this.app.userData.isLiked = false;
    }

    await this.partial('./templates/movies/details.hbs', this.app.userData);
}

export async function editPage() {
    const token = sessionStorage.getItem('userToken');

    if (!token) {
        return;
    }

    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    }

    const pair = await data.getMovieById(this.params.id);

    this.app.userData.pair = pair;

    await this.partial('./templates/movies/edit.hbs', this.app.userData);
}

export async function createPost() {
    try {
        const { title, imageUrl, description } = this.params;

        if(!(title && imageUrl && description)) {
            throw new Error('Invalid inputs!')
        }

        const movie = {
            title,
            imageUrl,
            description,
            creator: sessionStorage.getItem('userId'),
            likers: []
        }

        const result = await data.createMovie(movie);

        if (result.hasOwnProperty('errorData')) {
            throw new Error(result.message);
        }

        showSuccess('Created successfully!');

        this.redirect('#/home');
    } catch (error) {
        console.error(error.message);
        showError(error.message);
    }
}

export async function editPost() {
    try {
        const { id, title, imageUrl, description } = this.params;

        const movie = {
            objectId: id,
            imageUrl,
            title,
            description,
        }

        const result = await data.editMovie(movie);

        if (result.hasOwnProperty('errorData')) {
            throw new Error(result.message);
        }

        showSuccess('Eddited successfully');

        this.redirect('#/home');

    } catch (error) {
        console.error(error.message);
        showError(error.message);
    }
}

export async function delAction() {
    try {
        const result = await data.deleteMovie(this.params.id);

        if (result.hasOwnProperty('errorData')) {
            throw new Error(result.message);
        }

        showSuccess('Deleted successfully');

        this.redirect('#/home');
    } catch (error) {
        console.error(error.message);
        showError(error.message);
    }
}

export async function likeAction() {
    try {
        const movie = await data.getMovieById(this.params.id);
    
        await data.likeMovie(movie);
    
        showSuccess('Liked successfully');

        this.redirect(`#/details/${this.params.id}`);
        
    } catch (error) {
        console.error(error.message);
        showError(error.message);
    }
}