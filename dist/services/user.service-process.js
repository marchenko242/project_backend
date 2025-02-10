"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const user_repos_process_1 = require("../repositories/user.repos-process");
const custom_error_1 = require("../error/custom-error");
class UserService {
    async isEmailUnique(email) {
        const user = await user_repos_process_1.userRepository.getByEmail(email);
        if (user) {
            throw new custom_error_1.CustomError("Email is already in use", 409);
        }
    }
    async deleteMe(dto) {
        const user = await user_repos_process_1.userRepository.getById(dto.userId);
        if (!user) {
            throw new custom_error_1.CustomError("User not found", 404);
        }
        return await user_repos_process_1.userRepository.deleteById(dto.userId);
    }
    async updatedMe(tokenPayload, dto) {
        const user = await user_repos_process_1.userRepository.getById(tokenPayload.userId);
        if (!user) {
            throw new custom_error_1.CustomError("User not found", 404);
        }
        return await user_repos_process_1.userRepository.updatedById(user._id, dto);
    }
    async getList() {
        return await user_repos_process_1.userRepository.getList();
    }
    async getUser(dto) {
        const { id, email } = dto;
        let result;
        if (id) {
            if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
                throw new custom_error_1.CustomError("Invalid ID format", 400);
            }
            result = await user_repos_process_1.userRepository.getById(id);
        }
        else {
            result = await user_repos_process_1.userRepository.getByEmail(email);
        }
        return {
            _id: result._id,
            name: result.name,
            email: result.email,
            createdAt: result.createdAt,
            updatedAt: result.updatedAt
        };
    }
    async filterByName(name) {
        return await user_repos_process_1.userRepository.filterByName(name);
    }
}
exports.userService = new UserService();
