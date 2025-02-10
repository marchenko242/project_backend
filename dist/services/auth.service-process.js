"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const password_service_process_1 = require("./password.service-process");
const user_service_process_1 = require("./user.service-process");
const user_repos_process_1 = require("../repositories/user.repos-process");
const token_service_process_1 = require("./token.service-process");
const token_repos_process_1 = require("../repositories/token.repos-process");
const custom_error_1 = require("../error/custom-error");
class AuthService {
    async create(userDto) {
        await user_service_process_1.userService.isEmailUnique(userDto.email);
        const password = await password_service_process_1.passwordService.hashPassword(userDto.password);
        const user = await user_repos_process_1.userRepository.create({ ...userDto, password });
        const tokens = token_service_process_1.tokenService.generateToken({ userId: user._id });
        await token_repos_process_1.tokenRepository.create({ ...tokens, _userId: user._id });
        return {
            user,
            tokens
        };
    }
    async login(userDto) {
        const user = await user_repos_process_1.userRepository.getByEmail(userDto.email);
        if (!user || !user.password) {
            throw new custom_error_1.CustomError("User not found or password missing", 400);
        }
        const isPasswordCorrect = await password_service_process_1.passwordService.comparePassword(userDto.password, user.password);
        if (!isPasswordCorrect) {
            throw new custom_error_1.CustomError("Incorrect email or password", 401);
        }
        const tokens = token_service_process_1.tokenService.generateToken({ userId: user._id });
        await token_repos_process_1.tokenRepository.create({ ...tokens, _userId: user._id });
        return {
            user,
            tokens
        };
    }
    async refresh(tokenPayload, refreshToken) {
        await token_repos_process_1.tokenRepository.deleteByParams({ refreshToken });
        const tokens = token_service_process_1.tokenService.generateToken({ userId: tokenPayload.userId });
        await token_repos_process_1.tokenRepository.create({ ...tokens, _userId: tokenPayload.userId });
        return tokens;
    }
    async logout(refreshToken) {
        await token_repos_process_1.tokenRepository.deleteByParams({ refreshToken });
    }
}
exports.authService = new AuthService();
