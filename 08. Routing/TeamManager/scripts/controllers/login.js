import { loginFn } from '../data.js';

export default async function () {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
        loginForm: await this.load('./templates/login/loginForm.hbs')
    };

    this.partial('./templates/login/loginPage.hbs');
}

export async function loginPost() {
    try {
        const result = await loginFn(this.params.username, this.params.password);

        if (result.hasOwnProperty("errorData")) {
            throw new Error(result.message);
        }

        this.app.userData.loggedIn = true;
        this.app.userData.username = result.username;

        localStorage.setItem("userToken", result["user-token"]);
        localStorage.setItem("username", result.username);

        this.redirect('#/home');

    } catch (error) {
        alert(error.message);
    }
}