"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postController = void 0;
const post_service_process_1 = require("../services/post.service.process");
class PostControllerProcess {
    async create(req, res, next) {
        try {
            const tokenPayload = res.locals.tokenPayload;
            const dto = req.body;
            const result = await post_service_process_1.postService.create(tokenPayload, dto);
            res.status(201).json(result);
        }
        catch (e) {
            next(e);
        }
    }
    async getUserPosts(req, res, next) {
        try {
            const result = await post_service_process_1.postService.getUserPosts(req.params.userId);
            res.status(200).json(result);
        }
        catch (e) {
            next(e);
        }
    }
    async delete(req, res, next) {
        try {
            const postId = req.params.postId;
            const tokenPayload = res.locals.tokenPayload;
            await post_service_process_1.postService.delete(postId, tokenPayload);
            res.sendStatus(204);
        }
        catch (e) {
            next(e);
        }
    }
    async updated(req, res, next) {
        try {
            const postId = req.params.postId;
            const dto = req.body;
            const tokenPayload = res.locals.tokenPayload;
            const result = await post_service_process_1.postService.updated(postId, tokenPayload, dto);
            res.status(200).json(result);
        }
        catch (e) {
            next(e);
        }
    }
}
exports.postController = new PostControllerProcess();
