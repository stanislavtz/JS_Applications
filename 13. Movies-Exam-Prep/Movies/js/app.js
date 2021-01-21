import { home } from './controllers/home.js';
import * as user from './controllers/user.js';
import * as movie from './controllers/catalog.js';

window.addEventListener('load', loadApplication);

function loadApplication() {
    const app = Sammy('#container', function () {
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

        this.get('#/create', movie.createPage);
        this.post('#/create', (ctx) => { movie.createPost.call(ctx) });

        this.get('#/details/:id', movie.detailsPage);

        this.get('#/edit/:id', movie.editPage);
        this.post('#/edit/:id', (ctx) => { movie.editPost.call(ctx) });

        this.get('#/delete/:id', movie.delAction);
        this.get('#/like/:id', movie.likeAction);
    });

    app.run();
}