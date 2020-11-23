import { close } from '../../models/events.js';

export default async function () {
    await close(this.params.id);
    this.redirect('#/home');
}