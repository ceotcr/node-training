const randomUsername = (length = 6) => {
    const chars = 'abcdefghijklmnopqrstuvwxyz';
    return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
};

const randomText = (length = 3) => {
    const words = 'Lorem ipsum dolor sit amet consectetur adipiscing elit'.split(' ');
    return Array.from({ length }, () => words[Math.floor(Math.random() * words.length)]).join(' ');
}

let userIdCounter = 1;
let postIdCounter = 1;
let commentIdCounter = 1;

class User {
    constructor(username) {
        this.id = userIdCounter++;
        this.username = username;
        this.posts = [];
    }

    createPost(content) {
        const post = new Post(content, this);
        this.posts.push(post);
        return post;
    }
}

class Post {
    constructor(content, author) {
        this.id = postIdCounter++;
        this.content = content;
        this.author = author;
        this.likes = [];
        this.comments = [];
        this.createdAt = new Date().toLocaleString();
    }

    like(user) {
        if (user.id !== this.author.id && !this.likes.find(u => u.id === user.id)) {
            this.likes.push(user);
        }
    }

    comment(user, text) {
        if (user.id !== this.author.id) {
            const comment = new Comment(user, text);
            this.comments.push(comment);
        }
    }
}

class Comment {
    constructor(user, text) {
        this.id = commentIdCounter++;
        this.commenter = user;
        this.text = text;
    }
}

const users = Array.from({ length: 10 }, () => new User(randomUsername(8)));

const allPosts = users.map(user => user.createPost(`Post content: "${randomText(10)}"`));

users.forEach(user => {
    for (let i = 0; i < 2; i++) {
        const randomPost = allPosts[Math.floor(Math.random() * allPosts.length)];
        randomPost.like(user);
    }

    for (let i = 0; i < 2; i++) {
        const randomPost = allPosts[Math.floor(Math.random() * allPosts.length)];
        randomPost.comment(user, `Comment: "${randomText()}"`);
    }
});

console.log("👥 Users and their Posts:\n");

users.forEach(user => {
    console.log(`👤 User: ${user.username} (ID: ${user.id})`);
    user.posts.forEach(post => {
        console.log(`  📝 Post ID: ${post.id}`);
        console.log(`     Content: ${post.content}`);
        console.log(`     Created At: ${post.createdAt}`);

        console.log(`     👍 Likes (${post.likes.length}): ${post.likes.map(u => u.username).join(', ') || 'None'}`);

        console.log(`     💬    Comments (${post.comments.length}):`);
        if (post.comments.length === 0) {
            console.log(`        No comments.`);
        } else {
            post.comments.forEach(comment => {
                console.log(`        - ${comment.commenter.username}: ${comment.text}`);
            });
        }
        console.log();
    });
});


/*
> node .\p6.js
👥 Users and their Posts:

👤 User: bpayorsm (ID: 1)
  📝 Post ID: 1
     Content: Post content: "elit ipsum dolor ipsum elit Lorem Lorem Lorem sit dolor"
     Created At: 6/4/2025, 2:25:25 pm
     👍 Likes (2): fpobetjo, izytwejd
     💬    Comments (3):
        - nszpkjue: Comment: "amet consectetur adipiscing"
        - nszpkjue: Comment: "adipiscing amet ipsum"
        - rlusdzfm: Comment: "elit sit adipiscing"

👤 User: recjznoy (ID: 2)
  📝 Post ID: 2
     Content: Post content: "amet consectetur adipiscing sit consectetur amet sit adipiscing amet dolor"
     Created At: 6/4/2025, 2:25:25 pm
     👍 Likes (1): rlusdzfm
     💬    Comments (2):
        - lzhqjyuw: Comment: "Lorem amet consectetur"
        - nbtkcnor: Comment: "sit consectetur elit"

👤 User: fhtidnho (ID: 3)
  📝 Post ID: 3
     Content: Post content: "sit dolor Lorem dolor dolor amet consectetur Lorem amet consectetur"
     Created At: 6/4/2025, 2:25:25 pm
     👍 Likes (0): None
     💬    Comments (3):
        - fpobetjo: Comment: "ipsum consectetur Lorem"
        - fpobetjo: Comment: "adipiscing dolor elit"
        - lzhqjyuw: Comment: "dolor adipiscing ipsum"

👤 User: fpobetjo (ID: 4)
  📝 Post ID: 4
     Content: Post content: "consectetur ipsum ipsum ipsum consectetur adipiscing elit elit ipsum elit"
     Created At: 6/4/2025, 2:25:25 pm
     👍 Likes (2): bpayorsm, lzhqjyuw
     💬    Comments (2):
        - dbuwapdz: Comment: "adipiscing dolor adipiscing"
        - nbtkcnor: Comment: "elit adipiscing adipiscing"

👤 User: dbuwapdz (ID: 5)
  📝 Post ID: 5
     Content: Post content: "ipsum adipiscing sit Lorem adipiscing sit amet consectetur amet consectetur"
     Created At: 6/4/2025, 2:25:25 pm
     👍 Likes (4): recjznoy, lzhqjyuw, nszpkjue, nbtkcnor
     💬    Comments (1):
        - fhtidnho: Comment: "Lorem dolor elit"

👤 User: izytwejd (ID: 6)
  📝 Post ID: 6
     Content: Post content: "adipiscing amet Lorem adipiscing sit ipsum sit ipsum Lorem amet"
     Created At: 6/4/2025, 2:25:25 pm
     👍 Likes (1): fpobetjo
     💬    Comments (3):
        - bpayorsm: Comment: "Lorem amet ipsum"
        - bpayorsm: Comment: "consectetur consectetur consectetur"
        - dbuwapdz: Comment: "Lorem elit elit"

👤 User: lzhqjyuw (ID: 7)
  📝 Post ID: 7
     Content: Post content: "dolor elit sit consectetur Lorem sit sit ipsum amet adipiscing"
     Created At: 6/4/2025, 2:25:25 pm
     👍 Likes (2): fhtidnho, dbuwapdz
     💬    Comments (1):
        - fhtidnho: Comment: "ipsum amet adipiscing"

👤 User: nszpkjue (ID: 8)
  📝 Post ID: 8
     Content: Post content: "adipiscing adipiscing consectetur sit consectetur sit Lorem amet sit consectetur"
     Created At: 6/4/2025, 2:25:25 pm
     👍 Likes (2): recjznoy, izytwejd
     💬    Comments (1):
        - izytwejd: Comment: "ipsum Lorem amet"

👤 User: rlusdzfm (ID: 9)
  📝 Post ID: 9
     Content: Post content: "ipsum ipsum adipiscing ipsum sit Lorem consectetur elit dolor adipiscing"
     Created At: 6/4/2025, 2:25:25 pm
     👍 Likes (0): None
     💬    Comments (1):
        - izytwejd: Comment: "elit consectetur sit"

👤 User: nbtkcnor (ID: 10)
  📝 Post ID: 10
     Content: Post content: "adipiscing consectetur amet consectetur elit Lorem sit dolor dolor amet"
     Created At: 6/4/2025, 2:25:25 pm
     👍 Likes (0): None
     💬    Comments (2):
        - recjznoy: Comment: "amet consectetur Lorem"
        - rlusdzfm: Comment: "ipsum adipiscing Lorem"
*/