import { createTeamFn } from '../data.js';

export default async function () {
    if (!localStorage.userToken) {
        alert('Please login first!');
        this.redirect('#/login');
        return;
    }

    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
        createForm: await this.load('./templates/create/createForm.hbs')
    }

    this.partial('./templates/create/createPage.hbs', this.app.userData);
}

export async function createPost() {
    const newTeam = {
        name: this.params.name,
        comment: this.params.comment,
        members: []
    };

    try {
        if(!this.params.name) {
            throw new Error("Name must not be empty!")
        }

        const result = await createTeamFn(newTeam);
        console.log(result)

        if(result.hasOwnProperty("errorData")) {
            throw new Error(result.message);
        }

        this.app.userData.isAuthor = true;
        this.app.userData.isOnTeam = true;
        this.app.userData.hasNoTeam = false;

        this.redirect(`#/catalog/${result.objectId}`);

    } catch (error) {
        alert(error.message)
    }
}