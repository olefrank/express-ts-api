export interface IPost {
    id: number;
    author: string;
    heading: string;
    body: string;
}

/**
 * Class to model a blog post
 */
export class Post implements IPost {

    public id: number;
    public author: string;
    public heading: string;
    public body: string;

    constructor(author: string, heading: string, body: string, id?: number) {
        this.author = author;
        this.heading = heading;
        this.body = body;
        this.id = id;
    }
}
