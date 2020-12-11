import { home } from './controllers/home.js';
import * as user from './controllers/user.js';
import * as posts from './controllers/posts.js';


window.addEventListener('load', loadApplication);

function loadApplication() {
    const app = Sammy('#root', function () {
        this.use('Handlebars', 'hbs');

        this.userData = {
            email: () => sessionStorage.getItem('email')
        }

        this.get('/', home);
        this.get('#/home', home);
        this.get('index.html', home);

        this.get('#/register', user.registerPage);
        this.post('#/register', (ctx) => { user.registerPost.call(ctx) });

        this.get('#/login', user.loginPage);
        this.post('#/login', (ctx) => { user.loginPost.call(ctx) });

        this.get('#/logout', user.logout);

        this.post('#/create', (ctx) => { posts.createPost.call(ctx) });

        this.get('#/details/:id', posts.detailsPage);

        this.get('#/edit/:id', posts.editPage);
        this.post('#/edit/:id', (ctx) => { posts.editPost.call(ctx) });

        this.get('#/delete/:id', posts.delAction);
    });

    app.run();
}