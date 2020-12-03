import { home } from './controllers/home.js';
import * as user from './controllers/user.js';
import * as shoes from './controllers/shoes.js';

window.addEventListener('load', loadApplication);

function loadApplication() {
    const app = Sammy('body', function () {
        this.use('Handlebars', 'hbs');

        this.userData = {
            email: () => sessionStorage.getItem('email') //|| 'stan@abv.bg'
        }

        this.get('/', home);
        this.get('#/home', home);
        this.get('index.html', home);

        this.get('#/register', user.registerPage);
        this.post('#/register', (ctx) => { user.registerPost.call(ctx)});

        this.get('#/login', user.loginPage);
        this.post('#/login', (ctx) => {user.loginPost.call(ctx)});

        this.get('#/logout', user.logout);

        this.get('#/create', shoes.createPage);

        this.get('#/details', shoes.detailsPage);

    });

    app.run();
}