import { logout } from '../../models/user.js';
import { showSuccess, showError } from '../notification.js';

export default function() {
    try {
        const result = logout();

        if(result.hasOwnProperty('errorData')) {
            throw new Error(result.message);
        }

        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('userToken');

        showSuccess('Logout successful.');

        this.redirect('#/home');

    } catch (error) {
        console.error(error.message);
        showError(error.message);
    }
}