import * as data from '../data.js';
import { showError, showSuccess } from '../notification.js';

export async function catalogPage() {
    const token = sessionStorage.getItem('userToken');

    if (!token) {
        return;
    }

    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
        idea: await this.load('./templates/ideas/idea.hbs')
    }

    const ideas = await data.getAll();
    this.app.userData.ideas = ideas;

    await this.partial('./templates/ideas/catalog.hbs', this.app.userData);
}

export async function createPage() {
    const token = sessionStorage.getItem('userToken');

    if (!token) {
        return;
    }

    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    }

    await this.partial('./templates/ideas/create.hbs', this.app.userData);
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

    const idea = await data.getById(this.params.id);
    const isOwner = idea.ownerId === sessionStorage.getItem('userId');

    this.app.userData.idea = idea;
    this.app.userData.isOwner = isOwner;

    await this.partial('./templates/ideas/details.hbs', this.app.userData);
}

export async function createPost() {
    try {
        const { title, imageURL, description } = this.params;

        if(!(title && imageURL && description)) {
            throw new Error('Invalid inputs!')
        }

        const idea = {
            title,
            imageURL,
            description,
            organizer: sessionStorage.getItem('userId'),
            comments: []
        }

        const result = await data.create(idea);

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
        const { id, newComment } = this.params;

        const idea = await data.getById(id);

        idea.comments.push(`${sessionStorage.getItem('username')}: ${newComment}`);
        
        const result = await data.edit(idea);

        if (result.hasOwnProperty('errorData')) {
            throw new Error(result.message);
        }

        showSuccess('Eddited successfully');

        this.redirect('#/details/' + id);

    } catch (error) {
        console.error(error.message);
        showError(error.message);
    }
}

export async function delAction() {
    try {
        const result = await data.del(this.params.id);

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
        const idea = await data.getById(this.params.id);
    
        await data.like(idea);
    
        showSuccess('Liked successfully');

        this.redirect(`#/details/${this.params.id}`);
        
    } catch (error) {
        console.error(error.message);
        showError(error.message);
    }
}