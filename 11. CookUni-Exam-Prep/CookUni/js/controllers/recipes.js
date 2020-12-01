import * as data from '../data.js';
import { showSuccess, showError } from '../notifications.js';

export async function sharePage() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
    }

    await this.partial('./templates/recipe/share.hbs', this.app.userData);
}

export async function sharePost() {
    try {
        const { meal, ingredients, prepMethod, description, foodImageURL, category } = this.params;

        const recipe = {
            meal,
            ingredients: ingredients.split(',').map(x => x.trim()),
            prepMethod,
            description,
            foodImageURL,
            category,
            categoryImageURL: this.app.userData.categories[category]
        }

        const result = await data.shareRecipe(recipe);

        if (result.hasOwnProperty('errorData')) {
            throw new Error(result.message)
        }

        showSuccess('Recipe shared successfully!');

        this.redirect('#/home');

    } catch (error) {
        console.error(error.message);
        showError(error.message);
    }
}

export async function detailsPage() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
    }

    const recipe = await data.getReipeById(this.params.id);

    this.app.userData.recipe = recipe;

    if (recipe.ownerId === sessionStorage.getItem('userId')) {
        this.app.userData.isOwner = true;
    } else {
        this.app.userData.isOwner = false;
    }

    await this.partial('./templates/recipe/details.hbs', this.app.userData);

}

export async function editPage() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
    }

    const recipe = await data.getReipeById(this.params.id);
    recipe.ingredients = recipe.ingredients.join(', ')

    this.app.userData.recipe = recipe;

    await this.partial('./templates/recipe/edit.hbs', this.app.userData);
}

export async function editPost() {
    try {
        const { meal, ingredients, prepMethod, description, foodImageURL, category, id } = this.params;
    
        const recipe = {
            id,
            meal,
            ingredients: ingredients.split(',').map(x => x.trim()),
            prepMethod,
            description,
            foodImageURL,
            category,
            categoryImageURL: this.app.userData.categories[category]
        }
    
        const result = await data.editRecipe(recipe);

        if (result.hasOwnProperty('errorData')) {
            throw new Error(result.message)
        }

        showSuccess('Recipe was updated successfully!');
    
        this.redirect('#/home');        
    } catch (error) {
        console.error(error.message);
        showError(error.message);
    }
}