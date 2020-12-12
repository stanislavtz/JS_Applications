import API from './api.js';

const appId = '0C03731B-2093-76AF-FFFC-D971AFEE7D00';
const apiKey = 'D06911C8-4118-4CCF-B29D-813332656146';

const api = new API(appId, apiKey);

const endPoints = {
    MOVIES: 'data/movies'
}

export const registerFn = api.register.bind(api);
export const loginFn = api.login.bind(api);
export const logoutFn = api.logout.bind(api);

export async function getAllData() {
    return api.get(endPoints.MOVIES);
}

export async function getDataById(id) {
    return await api.get(`${endPoints.MOVIES}/${id}`);
}

export async function createData(movie) {
    return await api.post(endPoints.MOVIES, movie);
}

export async function editData(movie) {
    const id = movie.objectId;
    return await api.put(`${endPoints.MOVIES}/${id}`, movie);
}

export async function deleteData(id) {
    return await api.del(`${endPoints.MOVIES}/${id}`);
}

export async function likeAction(movie) {
    const userEmail = sessionStorage.getItem('email');

    if(movie.likers.includes(userEmail)) {
        return;
    }
    
    movie.likers.push(userEmail);

    return editData(movie);
}