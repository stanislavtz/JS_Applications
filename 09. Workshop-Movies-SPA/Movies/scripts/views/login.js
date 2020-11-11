import { loginFn } from '../data.js';

export default async function () {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
    }

    await this.partial("./templates/user/login.hbs");
}

export async function loginPost() {
    try {
        const username = this.params.username;
        const password = this.params.password;

        const result = await loginFn(username, password); 
        if(result.hasOwnProperty('errorData')) {
            throw new Error(result.message);
        }

        this.app.userData.username = result.name;
        this.app.userData.userId = result.objectId;

        this.redirect('#/home');

        return result;

    } catch (error) {
        alert(error.message);
    }
}