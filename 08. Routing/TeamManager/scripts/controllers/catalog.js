import { getAllTeams } from '../data.js'

export default async function () {
    // if (!localStorage.userToken) {
    //     alert('Please login first!');
    //     return;
    // }

    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
        team: await this.load('./templates/catalog/team.hbs')
    };

    const serverTeams = await getAllTeams();
    // if(teams.length > 0) {
    //     this.app.userData.hasNoTeam = false;
    // }
    //teams.forEach(team => team.teamId = team.objectId);


    this.app.userData.teams = [
        {
            teamId: "111",
            name: "Cherry",
            comment: "This is a Cherry's team",
            members: [
                { username: "Pesho"},
                { username: "Tosho"},
                { username: "Gosho"},
            ]
        },
        {
            teamId: "222",
            name: "Apple",
            comment: "",
            members: [
                { username: "Petia"},
                { username: "Valia"},
                { username: "Maya"},
            ]
        },
        {
            teamId: "333",
            name: "Orange",
            comment: "This is an Orange's team!",
            members: []
        }
    ];

    this.app.userData.teams.concat(serverTeams);

    this.partial('./templates/catalog/teamCatalog.hbs', this.app.userData);
}