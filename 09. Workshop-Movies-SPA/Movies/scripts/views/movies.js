export async function catalog() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
    }
    
    await this.partial("./templates/movies/catalog.hbs",  this.app.userData);
}

export async function create() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
    }
    
    await this.partial("./templates/movies/create.hbs",  this.app.userData);
}

export async function details() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
    }
    
    await this.partial("./templates/movies/details.hbs",  this.app.userData);
}

export async function edit() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
    }
    
    await this.partial("./templates/movies/edit.hbs",  this.app.userData);
}