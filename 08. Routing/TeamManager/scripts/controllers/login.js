import { loginFn } from '../data.js';

export default async function lg() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
        loginForm: await this.load('./templates/login/loginForm.hbs')
    };

    this.partial('./templates/login/loginPage.hbs');
}

export async function loginPost() {
    const result = await loginFn(this.params.username, this.params.password);

    this.app.userData.loggedIn = true;
    this.app.userData.username = this.params.username;
    this.redirect('#/home');

    return result;
}