"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postService = void 0;
const post_repos_process_1 = require("../repositories/post.repos-process");
const custom_error_1 = require("../error/custom-error");
class PostServiceProcess {
    async create(tokenPayload, dto) {
        const dtoForCreate = {
            _userId: tokenPayload.userId,
            ...dto
        };
        return await post_repos_process_1.postRepository.create(dtoForCreate);
    }
    async getUserPosts(_userId) {
        return await post_repos_process_1.postRepository.getUserPosts(_userId);
    }
    async delete(postId, tokenPayload) {
        const post = await post_repos_process_1.postRepository.getPostById(postId);
        if (!post) {
            throw new custom_error_1.CustomError("Post not found", 404);
        }
        if (post._userId.toString() !== tokenPayload.userId) {
            throw new custom_error_1.CustomError("You are not authorized to delete this post", 403);
        }
        await post_repos_process_1.postRepository.deleteById(postId);
    }
    async updated(postId, tokenPayload, dto) {
        const post = await post_repos_process_1.postRepository.getPostById(postId);
        if (!post) {
            throw new custom_error_1.CustomError("Post not found", 404);
        }
        if (post._userId.toString() !== tokenPayload.userId) {
            throw new custom_error_1.CustomError("You are not authorized to delete this post", 403);
        }
        return await post_repos_process_1.postRepository.updatedById(postId, dto);
    }
}
exports.postService = new PostServiceProcess();
