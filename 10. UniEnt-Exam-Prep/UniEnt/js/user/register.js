import { registerUser } from '../..//models/user.js';
import { showSuccess, showError } from '../notification.js';

export default async function () {
    this.partials = {
        header: await this.load('./view/common/header.hbs'),
        footer: await this.load('./view/common/footer.hbs')
    }

    await this.partial('./view/user/register.hbs');
}

export async function registerPost() {
    try {
        const { username, password, rePassword } = this.params;

        if (username.length < 3) {
            throw new Error('Username should be at least 3 characters long!');
        }

        if (password.length < 6) {
            throw new Error('Password should be at least 6 characters long!');
        }

        if (password !== rePassword) {
            throw new Error('Password don\'t match!');
        }

        const result = await registerUser(username, password);

        if (result.hasOwnProperty('errorData')) {
            throw new Error(result.message);
        }

        showSuccess('User registration successful.');
        
        this.redirect('#/home');
        
    } catch (error) {
        console.error(error.message);
        showError(error.message);
    }
}