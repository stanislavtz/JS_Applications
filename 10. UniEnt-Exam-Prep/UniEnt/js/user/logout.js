import { logout } from '../../models/user.js'

export default function() {
    try {
        const result = logout();

        if(result.hasOwnProperty('errorData')) {
            throw new Error(result.message);
        }

        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('userToken');

        this.redirect('#/home');

    } catch (error) {
        console.error(error.message);
        alert(error.message);
    }
}