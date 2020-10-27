export default async function () {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
        teamMember: await this.load('./templates/catalog/teamMember.hbs'),
        teamControls: await this.load('./templates/catalog/teamControls.hbs')
    };

    const team = this.app.userData.teams.find(t => t.teamId === this.params.id);

    this.partial('./templates/catalog/details.hbs', team);
}