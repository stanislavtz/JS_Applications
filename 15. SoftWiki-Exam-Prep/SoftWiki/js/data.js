import API from './api.js';

const appId = 'B20DD368-E60A-653C-FFC0-4317A6CBD200';
const apiKey = '09F4830B-4D97-4CEC-9781-B23918E43255';

const api = new API(appId, apiKey);

const endPoints = {
    ARTICLES: 'data/articles'
}

export const registerFn = api.register.bind(api);
export const loginFn = api.login.bind(api);
export const logoutFn = api.logout.bind(api);

export async function getArticles() {
    return api.get(endPoints.ARTICLES);
}

export async function getById(id) {
    return await api.get(`${endPoints.ARTICLES}/${id}`);
}

export async function createArticle(article) {
    return await api.post(endPoints.ARTICLES, article);
}

export async function edit(article) {
    const id = article.objectId;
    return await api.put(`${endPoints.ARTICLES}/${id}`, article);
}

export async function del(id) {
    return await api.del(`${endPoints.ARTICLES}/${id}`);
}

// export async function likeMovie(movie) {
//     const userEmail = sessionStorage.getItem('email');

//     if(movie.likers.includes(userEmail)) {
//         return;
//     }
    
//     movie.likers.push(userEmail);

//     return editMovie(movie);
// }