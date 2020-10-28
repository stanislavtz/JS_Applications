export default async function () {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
        teamMember: await this.load('./templates/catalog/teamMember.hbs'),
        teamControls: await this.load('./templates/catalog/teamControls.hbs')
    };

    const team = await this.app.userData.teams.find(t => t.objectId === this.params.id);
    console.log(team)
    
    Object.assign(team, this.app.userData);
    this.partial('./templates/catalog/details.hbs', team);
}