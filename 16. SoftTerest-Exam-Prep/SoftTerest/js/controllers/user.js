import * as user from '../data.js';
import { showError, showSuccess } from '../notification.js';

export async function registerPage() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    }

    await this.partial('./templates/user/register.hbs');
}

export async function loginPage() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    }

    await this.partial('./templates/user/login.hbs');
}

export async function registerPost() {
    try {
        const { username, password, repeatPassword } = this.params;
    
        if (!username) {
            document.querySelectorAll('input').forEach(p => p.value = '');
            throw new Error('Username can not be empty!');
        }
    
        if (password.length < 6) {
            throw new Error('Password should be at least 6 characters long!');
        }
    
        if (password !== repeatPassword) {
            throw new Error('Password don\'match!');
        }
    
        const result = await user.registerFn(username, password);
    
        if (result.hasOwnProperty('errorData')) {
            document.querySelectorAll('input').forEach(p => p.value = '');
            throw new Error(result.message);
        }
    
        showSuccess('Successful registration!');

        this.redirect('#/home');
        
    } catch (error) {
        console.error(error.message);
        showError(error.message);
    }
}

export async function loginPost() {
    try {
        const { username, password } = this.params;
    
        const result = await user.loginFn(username, password);
    
        if (result.hasOwnProperty('errorData')) {
            throw new Error(result.message);
        }
    
        showSuccess('Login successful.');

        this.redirect('#/home');
        
    } catch (error) {
        console.error(error.message);
        showError(error.message);
    }
}

export async function logout() {
    try {
        const token = sessionStorage.getItem('userToken');
    
        if(!token) {
            return;
        }
        
        const result = await user.logoutFn();
    
        if (result.hasOwnProperty('errorData')) {
            throw new Error(result.message);
        }
    
        showSuccess('Successful logout');

        this.redirect('#/home');
        
    } catch (error) {
        console.error(error.message);
        showError(error.message);
    }
}