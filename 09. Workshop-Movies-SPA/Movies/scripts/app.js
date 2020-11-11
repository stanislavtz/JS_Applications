import home from './views/home.js';
import login from './views/login.js';
import register from './views/register.js';
import * as movies from './views/movies.js';

window.addEventListener('load', loadProject);

function loadProject() {
    const app = Sammy("#container", function () {
        this.use("Handlebars", "hbs");

        this.userData = {
            loggedIn: true
        }

        this.get('index.html', home);
        this.get('#/home', home);
        this.get('/', home);

        this.get('#/register', register);
        this.post('#/register', () => { });

        this.get('#/login', login);
        this.post('#/login', () => { });

        this.get('#/catalog', movies.catalog);
        this.get('#/create', movies.create);
        this.get('#/details/:id', movies.details);
        this.get('#/edit/:id', movies.edit);

    });

    app.run();
}