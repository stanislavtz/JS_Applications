import { home } from './controllers/home.js';
import * as user from './controllers/user.js';
import * as idea from './controllers/catalog.js';

window.addEventListener('load', loadApplication);

function loadApplication() {
    const app = Sammy('#main', function () {
        this.use('Handlebars', 'hbs');

        this.userData = {
            username: () => sessionStorage.getItem('username')
        }

        this.get('/', home);
        this.get('#/home', home);
        this.get('index.html', home);

        this.get('#/register', user.registerPage);
        this.post('#/register', (ctx) => { user.registerPost.call(ctx) });

        this.get('#/login', user.loginPage);
        this.post('#/login', (ctx) => { user.loginPost.call(ctx) });

        this.get('#/logout', user.logout);

        this.get('#/catalog', idea.catalogPage);

        this.get('#/create', idea.createPage);
        this.post('#/create', (ctx) => { idea.createPost.call(ctx) });

        this.get('#/details/:id', idea.detailsPage);

        this.post('#/edit/:id', (ctx) => { idea.editPost.call(ctx) });

        this.get('#/delete/:id', idea.delAction);
        this.get('#/like/:id', idea.likeAction);
    });

    app.run();
}