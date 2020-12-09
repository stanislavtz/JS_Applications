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

    const article = await data.getById(this.params.id);
    const isOwner = article.creator === sessionStorage.getItem('userId');

    this.app.userData.article = article;
    this.app.userData.isOwner = isOwner;

    // if (movie.likers.includes(sessionStorage.getItem('email'))) {
    //     this.app.userData.isLiked = true;
    // } else {
    //     this.app.userData.isLiked = false;
    // }

    await this.partial('./templates/articles/details.hbs', this.app.userData);
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

    const article = await data.getById(this.params.id);

    this.app.userData.article = article;

    await this.partial('./templates/articles/edit.hbs', this.app.userData);
}

export async function createPost() {
    try {
        const { title, category, content } = this.params;

        if(!(title && category && content)) {
            throw new Error('Invalid inputs!');
        }
        
        const categories = ['JavaScript', 'C#', 'Java', 'Pyton']
        if(!categories.includes(category)) {
            throw new Error('Invalid category!');
        }
        
        const article = {
            title,
            category,
            content,
            creator: sessionStorage.getItem('userId'),
        }

        const result = await data.createArticle(article);

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

        const article = {
            objectId: id,
            title,
            category,
            content
        }

        const result = await data.edit(article);

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

// export async function likeAction() {
//     try {
//         const movie = await data.getMovieById(this.params.id);
    
//         await data.likeMovie(movie);
    
//         showSuccess('Liked successfully');

//         this.redirect(`#/details/${this.params.id}`);
        
//     } catch (error) {
//         console.error(error.message);
//         showError(error.message);
//     }
// }