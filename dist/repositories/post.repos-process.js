"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRepository = void 0;
const post_model_1 = require("../models/post.model");
class PostReposProcess {
    async create(dto) {
        return await post_model_1.Post.create(dto);
    }
    async getUserPosts(_userId) {
        return await post_model_1.Post.find({ _userId });
    }
    async getPostById(_id) {
        return await post_model_1.Post.findById(_id);
    }
    async deleteById(_id) {
        return await post_model_1.Post.findByIdAndDelete(_id);
    }
    async updatedById(_id, dto) {
        return await post_model_1.Post.findByIdAndUpdate(_id, dto, { new: true });
    }
}
exports.postRepository = new PostReposProcess();
