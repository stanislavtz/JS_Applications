export default async function () {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
        createForm: await this.load('./templates/create/createForm.hbs')
    }

    this.partial('./templates/create/createPage.hbs', this.app.userData);
}

export function createPost() {
    console.log(this.params);
    const newTeam = {
        name: this.params.name,
        comment: this.params.comment
    }

    if(Object.values(newTeam).some(v => v.length === 0)) {
        alert("All fields are required!!");
        return;
    }
}