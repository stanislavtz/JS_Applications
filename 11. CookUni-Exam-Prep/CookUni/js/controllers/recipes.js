import { shareRecipe, editRecipe } from '../data.js';
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
            ingredients: ingredients.split(',').map(x => {
                x.trim(); 
                x.trim('"');
            }),
            prepMethod,
            description,
            foodImageURL,
            category,
            categoryImageURL: this.app.userData.categories[category]
        }
    
        const result = await shareRecipe(recipe);

        if(result.hasOwnProperty('errorData')) {
            throw new Error(result.message)
        }

        showSuccess('Recipe shared successfully!');

        this.redirect('#/home');
        
    } catch (error) {
        console.error(error.message);
        showError(error.message);
    }
}