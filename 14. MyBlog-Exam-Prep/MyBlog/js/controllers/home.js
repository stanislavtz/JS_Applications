import { getAll } from '../data.js';

export async function home() {
    this.partials = {
        header: await this.load('/templates/common/header.hbs'),
        footer: await this.load('/templates/common/footer.hbs'),
        create: await this.load('./templates/posts/create.hbs'),
        post: await this.load('./templates/posts/post.hbs')
    }

    const posts = await getAll();
    
    posts.forEach(post => {
        post.isOwner = post.ownerId === sessionStorage.getItem('userId');
    });

    this.app.userData.posts = posts;

    await this.partial('/templates/home.hbs', this.app.userData);
}