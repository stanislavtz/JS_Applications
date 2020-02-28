function getArticleGenerator(articles) {
    const articlesCopy = [...articles];
    let content = document.getElementById('content');

    return () => {
        if (articlesCopy.length === 0) {
            return;
        }
        
        let element = articlesCopy.shift();

        let article = document.createElement(`article`);
        article.textContent = element;

        content.appendChild(article);
    }
}