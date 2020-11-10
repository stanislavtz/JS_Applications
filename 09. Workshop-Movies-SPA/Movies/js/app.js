window.addEventListener('load', loadProject);

function loadProject() {
    const app = Sammy("#container", function () {
        this.use("Handlebars", "hbs");
        console.log(this);

        
    })
}