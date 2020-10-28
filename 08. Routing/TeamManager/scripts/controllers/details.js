import {getAllTeams} from '../data.js'

export default async function () {
    if (!localStorage.userToken) {
        alert('Please login first!');
        this.redirect('#/login');
        return;
    }
    
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
        teamMember: await this.load('./templates/catalog/teamMember.hbs'),
        teamControls: await this.load('./templates/catalog/teamControls.hbs')
    };
    console.log(getAllTeams)
    const team = getAllTeams().find(t => t.objectId === this.params.id);
    console.log(team)
    
    Object.assign(team, this.app.userData);
    this.partial('./templates/catalog/details.hbs', team);
}