$(() => {
    const app = Sammy("#main", function() {
        this.use("Handlebars", "hbs");
        this.get('index.html', function() {
            this.partial('./templates/create/createForm.hbs');
        });
    });

    app.run()
})