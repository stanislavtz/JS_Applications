import {getAllRecipes} from '../data.js';

export async function home() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
        meal: await this.load('./templates/recipe/meal.hbs')
    }

    const meals =  await getAllRecipes();
    this.app.userData.meals = meals;
    
    await this.partial('./templates/home.hbs', this.app.userData);
}