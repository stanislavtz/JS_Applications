function solve() {
    class Post {
        constructor(title, content) {
            this.title = title;
            this.content = content;
        }
        
        toString() {
            let result = '';
            result += `Post: ${this.title}\n`;
            result += `Content: ${this.content}\n`;

            return result.trim();
        }
    }

    class SocialMediaPost extends Post {
        _comments = [];

        constructor(title, content, likes, dislikes) {
            super(title, content);
            this.likes = likes;
            this.dislikes = dislikes;
        }

        addComment(comment) {
            this._comments.push(comment);
        }

        toString() {
            let result = super.toString() + '\n';
            result += `Rating: ${this.likes - this.dislikes}\n`;

            if(this._comments.length > 0){
                result += `Comments:\n${this._comments.map(c => ` * ${c}`).join('\n')}`;
            }

            return result.trim();
        }
    }

    class BlogPost extends Post {
        constructor(title, content, views) {
            super(title, content);
            this.views = {views};
        }

        view() {
            this.views.views++;

            return this;
        }

        toString(){
            let result = super.toString() + '\n';
            result = super.toString() + '\n';
            result += `Views: ${this.views.views}`;

            return result;
        }
    }
    
    return {
        Post,
        SocialMediaPost,
        BlogPost
    }
}

let classes = solve();

let test = new classes.BlogPost("TestTitle", "TestContent", 5);

test.view().view().view();