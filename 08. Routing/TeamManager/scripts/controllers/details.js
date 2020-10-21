export default async function dt() {
   let teamData = {
        teamId: this.params.id,
        name: "Cherry",
        members: [
            {
                username: "Pesh"
            },
            {
                username: "Ivan"
            },
            {
                username: "Gosh"
            }
        ],
        comment: 'This is a Cooment about the team!'
    };

    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
        teamMember: await this.load('./templates/catalog/teamMember.hbs'),
        teamControls: await this.load('./templates/catalog/teamControls.hbs')
    };

    teamData = Object.assign(teamData, this.app.userData);

    this.partial('./templates/catalog/details.hbs', teamData);
}