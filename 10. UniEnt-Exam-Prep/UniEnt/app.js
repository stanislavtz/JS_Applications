import home from './js/home.js';

import register, { registerPost } from './js/user/register.js';
import login, { loginPost } from './js/user/login.js';
import userProfile from './js/user/userProfile.js';
import logout from './js/user/logout.js';

import create, { createPost } from './js/events/create.js';
import edit, { editPost } from './js/events/edit.js';
import details from './js/events/details.js';

import joinEvent from './js/events/joinEvent.js';
import closeEvent from './js/events/closeEvent.js';

window.addEventListener('load', loadApplication);

function loadApplication() {
    const app = Sammy('#main', function () {
        this.use('Handlebars', 'hbs');

        this.userData = {
            username: () => sessionStorage.getItem('username'),
            userId: () => sessionStorage.getItem('userId'),
        }

        this.get('index.html', home);
        this.get('#/home', home);
        this.get('/', home);

        this.get('#/login', login);
        this.post('#/login', (ctx) => { loginPost.call(ctx) });

        this.get('#/register', register);
        this.post('#/register', (ctx) => { registerPost.call(ctx) });

        this.get('#/logout', logout);

        this.get('#/create', create);
        this.post('#/create', (ctx) => { createPost.call(ctx) });

        this.get('#/details/:id', details);

        this.get('#/edit/:id', edit);
        this.post('#/edit/:id', (ctx) => { editPost.call(ctx) });

        this.get('#/delete/:id', closeEvent);

        this.get('#/user', userProfile);

        this.get('#/join/:id', joinEvent);
    });

    app.run('#/home');
}
