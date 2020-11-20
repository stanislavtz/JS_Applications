import home from './views/home.js';
import register, { registerPost } from './views/register.js';
import login, { loginPost } from './views/login.js';
import logout from './views/logout.js';
import * as movies from './views/movies.js';

window.addEventListener('load', loadProject);

function loadProject() {
    const app = Sammy("#container", function () {
        this.use("Handlebars", "hbs");

        this.userData = {
            username: localStorage.getItem('username'),
            userId: localStorage.getItem('userId')
        };

        this.get('index.html', home);
        this.get('#/home', home);
        this.get('/', home);

        this.get('#/register', register);
        this.post('#/register', (ctx) => { registerPost.call(ctx); });

        this.get('#/login', login);
        this.post('#/login', (ctx) => { loginPost.call(ctx); });

        this.get('#/logout', logout);

        this.get('#/catalog', movies.allMovies);
        this.get('#/my_movies', movies.myMovies);
        this.get('#/details/:id', movies.details);
        
        this.get('#/create', movies.create);
        this.post('#/create', (ctx) => { movies.createPost.call(ctx); });
        
        this.get('#/edit/:id', movies.edit); 
        this.post('#/edit/:id', (ctx) => { movies.editPost.call(ctx); });

        this.get('#/buy/:id', movies.buy);
        
        this.get('#/delete/:id', movies.del);
    });

    app.run();
}