import {getAllTeams} from '../data.js'

export default async function () {
    if (!localStorage.userToken) {
        alert('Please login first!');
        return;
    }

    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
        team: await this.load('./templates/catalog/team.hbs')
    };

    const teams = await getAllTeams();
    if(teams.length > 0) {
        this.app.userData.hasNoTeam = false;
    }

    teams.forEach(team => team.teamId = team.objectId);
    this.app.userData.teams = teams;
    this.partial('./templates/catalog/teamCatalog.hbs', this.app.userData);
}