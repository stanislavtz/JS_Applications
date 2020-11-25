import { logoutFn } from '../data.js';
import { showError, showInfo } from '../notification.js';

export default async function () {
    const token = sessionStorage.getItem("userToken");
    
    if (!token) {
        return;
    }
    
    try {
        const result = await logoutFn();

        if (result.hasOwnProperty('errorData')) {
            throw new Error(result.message);
        }

        showInfo('Logout successful.');
        
        this.redirect('#/home');

    } catch (error) {
        console.error(error);
        showError(error.message);
    }
}