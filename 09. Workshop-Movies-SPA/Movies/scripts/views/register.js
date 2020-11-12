import { registerFn } from '../data.js';
import { loginFn } from '../data.js';
import { showError, showInfo } from '../notification.js';

export default async function () {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
    }

    await this.partial("./templates/user/register.hbs");
}

export async function registerPost() {
    try {
        if (this.params.username.length < 3) {
            throw new Error('Username should be at least 3 characters long');
        }

        if (this.params.password.length < 6) {
            throw new Error('Password should be at least 6 characters long');
        }

        if (this.params.password != this.params.repeatPassword) {
            throw new Error('Password don\'t match');
        }
    
        const username = this.params.username;
        const password = this.params.password;

        const result = await registerFn(username, password);
        if (result.hasOwnProperty('errorData')) {
            throw new Error(result.message)
        }

        this.app.userData.username = result.name;
        this.app.userData.userId = result.objectId;
        
        showInfo('User registration successful.');
        this.redirect('#/home');
        
        return await loginFn(username, password);

    } catch (error) {
        showError(error.message);
    }
}