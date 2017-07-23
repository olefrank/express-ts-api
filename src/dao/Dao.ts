import {Post} from "../model/Post";
import {Connection, Repository, getEntityManager} from "typeorm";

export interface IDao {
    getPostById(id: number): Promise<Post>;
    getAllPosts(): Promise<Post[]>;
    savePost(post: Post): Promise<Post>;
    deletePost(post: Post): Promise<Post>;
    deleteAllPosts(): Promise<void>;
    saveTestPosts(): Promise<Post[]>;
}

export class Dao implements IDao {

    private static instance: IDao;

    private constructor() {}

    static get Instance() {
        if (this.instance === null || this.instance === undefined) {
            this.instance = new Dao();
        }
        return this.instance;
    }

    public getPostById = (id: number): Promise<Post> => {
        try {
            const repo: Repository<Post> = getEntityManager().getRepository(Post);
            return repo.findOneById(id);
        }
        catch (e) {
            throw new Error(e);
        }
    }

    public getAllPosts = (): Promise<Post[]> => {
        try {
            const repo: Repository<Post> = getEntityManager().getRepository(Post);
            return repo.find();
        }
        catch (e) {
            throw new Error(e);
        }
    }

    public savePost = (post: Post): Promise<Post> => {
        try {
            const repo: Repository<Post> = getEntityManager().getRepository(Post);
            return repo.persist(post);
        }
        catch (e) {
            throw new Error(e);
        }
    }

    public deletePost = (post: Post): Promise<Post> => {
        try {
            const repo: Repository<Post> = getEntityManager().getRepository(Post);
            return repo.remove(post);
        }
        catch (e) {
            throw new Error(e);
        }
    }

    public deleteAllPosts(): Promise<void> {
        try {
            const repo: Repository<Post> = getEntityManager().getRepository(Post);
            return repo.clear();
        }
        catch (e) {
            throw new Error(e);
        }
    }

    public saveTestPosts(): Promise<Post[]> {
        const post1: Post = new Post("Author1", "Heading1", "Body Text1");
        const post2: Post = new Post("Author2", "Heading2", "Body Text2");
        const posts: Post[] = [post1, post2];

        try {
            const repo: Repository<Post> = getEntityManager().getRepository(Post);
            return repo.save(posts);
        }
        catch (e) {
            throw new Error(e);
        }
    }

}
