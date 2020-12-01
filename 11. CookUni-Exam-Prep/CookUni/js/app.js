import { home } from './controllers/home.js';
import * as user from './controllers/user.js';
import * as recipies from './controllers/recipes.js';

window.addEventListener('load', loadApplication);

function loadApplication() {
    const app = Sammy('#rooter', async function () {

        this.use('Handlebars', 'hbs');

        const categories = {
            "Vegetables and legumes/beans": "https://s.clipartkey.com/mpngs/s/20-201647_download-vegetable-png-clipart-for-designing-purpose-vegetables.png",
            "Fruits": 'https://www.healthyeating.org/images/default-source/home-0.0/nutrition-topics-2.0/general-nutrition-wellness/2-2-2-3foodgroups_fruits_detailfeature_thumb.jpg?sfvrsn=7abe71fe_4',
            "Grain Food": 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQFdE7XSaV6c1AF75u6A4NmMylhULlZQzokg&usqp=CAU',
            "Milk, cheese, eggs and alternatives": 'https://post.healthline.com/wp-content/uploads/2020/08/AN480-Eggs-Dairy-732x549-thumb.jpg',
            "Lean meats and poultry, fish and alternatives": 'https://c8.alamy.com/comp/PXA12M/high-protein-food-for-body-builders-of-lean-steak-pork-patemilk-cheese-chicken-shrimps-eggs-beansnuts-with-dumbbell-weights-protein-sources-he-PXA12M.jpg'
        }

        this.userData = {
            names: () => sessionStorage.getItem('names'),
            categories
        }

        this.get('/', home);
        this.get('#/home', home);
        this.get('index.html', home);

        this.get('#/register', user.registerPage);
        this.post('#/register', (ctx) => { user.registerPost.call(ctx) });

        this.get('#/login', user.loginPage);
        this.post('#/login', (ctx) => { user.loginPost.call(ctx) });

        this.get('#/logout', user.logout);

        this.get('#/share', recipies.sharePage);
        this.post('#/share', (ctx) => { recipies.sharePost.call(ctx) });

        this.get('#/details/:id', recipies.detailsPage);

        this.get('#/edit/:id', recipies.editPage);
        this.post('#/edit/:id', (ctx) => { recipies.editPost.call(ctx) });

    });

    app.run();
}