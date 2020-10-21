export default async function () {
    console.log(this.params)
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
        team: await this.load('./templates/catalog/team.hbs')
    };

    const data = Object.assign({}, this.app.userData);
    data.teams = [
        {
            teamId: "111",
            name: "Cherry",
            comment: "Cherry's Comments"
        },
        {
            teamId: "222",
            name: "Banana",
            comment: "Banana's Comment"
        },
        {
            teamId: "333",
            name: "Peach",
        }
    ];
    
    this.partial('./templates/catalog/teamCatalog.hbs', data);
}