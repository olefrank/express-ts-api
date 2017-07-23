import {Post} from "../model/Post";
import {Connection, Repository} from "typeorm";
import {Db} from "./Db";

export interface IDao {
    getPostById(id: number): Promise<Post>;
    getAllPosts(): Promise<Post[]>;
    savePost(post: Post): void;
    updatePost(post: Post): void;
    deletePost(post: Post): void;
    testHelper(): void;
}

export class Dao implements IDao {

    private static instance: IDao;
    private db: Db;

    private constructor() {
        this.db = Db.Instance;
    }

    static get Instance() {
        if (this.instance === null || this.instance === undefined) {
            this.instance = new Dao();
        }
        return this.instance;
    }

    public getPostById = async (id: number): Promise<Post> => {
        let conn: Connection;
        try {
            conn = await this.db.getConnection();
            const repo: Repository<Post> = conn.getRepository(Post);

            return await repo.findOneById(id);
        }
        catch (e) {
            throw new Error(e);
        }
        finally {
            if (conn) conn.close();
        }
    }

    public getAllPosts = async (): Promise<Post[]> => {
        let conn: Connection;
        try {
            conn = await this.db.getConnection();
            const repo: Repository<Post> = conn.getRepository(Post);

            return await repo.find();
        }
        catch (e) {
            throw new Error(e);
        }
        finally {
            if (conn) conn.close();
        }
    }

    public savePost = async (post: Post): Promise<void> => {
        let conn: Connection;
        try {
            conn = await this.db.getConnection();
            const repo: Repository<Post> = conn.getRepository(Post);

            await repo.persist(post);
        }
        catch (e) {
            throw new Error(e);
        }
        finally {
            if (conn) conn.close();
        }
    }

    public updatePost = async (post: Post): Promise<void> => {
        let conn: Connection;
        try {
            conn = await this.db.getConnection();
            const repo: Repository<Post> = conn.getRepository(Post);

            await repo.save(post);
        }
        catch (e) {
            throw new Error(e);
        }
        finally {
            if (conn) conn.close();
        }
    }

    public deletePost = async (post: Post): Promise<void> => {
        let conn: Connection;
        try {
            conn = await this.db.getConnection();
            const repo: Repository<Post> = conn.getRepository(Post);

            await repo.remove(post);
        }
        catch (e) {
            throw new Error(e);
        }
        finally {
            if (conn) conn.close();
        }
    }

    public async testHelper(): Promise<void> {
        let conn: Connection;
        const post1: Post = new Post("Author1", "Heading1", "Body Text1");
        const post2: Post = new Post("Author2", "Heading2", "Body Text2");
        const posts: Post[] = [post1, post2];

        try {
            conn = await this.db.getConnection();
            const repo: Repository<Post> = conn.getRepository(Post);

            repo.clear().then((data) => {
                repo.persist(posts);
            });
        }
        catch (e) {
            throw new Error(e);
        }
        finally {
            if (conn) conn.close();
        }
    }

}
