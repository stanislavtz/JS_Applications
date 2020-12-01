import API from './api.js';
import { beginReuest, endRequest } from './notifications.js';

const appId = '87C3AB14-E119-BD37-FF9F-C2C061722D00';
const apiKey = '88A2580B-0189-406A-96D6-B2A923CEF601';

const api = new API(appId, apiKey, beginReuest, endRequest);

const endPoints = {
    RECIPES: 'data/recipes'
}

export const registerFn = api.register.bind(api);
export const loginFn = api.login.bind(api);
export const logoutFn = api.logout.bind(api);

export async function getAllRecipes() {
    return api.get(endPoints.RECIPES);
}

export async function getReipeById(id) {
    return await api.get(`${endPoints.RECIPES}/${id}`);
}

export async function shareRecipe(recipe) {
    return await api.post(endPoints.RECIPES, recipe);
}

export async function editRecipe(recipe) {
    const id = recipe.id;
    return await api.put(`${endPoints.RECIPES}/${id}`, recipe);
}

export async function archiveRecipe(id) {
    return await api.del(`${endPoints.RECIPES}/${id}`);
}

export async function likeRecipe(recipe) {
    recipe.likes += 1;

    return editRecipe(recipe);
}