import { getArticles } from '../data.js';

export async function home() {
    this.partials = {
        header: await this.load('/templates/common/header.hbs'),
        footer: await this.load('/templates/common/footer.hbs'),
        article: await this.load('./templates/articles/article.hbs')
    }

    const obj = {
        js: [],
        cSharp: [],
        java: [],
        pyton: []
    }

    Object.assign(this.app.userData, obj);

    const articles = await getArticles();

    for (const article of articles) {
        // if(!this.app.userData[article.category].map(a => a.objectId).includes(article.objectId)){
        //     this.app.userData[article.category].push(article);
        // }

        if(article.category === 'JavaScript') {
            if(!this.app.userData.js.map(a => a.objectId).includes(article.objectId)){
                this.app.userData.js.push(article);
            }
        }

        if(article.category === 'C#') {
            if(!this.app.userData.cSharp.map(a => a.objectId).includes(article.objectId)){
                this.app.userData.cSharp.push(article);
            }
        }

        if(article.category === 'Java') {
            if(!this.app.userData.java.map(a => a.objectId).includes(article.objectId)){
                this.app.userData.java.push(article);
            }
        }

        if(article.category === 'Pyton') {
            if(!this.app.userData.pyton.map(a => a.objectId).includes(article.objectId)){
                this.app.userData.pyton.push(article);
            }
        }
    }

    await this.partial('/templates/home.hbs', this.app.userData);
}