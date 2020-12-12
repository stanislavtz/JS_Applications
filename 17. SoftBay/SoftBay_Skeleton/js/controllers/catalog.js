import * as data from '../data.js';
import { showError, showSuccess } from '../notification.js';

let prId;

export async function dashboardPage() {
    const token = sessionStorage.getItem('userToken');

    if (!token) {
        return;
    }

    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
        offer: await this.load('./templates/offers/offer.hbs')
    }

    const offers = await data.getAllData();
    prId = offers.length;

    offers.forEach(offer => {
        offer.isOwner = offer.ownerId === sessionStorage.getItem('userId');
    });

    this.app.userData.offers = offers.sort((a, b) => a.id - b.id);

    await this.partial('./templates/offers/dashboard.hbs', this.app.userData);
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

    await this.partial('./templates/offers/create.hbs', this.app.userData);
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

    const offer = await data.getDataById(this.params.id);

    this.app.userData.offer = offer;

    await this.partial('./templates/offers/details.hbs', this.app.userData);
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

    const offer = await data.getDataById(this.params.id);

    this.app.userData.offer = offer;

    await this.partial('./templates/offers/edit.hbs', this.app.userData);
}

export async function deletePage() {
    const token = sessionStorage.getItem('userToken');

    if (!token) {
        return;
    }

    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    }

    const offer = await data.getDataById(this.params.id);

    this.app.userData.offer = offer;

    await this.partial('./templates/offers/delete.hbs', this.app.userData);
}

export async function createPost() {
    try {
        const { product, price, pictureUrl, description } = this.params;

        if (!(product && price && description)) {
            throw new Error('Invalid inputs!')
        }

        if (!this.params.pictureUrl.startsWith('https://')) {
            throw new Error("The image should start with https://");
        }

        const offer = {
            id: ++prId || 1,
            product,
            description,
            pictureUrl,
            price
        }

        const result = await data.createData(offer);

        if (result.hasOwnProperty('errorData')) {
            throw new Error(result.message);
        }

        showSuccess('Created successfully!');

        this.redirect('#/dashboard');
    } catch (error) {
        console.error(error.message);
        showError(error.message);
    }
}

export async function editPost() {
    try {
        const { id, product, price, pictureUrl, description } = this.params;

        const offer = {
            objectId: id,
            product,
            description,
            pictureUrl,
            price
        }

        const result = await data.editData(offer);

        if (result.hasOwnProperty('errorData')) {
            throw new Error(result.message);
        }

        showSuccess('Eddited successfully');

        this.redirect('#/dashboard');

    } catch (error) {
        console.error(error.message);
        showError(error.message);
    }
}

export async function deletePost() {
    try {
        const result = await data.deleteData(this.params.id);

        if (result.hasOwnProperty('errorData')) {
            throw new Error(result.message);
        }

        showSuccess('Deleted successfully');

        this.redirect('#/dashboard');
    } catch (error) {
        console.error(error.message);
        showError(error.message);
    }
}

export async function buyAction() {
   
}

// export async function likeAction() {
//     try {
//         const movie = await data.getDataById(this.params.id);

//         await data.likeAction(movie);

//         showSuccess('Liked successfully');

//         this.redirect(`#/details/${this.params.id}`);

//     } catch (error) {
//         console.error(error.message);
//         showError(error.message);
//     }
// }