import API from './api.js';

const appId = '50F174E0-70E8-F82D-FFB9-A33922380700';
const apiKey = '153005A0-7018-4F9C-B4BF-01D0E69447FC';

const api = new API(appId, apiKey);

const endPoints = {
    IDEAS: 'data/ideas'
}

export const registerFn = api.register.bind(api);
export const loginFn = api.login.bind(api);
export const logoutFn = api.logout.bind(api);

export async function getAll() {
    return api.get(endPoints.IDEAS);
}

export async function getById(id) {
    return await api.get(`${endPoints.IDEAS}/${id}`);
}

export async function create(idea) {
    return await api.post(endPoints.IDEAS, idea);
}

export async function edit(idea) {
    const id = idea.objectId;
    return await api.put(`${endPoints.IDEAS}/${id}`, idea);
}

export async function del(id) {
    return await api.del(`${endPoints.IDEAS}/${id}`);
}

export async function like(idea) {
    idea.likes += 1;

    return edit(idea);
}