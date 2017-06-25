import {Post} from '../model/Post';
import posts from '../data/posts';

export class Dao {

    private static _instance: Dao;
    private _id: number;
    private _posts:Post[];

    private constructor() {
        this._posts = posts;
        this._id = this._posts.length;
    }

    static getInstance():Dao {
        if (!Dao._instance) {
            Dao._instance = new Dao();
        }
        return Dao._instance;
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
