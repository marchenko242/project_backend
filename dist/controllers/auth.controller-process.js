"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const auth_service_process_1 = require("../services/auth.service-process");
class AuthController {
    async create(req, res, next) {
        try {
            const userDto = req.body;
            const result = await auth_service_process_1.authService.create(userDto);
            res.status(201).json(result);
        }
        catch (e) {
            next(e);
        }
    }
    async login(req, res, next) {
        try {
            const userDto = req.body;
            const result = await auth_service_process_1.authService.login(userDto);
            res.status(200).json(result);
        }
        catch (e) {
            next(e);
        }
    }
    async refresh(req, res, next) {
        try {
            const tokenPayload = res.locals.tokenPayload;
            const refreshToken = res.locals.refreshToken;
            const result = await auth_service_process_1.authService.refresh(tokenPayload, refreshToken);
            res.status(201).json(result);
        }
        catch (e) {
            next(e);
        }
    }
    async logout(req, res, next) {
        try {
            const refreshToken = res.locals.refreshToken;
            await auth_service_process_1.authService.logout(refreshToken);
            res.sendStatus(204);
        }
        catch (e) {
            next(e);
        }
    }
}
exports.authController = new AuthController();
