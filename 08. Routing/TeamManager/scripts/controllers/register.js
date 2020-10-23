import { registerFn } from '../data.js';

export default async function reg() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
        registerForm: await this.load('./templates/register/registerForm.hbs')
    };

    this.partial('./templates/register/registerPage.hbs');
}

export async function registerPost() {
    const params = this.params;
    if (params.password !== params.repeatPassword) {
        alert("Password don't match");
        return;
    }

    try {
       const result = await registerFn(this.params.username, this.params.password);
       if(result.hasOwnProperty("errorData")) {
           const error = new Error()
           Object.assign(error, result);
           throw error; 
        }
        this.redirect('#/login');
    } catch (err) {
        console.log(err);
        alert(err.message);
    }
}