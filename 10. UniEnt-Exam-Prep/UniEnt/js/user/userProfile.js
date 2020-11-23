export default async function () {
    this.partials = {
        header: await this.load('./view/common/header.hbs'),
        footer: await this.load('./view/common/footer.hbs'),
    }

    const ownEvents = this.app.userData.events
        .filter(ev => ev.organizer === sessionStorage.getItem('username'))
        .sort((a, b) => b.interestedIn - a.interestedIn);

    const numberEvents = ownEvents.length;

    const context = Object.assign({ numberEvents, ownEvents }, this.app.userData);

    await this.partial('./view/user/user.hbs', context);
}