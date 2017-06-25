import {NextFunction, Request, Response, Router} from "express";
import {IPost, Post} from "../model/Post";
import {Dao} from "../dao/Dao";

export class PostRouter {
    public router: Router;
    private dao: Dao;

    constructor() {
        this.dao = Dao.getInstance();
        this.router = Router();
        this.router.get("/", this.getAll);
        this.router.get("/:id", this.getOne);
        this.router.post("/", this.savePost);
        this.router.put("/", this.updatePost);
        this.router.delete("/:id", this.deletePost);
    }

    public getAll = (req: Request, res: Response, next: NextFunction) => {
        const posts: Post[] = this.dao.getAllPosts();
        res.send(posts);
    }

    public getOne = (req: Request, res: Response, next: NextFunction) => {
        const id: number = parseInt(req.params.id, 10);
        const post: IPost = this.dao.getPostById(id);

        if (post) {
            res.status(200)
                .send(post);
        }
        else {
            res.status(404)
                .send({
                    message: "No post found with the given id.",
                });
        }
    }

    public savePost = (req: Request, res: Response, next: NextFunction) => {
        const post: IPost = req.body as Post;
        this.dao.savePost(post);
        res.send(post);
    }

    public updatePost = (req: Request, res: Response, next: NextFunction) => {
        const post: IPost = req.body as Post;
        const success = this.dao.updatePost(post);

        if (!success) {
            res.status(404)
                .send({
                    message: "No post found with the given id.",
                });
        }
        else {
            res.status(200)
                .send(post);
        }
    }

    public deletePost = (req: Request, res: Response, next: NextFunction) => {
        const id: number = parseInt(req.params.id, 10);
        const post = this.dao.deletePost(id);

        if (!post) {
            res.status(404)
                .send({
                    message: "No post found with the given id.",
                });
        }
        else {
            res.status(200)
                .send(post);
        }
    }
}

// Create the PostRouter, and export its configured Express.Router
export default new PostRouter().router;
