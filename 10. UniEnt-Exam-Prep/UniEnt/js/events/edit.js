import { update } from '../../models/events.js';

export default async function () {
    this.partials = {
        header: await this.load('./view/common/header.hbs'),
        footer: await this.load('./view/common/footer.hbs')
    }

    await this.partial('./view/events/edit.hbs', this.app.userData);
}

export async function editPost() {
    try {
        if (this.params.name.length < 6) {
            throw new Error("The title should be at least 6 characters long.");
        }

        if (this.params.description.length < 10) {
            throw new Error("The description should be at least 10 characters long.");
        }

        const re = /^(https?:\/\/)([-\w\.]+)+/g;

        if (!re.test(this.params.imageURL)) {
            throw new Error("The image should start with http:// or https://");
        }

        const event = {
            name: this.params.name,
            dateTime: this.params.dateTime,
            description: this.params.description,
            image: this.params.imageURL,
            organizer: sessionStorage.getItem('username'),
            interestedIn: 0,
        }

        const result = update(this.params.id, event);

        if (result.hasOwnProperty('errorData')) {
            throw new Error(result.message);
        }

        this.redirect('#/home');

    } catch (error) {
        console.error(error.message);
        alert(error.message)
    }
}