import { getAll } from '../models/events.js';

export default async function () {
    this.partials = {
        header: await this.load('./view/common/header.hbs'),
        footer: await this.load('./view/common/footer.hbs'),
        event: await this.load('./view/events/event.hbs'),
        noEvents: await this.load('./view/events/noEvents.hbs')
    }

    const events = (await getAll());

    if (events.hasOwnProperty('errorData')) {
        throw new Error(events.message);
    }

    this.app.userData.events = events.docs.map(i => {
        const data = i.data();
        data.id = i.id;
        return data;
    });

    await this.partial('./view/home.hbs', this.app.userData);
}