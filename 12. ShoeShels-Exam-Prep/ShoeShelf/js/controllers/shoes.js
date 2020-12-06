import { createShoes, getShoesById, editShoes, deleteOffer, buyShoes } from '../data.js';

export async function createPage() {
    const token = sessionStorage.getItem('userToken');

    if (!token) {
        return;
    }

    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    }

    await this.partial('./templates/shoes/create.hbs', this.app.userData);
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

    const pair = await getShoesById(this.params.id);
    const isOwner = pair.ownerId === sessionStorage.getItem('userId');

    this.app.userData.pair = pair;
    this.app.userData.isOwner = isOwner;

    if (pair.buyers.includes(sessionStorage.getItem('email'))) {
        this.app.userData.isBought = true;
    } else {
        this.app.userData.isBought = false;
    }

    await this.partial('./templates/shoes/details.hbs', this.app.userData);
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

    const pair = await getShoesById(this.params.id);

    this.app.userData.pair = pair;

    await this.partial('./templates/shoes/edit.hbs', this.app.userData);
}

export async function createPost() {
    try {
        const { name, price, shoesURL, description, brand } = this.params;

        const shoes = {
            name,
            price,
            shoesURL,
            description,
            brand,
            creator: sessionStorage.getItem('userId'),
            buyers: []
        }

        const result = await createShoes(shoes);

        if (result.hasOwnProperty('errorData')) {
            throw new Error(result.message);
        }

        this.redirect('#/home');
    } catch (error) {
        console.error(error.message)
    }
}

export async function editPost() {
    try {
        const { id, name, price, shoesURL, description, brand } = this.params;
        const shoes = {
            objectId: id,
            name,
            price,
            shoesURL,
            description,
            brand,
        }

        const result = await editShoes(shoes);

        if (result.hasOwnProperty('errorData')) {
            throw new Error(result.message);
        }

        this.redirect('#/home');
    } catch (error) {
        console.error(error.message)
    }
}

export async function delAction() {
    try {
        const result = await deleteOffer(this.params.id);

        if (result.hasOwnProperty('errorData')) {
            throw new Error(result.message);
        }

        this.redirect('#/home');
    } catch (error) {
        console.error(error.message);
    }
}

export async function buyAction() {
    const shoes = await getShoesById(this.params.id);

    await buyShoes(shoes);

    this.redirect(`#/details/${this.params.id}`);
}