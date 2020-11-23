import { get } from '../../models/events.js';

export default async function () {
    this.partials = {
        header: await this.load('./view/common/header.hbs'),
        footer: await this.load('./view/common/footer.hbs'),
    }

    const result = await get(this.params.id);

    const context = Object.assign(this.app.userData, { ...result.data(), id: this.params.id });

    const organizer = result.data().organizer;

    const username = this.app.userData.username();

    context.isOrganizer = organizer === username ? true : false;

    await this.partial('./view/events/details.hbs', context);
}