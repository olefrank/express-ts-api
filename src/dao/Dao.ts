import {Post} from '../model/Post';
import posts from '../data/posts';

export class Dao {

    public static getInstance(): Dao {
        if (!Dao.instance) {
            Dao.instance = new Dao();
        }
        return Dao.instance;
    }

    private static instance: Dao;
    private id: number;
    private posts: Post[];

    private constructor() {
        this.posts = posts;
        this.id = this.posts.length;
    }

    public getPostById = (id: number): Post => {
        const post: Post = this.posts.find((post: Post) => {
            return post.id === id;
        });
        return post;
    }

    public getAllPosts = (): Post[] => {
        return this.posts;
    }

    public savePost = (post: Post): void => {
        post.id = this.getId();
        this.posts.push(post);
    }

    public updatePost = (post: Post): boolean => {
        const idx = this.posts.findIndex((elem: Post) => post.id === elem.id);
        this.posts[idx] = post;

        return idx > -1;
    }

    public deletePost = (id: number): boolean => {
        const idx = this.posts.findIndex((elem: Post) => id === elem.id);

        if (idx > -1) {
            this.posts.splice(idx, 1);
        }

        return idx > -1;
    }

    private getId = () => {
        return this.id += 1;
    }


}
