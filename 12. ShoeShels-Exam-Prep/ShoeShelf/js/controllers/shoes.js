import { createShoes } from '../data.js';

export async function createPage() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    }

    await this.partial('./templates/shoes/create.hbs', this.app.userData);
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

export async function detailsPage() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    }

    await this.partial('./templates/shoes/details.hbs', this.app.userData);
}