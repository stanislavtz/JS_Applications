import API from './api.js';

const appId = 'C5D8513F-2C59-75D1-FFCA-284D0BB52200';
const apiKey = '61D42E03-78EB-4FFD-903F-1CC2E644B7D5';

const api = new API(appId, apiKey);

const endPoints = {
    SHOES: 'data/shoes'
}

export const registerFn = api.register.bind(api);
export const loginFn = api.login.bind(api);
export const logoutFn = api.logout.bind(api);

export async function getAllShoes() {
    return api.get(endPoints.SHOES);
}

export async function getShoesById(id) {
    return await api.get(`${endPoints.SHOES}/${id}`);
}

export async function createShoes(shoes) {
    return await api.post(endPoints.SHOES, shoes);
}

// export async function editRecipe(recipe) {
//     const id = recipe.objectId;
//     return await api.put(`${endPoints.SHOES}/${id}`, recipe);
// }

// export async function archiveRecipe(id) {
//     return await api.del(`${endPoints.SHOES}/${id}`);
// }

// export async function likeRecipe(recipe) {
//     recipe.likes += 1;

//     return editRecipe(recipe);
// }