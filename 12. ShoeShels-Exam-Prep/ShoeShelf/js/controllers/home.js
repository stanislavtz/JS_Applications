import { getAllShoes } from '../data.js';

export async function home() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
    }

    const shoes = await getAllShoes();

    if(shoes.hasOwnProperty('errorData')) {
        return;
    }

    this.app.userData.shoes = shoes;

    await this.partial('./templates/home.hbs', this.app.userData);
}