import homeView from './views/homeView.js'; 

window.addEventListener('load', loadProject);

function loadProject() {
    const app = Sammy("#container", function () {
        this.use("Handlebars", "hbs");

        this.userData = {
            islogedIn: false
        }
        
        this.get('index.html', homeView);
        this.get('#/home', homeView);
        this.get('/', homeView);

    });

    app.run();
}