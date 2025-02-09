import {NextFunction, Request, Response} from "express";
import {ITokenPayload} from "../interfaces/token.model";
import {postService} from "../services/post.service.process";
import {IPostCreateBody} from "../interfaces/post.model";


class PostControllerProcess {
    public async create (req: Request, res: Response, next: NextFunction): Promise<void>{
        try {
            const tokenPayload = res.locals.tokenPayload as ITokenPayload
            const dto = req.body as IPostCreateBody
            const result = await postService.create(tokenPayload, dto)
            res.status(201).json(result)
        } catch (e) {
            next(e)
        }
    }

    public async getUserPosts (req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const result = await postService.getUserPosts(req.params.userId)
            res.status(200).json(result)
        } catch (e) {
            next(e)
        }
    }

    public async delete (req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const postId = req.params.postId
            const tokenPayload = res.locals.tokenPayload as ITokenPayload
            await postService.delete(postId, tokenPayload)
            res.sendStatus(204)
        } catch (e) {
            next(e)
        }
    }

    public async updated (req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const postId = req.params.postId
            const dto = req.body as IPostCreateBody
            const tokenPayload = res.locals.tokenPayload as ITokenPayload
            const result = await postService.updated(postId, tokenPayload, dto)
            res.status(200).json(result)
        } catch (e) {
            next(e)
        }
    }
}

export const postController = new PostControllerProcess()