import API from './api.js';
import {beginRequest, endRequest} from '../js/notification.js';

const appId = 'C7A1EAF3-F00F-A1E6-FF88-BC5FF8AAD800';
const apiKey = 'BDED48E7-1489-4593-B9EA-49B38848024C';

const api = new API(appId, apiKey, beginRequest, endRequest);

const endPoints = {
    OFFERS: 'data/offers',
    USERS: 'data/users'
}

export const registerFn = api.register.bind(api);
export const loginFn = api.login.bind(api);
export const logoutFn = api.logout.bind(api);

export async function getAllData() {
    return api.get(endPoints.OFFERS);
}

export async function getDataById(id) {
    return await api.get(`${endPoints.OFFERS}/${id}`);
}

export async function createData(offer) {
    return await api.post(endPoints.OFFERS, offer);
}

export async function editData(offer) {
    const id = offer.objectId;
    return await api.put(`${endPoints.OFFERS}/${id}`, offer);
}

export async function deleteData(id) {
    return await api.del(`${endPoints.OFFERS}/${id}`);
}

export async function getUserById(id) {
    return await api.get(`${endPoints.USERS}/${id}`);
}

export async function upadeUser(user) {
    const id = sessionStorage.getItem('userId')
    return await api.put(`${endPoints.USERS}/${id}`, user);
}

// export async function likeAction(offer) {
//     const userEmail = sessionStorage.getItem('email');

//     if(offer.likers.includes(userEmail)) {
//         return;
//     }
    
//     offer.likers.push(userEmail);

//     return editData(offer);
// }