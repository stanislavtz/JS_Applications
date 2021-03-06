import { home } from './controllers/home.js';
import * as user from './controllers/user.js';
import * as shoes from './controllers/shoes.js';

window.addEventListener('load', loadApplication);

function loadApplication() {
    const app = Sammy('body', function () {
        this.use('Handlebars', 'hbs');

        this.userData = {
            email: () => sessionStorage.getItem('email'),
        }

        this.get('/', home);
        this.get('#/home', home);
        this.get('index.html', home);

        this.get('#/register', user.registerPage);
        this.post('#/register', (ctx) => { user.registerPost.call(ctx) });

        this.get('#/login', user.loginPage);
        this.post('#/login', (ctx) => { user.loginPost.call(ctx) });

        this.get('#/logout', user.logout);

        this.get('#/create', shoes.createPage);
        this.post('#/create', (ctx) => { shoes.createPost.call(ctx) });

        this.get('#/details/:id', shoes.detailsPage);

        this.get('#/edit/:id', shoes.editPage);
        this.post('#/edit/:id', (ctx) => { shoes.editPost.call(ctx) });

        this.get('#/delete/:id', shoes.delAction);
        this.get('#/buy/:id', shoes.buyAction);
    });

    app.run();
}