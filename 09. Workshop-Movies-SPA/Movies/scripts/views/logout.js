import { logoutFn } from '../data.js';

export default async function () {
    try {
        const result = await logoutFn();
        if(result.hasOwnProperty('errorData')){
            throw new Error(result.message);
        }

        localStorage.removeItem('username');
        localStorage.removeItem('userId');
        localStorage.removeItem('userToken');
    
        this.app.userData = {};
        this.redirect('#/home');
    } catch (error) {
        alert(error.message);
    }
}