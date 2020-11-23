import { update } from '../../models/events.js';

export default async function () {
    const event = this.app.userData.events.find(e => e.id === this.params.id);

    event.interestedIn++;

    await update(this.params.id, event);

    this.redirect('#/details/' + this.params.id)

}