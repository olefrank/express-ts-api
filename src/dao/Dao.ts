import {Post} from "../model/Post";
import posts from "../data/posts";

export interface IDao {
    getPostById(id: number): Post;
    getAllPosts(): Post[];
    savePost(post: Post): void;
    updatePost(post: Post): void;
    deletePost(id: number): void;
}

export class Dao implements IDao {

    public static getInstance(): Dao {
        if (!Dao.instance) {
            Dao.instance = new Dao();
        }
        return Dao.instance;
    }

    private static instance: Dao;
    private id: number;
    private posts: Post[];
    private noPostFound: string = "No post found with id";
    private dbSaveError: string = "Error saving to database";

    private constructor() {
        this.posts = posts;
        this.id = this.posts.length;
    }

    public getPostById = (id: number): Post => {
        const post: Post = this.posts.find((post: Post) => {
            return post.id === id;
        });

        if (!post) {
            throw new Error(`${this.noPostFound} ${id}`);
        }
        else {
            return post;
        }
    }

    public getAllPosts = (): Post[] => {
        return this.posts;
    }

    public savePost = (post: Post): void => {
        post.id = this.getId();

        try {
            this.posts.push(post);
        }
        catch( e ) {
            throw new Error(this.dbSaveError);
        }
    }

    public updatePost = (post: Post): void => {
        const idx = this.posts.findIndex((elem: Post) => post.id === elem.id);
        if (idx === -1) {
            throw new Error(`${this.noPostFound} ${post.id}`);
        }
        else {
            this.posts[idx] = post;
        }
    }

    public deletePost = (id: number): void => {
        const idx = this.posts.findIndex((elem: Post) => id === elem.id);

        if (idx === -1) {
            throw new Error(`${this.noPostFound} ${id}`);
        }
        else {
            this.posts.splice(idx, 1);
        }
    }

    private getId = (): number => {
        return this.id += 1;
    }


}
