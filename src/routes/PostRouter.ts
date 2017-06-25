import {Router, Request, Response, NextFunction} from 'express';
import {Post, IPost} from '../model/Post';
import {Dao} from '../dao/Dao';

export class PostRouter {
    router: Router;
    private _dao: Dao;

    constructor() {
        this._dao = Dao.getInstance();
        this.router = Router();
        this.router.get('/', this.getAll);
        this.router.get('/:id', this.getOne);
        this.router.post('/', this.savePost);
        this.router.put('/', this.updatePost);
        this.router.delete('/', this.deletePost);
    }

    getAll = (req: Request, res: Response, next: NextFunction) => {
        const posts: Post[] = this._dao.getAllPosts();
        res.send(posts);
    };

    getOne = (req: Request, res: Response, next: NextFunction) => {
        const id: number = parseInt(req.params.id, 10);
        const post: IPost = this._dao.getPostById(id);

        if (post) {
            res.status(200)
                .send({
                    message: 'Success',
                    status: res.status,
                    post
                });
        }
        else {
            res.status(404)
                .send({
                    message: 'No post found with the given id.',
                    status: res.status
                });
        }
    };

    savePost = (req: Request, res: Response, next: NextFunction) => {
        const post: IPost = req.body as Post;
        this._dao.savePost(post);
        res.send(post);
    };

    updatePost = (req: Request, res: Response, next: NextFunction) => {
        const post: IPost = req.body as Post;
        const success = this._dao.updatePost(post);

        if (!success) {
            res.status(404)
                .send({
                    message: 'No post found with the given id.',
                    status: res.status
                });
        }
        else {
            res.status(200)
                .send({
                    message: 'Success',
                    status: res.status,
                    post
                });
        }
    };

    deletePost = (req: Request, res: Response, next: NextFunction) => {
        const id: number = req.body.id;
        const post = this._dao.deletePost(id);

        if (!post) {
            res.status(404)
                .send({
                    message: 'No post found with the given id.',
                    status: res.status
                });
        }
        else {
            res.status(200)
                .send({
                    message: 'Success',
                    status: res.status,
                    post
                });
        }
    };

}

// Create the PostRouter, and export its configured Express.Router
export default new PostRouter().router;
