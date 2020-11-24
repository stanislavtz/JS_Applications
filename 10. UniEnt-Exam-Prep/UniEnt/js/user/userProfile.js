import { showSuccess, showError } from '../notification.js';

export default async function () {
    this.partials = {
        header: await this.load('./view/common/header.hbs'),
        footer: await this.load('./view/common/footer.hbs'),
    }

    try {
        const myEvents = this.app.userData.events
            .filter(ev => ev.organizer === sessionStorage.getItem('username'))
            .sort((a, b) => b.interestedIn - a.interestedIn);
    
        const numberEvents = myEvents.length;
    
        const context = Object.assign({ numberEvents, myEvents }, this.app.userData);
        
        await this.partial('./view/user/user.hbs', context);

    } catch (error) {
        console.error(error.message);
        showError(error.message);
    }
}