import { login } from '../../models/user.js'

export default async function () {
    this.partials = {
        header: await this.load('./view/common/header.hbs'),
        footer: await this.load('./view/common/footer.hbs')
    }

    await this.partial('./view/user/login.hbs');
}

export async function loginPost() {
    try {
        const { username, password } = this.params;

        const result = await login(username, password);

        if (result.hasOwnProperty('errorData')) {
            throw new Error(result.message);
        }

        sessionStorage.setItem('username', username);
        sessionStorage.setItem('userId', result.user.uid);

       console.log('Login successful.');
        
        this.redirect('#/home');

    } catch (error) {
        console.error(error.message);
        alert(error.message);
    }
}