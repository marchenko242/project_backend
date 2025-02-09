import {ITokenPayload} from "../interfaces/token.model";
import {IPost, IPostCreateBody, IPostCreateDto} from "../interfaces/post.model";
import {postRepository} from "../repositories/post.repos-process";
import {CustomError} from "../error/custom-error";

class PostServiceProcess {
    public async create (tokenPayload: ITokenPayload, dto: IPostCreateBody): Promise<IPost> {
        const dtoForCreate: IPostCreateDto = {
            _userId: tokenPayload.userId,
            ...dto
        }
        return await postRepository.create(dtoForCreate)
    }

    public async getUserPosts(_userId: string): Promise<IPost[]> {
        return await postRepository.getUserPosts(_userId)
    }

    public async delete (postId: string, tokenPayload: ITokenPayload): Promise<void> {
        const post = await postRepository.getPostById(postId)
        if(!post) {
            throw new CustomError("Post not found", 404)
        }
        if(post._userId.toString() !== tokenPayload.userId) {
            throw new CustomError("You are not authorized to delete this post", 403)
        }
        await postRepository.deleteById(postId)
    }

    public async updated (postId: string, tokenPayload: ITokenPayload, dto: IPostCreateBody): Promise<IPost> {
        const post = await postRepository.getPostById(postId)
        if(!post) {
            throw new CustomError("Post not found", 404)
        }
        if(post._userId.toString() !== tokenPayload.userId) {
            throw new CustomError("You are not authorized to delete this post", 403)
        }
        return await postRepository.updatedById(postId, dto)
    }
}

export const postService = new PostServiceProcess()