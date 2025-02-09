"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = void 0;
const user_model_1 = require("../models/user.model");
class UserReposProcess {
    async getByEmail(email) {
        return await user_model_1.User.findOne({ email }).select("-password");
    }
    async create(dto) {
        return await user_model_1.User.create(dto);
    }
    async getById(userId) {
        return await user_model_1.User.findById(userId).select("-password");
    }
    async deleteById(userId) {
        return await user_model_1.User.findByIdAndDelete({ _id: userId });
    }
    async updatedById(userId, dto) {
        return await user_model_1.User.findByIdAndUpdate(userId, dto, { new: true }).select("-password");
    }
    async getList() {
        return await user_model_1.User.find().select("-password");
    }
    async filterByName(name) {
        return await user_model_1.User.find({ name: new RegExp(name, "i") }).select("-password");
    }
}
exports.userRepository = new UserReposProcess();
