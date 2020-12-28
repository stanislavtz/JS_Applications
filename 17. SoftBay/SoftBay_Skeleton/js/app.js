import { home } from './controllers/home.js';
import * as user from './controllers/user.js';
import * as offer from './controllers/catalog.js';

window.addEventListener('load', loadApplication);

function loadApplication() {
    const app = Sammy('#main', function () {
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

        this.get('#/profile', user.profilePage);
        
        this.get('#/logout', user.logout);


        this.get('#/dashboard', offer.dashboardPage);

        this.get('#/create', offer.createPage);
        this.post('#/create', (ctx) => { offer.createPost.call(ctx) });
       
        this.get('#/edit/:id', offer.editPage);
        this.post('#/edit/:id', (ctx) => { offer.editPost.call(ctx) });

        this.get('#/delete/:id', offer.deletePage);
        this.post('#/delete/:id', (ctx) => { offer.deletePost.call(ctx) });
        
        this.get('#/details/:id', offer.detailsPage);
        
        this.get('#/buy/:id', offer.buyAction);
    });

    app.run();
}