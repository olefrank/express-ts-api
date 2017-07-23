import {NextFunction, Request, Response, Router} from "express";
import {IPost, Post} from "../model/Post";
import {IPostVM, PostVM} from "../viewmodel/PostVM";
import {IDao, Dao} from "../dao/Dao";

export class PostRouter {
    public router: Router;
    private dao: IDao;

    constructor() {
        this.dao = Dao.Instance;
        this.router = Router();
        this.router.get("/", this.getAll);
        this.router.get("/:id", this.getOne);
        this.router.post("/", this.savePost);
        this.router.put("/", this.savePost);
        this.router.delete("/:id", this.deletePost);
    }

    public getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const posts: IPost[] = await this.dao.getAllPosts();
            const postsVM: IPostVM[] = PostVM.toPostsVM(posts);

            res.send(postsVM);
        }
        catch (e) {
            console.error(e);
            res.status(500).send({ message: e.message });
        }
    }

    public getOne = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id: number = parseInt(req.params.id, 10);
            const post: IPost = await this.dao.getPostById(id);
            const postVM: IPostVM = PostVM.toPostVM(post);

            res.send(postVM);
        }
        catch (e) {
            console.error(e);
            res.status(500).send({ message: e.message });
        }
    }

    public savePost = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const post: IPost = PostVM.toPost(req.body);
            await this.dao.savePost(post);

            res.send({ message: "Post saved" });
        }
        catch (e) {
            console.error(e);
            res.status(500).send({ message: e.message });
        }
    }

    public deletePost = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const post: IPost = PostVM.toPost(req.body);
            await this.dao.deletePost(post);

            res.send({ message: "Post Deleted" });
        }
        catch (e) {
            console.error(e);
            res.status(500).send({ message: e.message });
        }
    }
}

// Create the PostRouter, and export its configured Express.Router
export default new PostRouter().router;
