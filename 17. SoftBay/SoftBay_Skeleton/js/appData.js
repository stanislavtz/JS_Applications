import API from './api.js';
import { apiData } from './apiData.js';
import { beginRequest, endRequest } from './notification.js';

const api = new API(apiData.id, apiData.key, beginRequest, endRequest);

const endPoints = {
    OFFERS: 'data/offers',
    USERS: 'data/users'
}

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