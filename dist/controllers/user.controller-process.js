"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_service_process_1 = require("../services/user.service-process");
class UserControllerProcess {
    async deleteMe(req, res, next) {
        try {
            const dto = res.locals.tokenPayload;
            await user_service_process_1.userService.deleteMe(dto);
            res.sendStatus(204);
        }
        catch (e) {
            next(e);
        }
    }
    async updatedMe(req, res, next) {
        try {
            const tokenPayload = req.res.locals.tokenPayload;
            const dto = req.body;
            const result = await user_service_process_1.userService.updatedMe(tokenPayload, dto);
            res.status(200).json({ name: result.name, email: result.email });
        }
        catch (e) {
            next(e);
        }
    }
    async getList(req, res, next) {
        try {
            const result = await user_service_process_1.userService.getList();
            res.status(200).json(result);
        }
        catch (e) {
            next(e);
        }
    }
    async getUser(req, res, next) {
        try {
            const query = req.query;
            const result = await user_service_process_1.userService.getUser(query);
            res.status(200).json(result);
        }
        catch (e) {
            next(e);
        }
    }
    async filterByName(req, res, next) {
        try {
            const query = req.query.name;
            const result = await user_service_process_1.userService.filterByName(query);
            res.status(200).json(result);
        }
        catch (e) {
            next(e);
        }
    }
}
exports.userController = new UserControllerProcess();
