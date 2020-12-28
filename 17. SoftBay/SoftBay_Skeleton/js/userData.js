import API from './api.js';
import { apiData } from './apiData.js';
import { beginRequest, endRequest } from './notification.js';

const api = new API(apiData.id, apiData.key, beginRequest, endRequest);

const endPoints = {
    REGISTER: 'users/register',
    LOGIN: 'users/login',
    LOGOUT: 'users/logout',
    USERS: 'data/users'
}

export async function registerFn(email, password) {
    await api.post(endPoints.REGISTER, {
        email,
        password,
        purchases: []
    });

    return loginFn(email, password);
}

export async function loginFn(email, password) {
    const result = await api.post(endPoints.LOGIN, {
        login: email,
        password
    });

    sessionStorage.setItem('email', result.email);
    sessionStorage.setItem('userId', result.objectId);
    sessionStorage.setItem('userToken', result['user-token']);

    return result;
}

export async function logoutFn() {
    const result = await api.get(endPoints.LOGOUT);

    sessionStorage.clear();

    return result;
}

export async function getUserById(id) {
    return await api.get(`${endPoints.USERS}/${id}`);
}

export async function updateUser(user) {
    return await api.put(`${endPoints.USERS}/${user.objectId}`, user);
}

export async function deleteUser() {

}