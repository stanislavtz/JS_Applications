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
    const { email, password, repeatPassword } = this.params;

    console.log(this)

    if (!email) {
        document.querySelectorAll('input').forEach(p => p.value = '');
        return;
    }

    if (password.length < 6) {
        document.querySelectorAll('input').forEach(p => p.value = '');
        return;
    }

    if (password !== repeatPassword) {
        document.querySelectorAll('input').forEach(p => p.value = '');
        return;
    }

    const result = await registerFn(email, password);

    if (result.hasOwnProperty('errorData')) {
        document.querySelectorAll('input').forEach(p => p.value = '');
        return;
    }

    this.redirect('#/home');
}

export async function loginPost() {
    const { email, password } = this.params;

    const result = await loginFn(email, password);

    if (result.hasOwnProperty('errorData')) {
        document.querySelectorAll('input').forEach(p => p.value = '');
        return;
    }

    this.redirect('#/home');
}

export async function logout() {
    const result = await logoutFn();

    if (result.hasOwnProperty('errorData')) {
        return;
    }

    this.redirect('#/home');
}