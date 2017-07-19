import {NextFunction, Request, Response, Router} from "express";
import {IPost, Post} from "../model/Post";
import {IPostVM, PostVM} from "../viewmodel/PostVM";
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
        const posts: IPost[] = this.dao.getAllPosts();
        const postsVM: IPostVM[] = PostVM.postsToPostsVM(posts);
        res.send(postsVM);
    }

    public getOne = (req: Request, res: Response, next: NextFunction) => {
        try {
            const id: number = parseInt(req.params.id, 10);
            const post: IPost = this.dao.getPostById(id);
            const postVM: IPostVM = PostVM.postToPostVM(post);

            res.send(postVM);
        }
        catch(e) {
            res.status(404)
                .send({
                    message: e.message,
                });
        }
    }

    public savePost = (req: Request, res: Response, next: NextFunction) => {
        try {
            const post: IPost = PostVM.mapToPost(req.body);
            this.dao.savePost(post);
            res.status(200)
                .send({
                    message: "Post Saved",
                });
        }
        catch(e) {
            res.status(500)
                .send({
                    message: e.message,
                });
        }
    }

    public updatePost = (req: Request, res: Response, next: NextFunction) => {
        try {
            const post: IPost = PostVM.mapToPost(req.body);
            this.dao.updatePost(post);
            res.status(200)
                .send({
                    message: "Post Updated",
                });
        }
        catch(e) {
            res.status(404)
                .send({
                    message: e.message,
                });
        }
    }

    public deletePost = (req: Request, res: Response, next: NextFunction) => {
        try {
            const id: number = parseInt(req.params.id, 10);
            const post = this.dao.deletePost(id);
            res.send(post);
        }
        catch(e) {
            res.status(404)
                .send({
                    message: e.message,
                });
        }
    }
}

// Create the PostRouter, and export its configured Express.Router
export default new PostRouter().router;
