
export interface IPost {
    id: number,
    author: string,
    heading: string,
    body: string
}


/**
 * Class to model a blog post
 */
export class Post implements IPost {

    id: number;
    author: string;
    heading: string;
    body: string;

    constructor(id: number, author: string, heading: string, body: string) {
        this.id = id;
        this.author = author;
        this.heading = heading;
        this.body = body;
    }
}
