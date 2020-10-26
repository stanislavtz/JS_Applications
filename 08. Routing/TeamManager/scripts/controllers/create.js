import { createTeamFn } from '../data.js';

export default async function () {
    if (!localStorage.userToken) {
        alert('Please login first');
        return;
    }

    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
        createForm: await this.load('./templates/create/createForm.hbs')
    }

    this.partial('./templates/create/createPage.hbs');
}

export async function createPost() {
    const newTeam = {
        name: this.params.name,
        comment: this.params.comment
    };

    try {
        const result = await createTeamFn(newTeam);
        if(result.hasOwnProperty("errorData")) {
            const error = new Error();
            Object.assign(error, result);
            throw error;
        }
    } catch (error) {
        alert(error.message)
    }

    this.redirect('#/catalog');
}