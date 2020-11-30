import { home } from './controllers/home.js';
import * as user from './controllers/user.js';

window.addEventListener('load', loadApplication);

function loadApplication() {
    const app = Sammy('#rooter', function () {

        this.use('Handlebars', 'hbs');

        this.userData = {
            names: () => sessionStorage.getItem('names'), //|| 'Stanislav Tzekov',
            haveFood: true
        }

        this.get('/', home);
        this.get('#/home', home);
        this.get('index.html', home);

        this.get('#/register', user.registerPage);
        this.post('#/register', (ctx) => { user.registerPost.call(ctx) });

        this.get('#/login', user.loginPage);
        this.post('#/login', (ctx) => { user.loginPost.call(ctx) });

        this.get('#/logout', user.logout)
    });

    app.run();
}