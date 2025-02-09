"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const custom_error_1 = require("../error/custom-error");
const user_repos_process_1 = require("../repositories/user.repos-process");
class UserServiceProcess {
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
            result = await user_repos_process_1.userRepository.getById(id);
        }
        else {
            result = await user_repos_process_1.userRepository.getByEmail(email);
        }
        return result;
    }
    async filterByName(name) {
        return await user_repos_process_1.userRepository.filterByName(name);
    }
}
exports.userService = new UserServiceProcess();
