import { logoutFn } from '../data.js';
import { showError, showInfo } from '../notification.js';

export default async function () {
    try {
        const result = await logoutFn();
        if (result.hasOwnProperty('errorData')) {
            throw new Error(result.message);
        }

        localStorage.removeItem('username');
        localStorage.removeItem('userId');
        localStorage.removeItem('userToken');
        localStorage.removeItem('movieId');

        this.app.userData = {};
        
        showInfo('Logout successful.');
        this.redirect('#/login');

    } catch (error) {
        console.error(error);
        showError(error.message);
    }
}