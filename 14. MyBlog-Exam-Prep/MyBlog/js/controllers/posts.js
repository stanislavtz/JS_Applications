import * as data from '../data.js';
// import { showError, showSuccess } from '../notification.js';

export async function createPage() {
    const token = sessionStorage.getItem('userToken');

    if (!token) {
        return;
    }

    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    }

    await this.partial('./templates/articles/create.hbs', this.app.userData);
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

    const post = await data.getById(this.params.id);

    this.app.userData.post = post;

    await this.partial('./templates/posts/details.hbs', this.app.userData);
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

    const post = await data.getById(this.params.id);

    this.app.userData.post = post;

    await this.partial('./templates/posts/edit.hbs', this.app.userData);
}

export async function createPost() {
    try {

        console.log(this)
        const { title, category, content } = this.params;

        if(!(title && category && content)) {
            throw new Error('Invalid inputs!');
        }
        
        const post = {
            title,
            category,
            content,
        }

        const result = await data.create(post);

        if (result.hasOwnProperty('errorData')) {
            throw new Error(result.message);
        }

        // showSuccess('Created successfully!');

        this.redirect('#/home');
    } catch (error) {
        console.error(error.message);
        // showError(error.message);
    }
}

export async function editPost() {
    try {
        const { id, title, category, content } = this.params;

        const post = {
            objectId: id,
            title,
            category,
            content
        }

        const result = await data.edit(post);

        if (result.hasOwnProperty('errorData')) {
            throw new Error(result.message);
        }

        // showSuccess('Eddited successfully');

        this.redirect('#/home');

    } catch (error) {
        console.error(error.message);
        // showError(error.message);
    }
}

export async function delAction() {
    try {
        const result = await data.del(this.params.id);

        if (result.hasOwnProperty('errorData')) {
            throw new Error(result.message);
        }

        // showSuccess('Deleted successfully');

       this.redirect('#/home');
    } catch (error) {
        console.error(error.message);
        // showError(error.message);
    }
}