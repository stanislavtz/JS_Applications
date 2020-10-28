import { getAllTeams } from '../data.js'

export default async function () {
    if (!localStorage.userToken) {
        alert('Please login first!');
        this.redirect('#/login')
        return;
    }

    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
        team: await this.load('./templates/catalog/team.hbs')
    };

    this.app.userData.teams = [
        {
            objectId: "111",
            name: "Cherry",
            comment: "This is a Cherry's team",
            members: [
                { username: "Pesho"},
                { username: "Tosho"},
                { username: "Gosho"},
            ]
        },
        {
            objectId: "222",
            name: "Apple",
            comment: "",
            members: [
                { username: "Petia"},
                { username: "Valia"},
                { username: "Maya"},
            ]
        },
        {
            objectId: "333",
            name: "Orange",
            comment: "This is an Orange's team!",
            members: []
        }
    ];

    const serverTeams = await getAllTeams();
    this.app.userData.teams = this.app.userData.teams.concat(serverTeams);
    this.partial('./templates/catalog/teamCatalog.hbs', this.app.userData);
}