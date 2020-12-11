import API from './api.js';

const appId = 'D59CB5CC-8BCF-60EF-FF36-4FCDE52C8F00';
const apiKey = '10DC5726-32F8-49CC-9940-91FD0A1E188A';

const api = new API(appId, apiKey);

const endPoints = {
    POSTS: 'data/posts'
}

export const registerFn = api.register.bind(api);
export const loginFn = api.login.bind(api);
export const logoutFn = api.logout.bind(api);

export async function getAll() {
    return api.get(endPoints.POSTS);
}

export async function getById(id) {
    return await api.get(`${endPoints.POSTS}/${id}`);
}

export async function create(post) {
    return await api.post(endPoints.POSTS, post);
}

export async function edit(post) {
    const id = post.objectId;
    return await api.put(`${endPoints.POSTS}/${id}`, post);
}

export async function del(id) {
    return await api.del(`${endPoints.POSTS}/${id}`);
}