import {Post} from "../model/post";

export interface IPostVM {
    id: number;
    author: string;
    text: string;
}

/**
 * Class to model a blog post
 */
export class PostVM implements IPostVM {

    // Post
    public static postsToPostsVM(posts: Post[]): PostVM[] {
        return posts.map((post: Post) => {
            return new PostVM(post.id, post.author, post.body);
        });
    }

    public static postToPostVM(post: Post): PostVM {
        return new PostVM(post.id, post.author, post.body);
    }

    public static mapToPost(input: Post): Post {
        return new Post(
            input.author || undefined,
            input.heading || undefined,
            input.body || undefined,
            input.id || undefined,
        );
    }

    public id: number;
    public author: string;
    public text: string;

    constructor(id: number, author: string, body: string) {
        this.id = id;
        this.author = author;
        this.text = body;
    }
}
