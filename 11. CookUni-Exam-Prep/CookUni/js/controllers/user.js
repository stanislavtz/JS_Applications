import * as notes from '../notifications.js';
import { beginReuest, endRequest } from '../notifications.js';
import { registerFn, loginFn, logoutFn } from '../data.js';

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
        const { firstName, lastName, username, password, repeatPassword } = this.params;

        if (firstName.length < 2) {
            throw new Error('First name should be at least 2 characters long!');
        }

        if (lastName.length < 2) {
            throw new Error('Last name should be at least 2 characters long!');
        }

        if (username.length < 3) {
            throw new Error('Username should be at least 3 characters long!');
        }

        if (password.length < 6) {
            throw new Error('Password should be at least 6 characters long!');
        }

        if (password !== repeatPassword) {
            throw new Error('Password don\'t match');
        }

        const result = await registerFn(firstName, lastName, username, password);

        if (result.hasOwnProperty('errorData')) {
            throw new Error(result.message);
        }

        notes.showSuccess('User registration successful.');

        this.redirect('#/home');
    } catch (error) {
        console.error(error.message);
        notes.showError(error.message);
    }




}

export async function loginPost() {
    try {
        const { username, password } = this.params;

        const result = await loginFn(username, password);

        if (result.hasOwnProperty('errorData')) {
            throw new Error(result.message);
        }

        notes.showSuccess('Login successful.');

        this.redirect('#/home');
    } catch (error) {
        console.error(error.message);
        notes.showError(error.message);
    }
}

export async function logout() {
    try {
        const result = await logoutFn();
        if (result.hasOwnProperty('errorData')) {
            throw new Error(result.message);
        }

        notes.showSuccess('Logout successful.');

        this.redirect('#/home');
    } catch (error) {
        console.error(error.message);
        notes.showError(error.message);
    }
}