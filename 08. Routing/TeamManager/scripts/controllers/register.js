import { registerFn } from '../data.js';

export default async function () {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
        registerForm: await this.load('./templates/register/registerForm.hbs')
    };

    this.partial('./templates/register/registerPage.hbs');
}

export async function registerPost() {
    if (this.params.password !== this.params.repeatPassword) {
        alert("Password don't match");
        return;
    }

    try {
        const result = await registerFn(this.params.username, this.params.password);

        if (result.hasOwnProperty("errorData")) {
            const error = new Error();
            Object.assign(error, result);
            throw error;
        }

        this.app.params.hasNoTeam = true;
        this.redirect('#/login');

    } catch (err) {
        alert(err.message);
    }
}