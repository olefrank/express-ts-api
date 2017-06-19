import {Post} from '../model/Post';

export class Dao {

    private _instance: Dao;
    private _id: number;
    private _posts:Post[] = [
        {
            "id": 1,
            "author": "Ole",
            "heading": "Overskrift 1",
            "body": "Dette er en test på body tekst."
        },
        {
            "id": 2,
            "author": "Mie",
            "heading": "Mies Overskrift trækker - ja, overskrifter",
            "body": "Hej jeg hedder Mie og er god til det der med computer."
        }
    ];

    constructor() {
        if (!this._instance) {
            this._instance = new Dao();
            this._id = this._posts.length;
        }
    }

    getId = () => {
        return this._id += 1;

    };

    getPostById = (id: number): Post => {
        const post: Post = this._posts.find(post => {
            return post.id === id;
        });
        return post;
    };

    getAllPosts = (): Post[] => {
        return this._posts;
    };

    savePost = (post: Post): void => {
        post.id = this.getId();
        this._posts.push(post);
    };

    updatePost = (post: Post): boolean => {
        const idx = this._posts.findIndex(elem => post.id === elem.id);
        this._posts[idx] = post;

        return idx > -1;
    };

    deletePost = (id: number): boolean => {
        const idx = this._posts.findIndex(elem => id === elem.id);


        if (idx > -1) {
            this._posts.splice(idx, 1);
        }

        return idx > -1;
    };
}
