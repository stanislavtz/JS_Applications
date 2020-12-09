import { home } from './controllers/home.js';
import { getArticles } from './data.js';
import * as user from './controllers/user.js';
import * as catalog from './controllers/catalog.js';


window.addEventListener('load', loadApplication);

function loadApplication() {
    const app = Sammy('#root', function () {
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

        this.get('#/create', catalog.createPage);
        this.post('#/create', (ctx) => { catalog.createPost.call(ctx) });

        this.get('#/details/:id', catalog.detailsPage);

        this.get('#/edit/:id', catalog.editPage);
        this.post('#/edit/:id', (ctx) => { catalog.editPost.call(ctx) });

        this.get('#/delete/:id', catalog.delAction);
        // this.get('#/like/:id', movie.likeAction);
    });

    app.run();
}