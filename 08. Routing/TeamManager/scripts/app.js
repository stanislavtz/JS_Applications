$(() => {
    const app = Sammy("#main", function() {
        this.use("Handlebars", "hbs");
        this.get('index.html', async function() {
            this.partials = {
                header: await this.load('./templates/common/header.hbs'),
                footer: await this.load('./templates/common/footer.hbs')
            }

            this.partial('./templates/home/home.hbs');
        });
    });

    app.run()
})