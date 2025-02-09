"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenMiddleware = void 0;
const custom_error_1 = require("../error/custom-error");
const token_service_process_1 = require("../services/token.service-process");
const token_repos_process_1 = require("../repositories/token.repos-process");
class TokenProcess {
    async checkAccessToken(req, res, next) {
        try {
            const header = req.headers.authorization;
            if (!header) {
                throw new custom_error_1.CustomError("untoken provided", 401);
            }
            const accessToken = header?.split("Bearer ")[1];
            if (!accessToken) {
                throw new custom_error_1.CustomError("token unprovided", 401);
            }
            const tokenPayload = token_service_process_1.tokenService.verifyToken(accessToken, "access");
            const pair = await token_repos_process_1.tokenRepository.findByParams({ accessToken });
            if (!pair) {
                throw new custom_error_1.CustomError("Token wrong", 401);
            }
            res.locals.tokenPayload = tokenPayload;
            next();
        }
        catch (e) {
            next(e);
        }
    }
    async checkRefreshToken(req, res, next) {
        try {
            const header = req.headers.authorization;
            if (!header) {
                throw new custom_error_1.CustomError("untoken provided", 401);
            }
            const refreshToken = header?.split("Bearer ")[1];
            if (!refreshToken) {
                throw new custom_error_1.CustomError("ontoken provided", 401);
            }
            const tokenPayload = token_service_process_1.tokenService.verifyToken(refreshToken, "refresh");
            const pair = await token_repos_process_1.tokenRepository.findByParams({ refreshToken });
            if (!pair) {
                throw new custom_error_1.CustomError("Token wrong", 401);
            }
            res.locals.tokenPayload = tokenPayload;
            res.locals.refreshToken = refreshToken;
            next();
        }
        catch (e) {
            next(e);
        }
    }
}
exports.tokenMiddleware = new TokenProcess();
