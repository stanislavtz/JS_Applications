export default async function () {
    if (!localStorage.userToken) {
        alert('Please login first');
        return;
    }

    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
        editForm: await this.load('./templates/edit/editForm.hbs')
    }

    this.partial('./templates/edit/editPage.hbs', this.app.userData);
}

export async function editPut() {
    
}