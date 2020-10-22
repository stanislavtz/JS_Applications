import { register } from '../data.js' 

export default async function reg() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
        registerForm: await this.load('./templates/register/registerForm.hbs')
    };

    this.partial('./templates/register/registerPage.hbs');
}

export async function registerPost() {
    const result = register(this.params.username, this.params.password)
    
    this.app.userData.loggedIn = true;
    this.app.userData.username = this.params.username;

    this.redirect('#/home');

    
}