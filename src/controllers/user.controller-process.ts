import {NextFunction, Request, Response} from "express";
import {ITokenPayload} from "../interfaces/token.model";
import {userService} from "../services/user.service-process";
import {IGetUserDto, IUserUpdatedDto} from "../interfaces/user.model";


class UserControllerProcess {
    public async deleteMe (req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const dto = res.locals.tokenPayload as ITokenPayload
            await userService.deleteMe(dto)
            res.sendStatus(204)
        } catch (e) {
            next(e)
        }
    }

    public async updatedMe (req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const tokenPayload = req.res.locals.tokenPayload as ITokenPayload;
            const dto = req.body as IUserUpdatedDto
            const result = await userService.updatedMe(tokenPayload, dto)
            res.status(200).json({name: result.name, email: result.email})
        } catch (e) {
            next(e)
        }
    }

    public async getList (req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const result = await userService.getList()
            res.status(200).json(result)
        } catch (e) {
            next(e)
        }
    }

    public async getUser (req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const query = req.query as IGetUserDto
            const result = await userService.getUser(query)
            res.status(200).json(result)
        } catch (e) {
            next(e)
        }
    }

    public async filterByName(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const query = req.query.name as string
            const result = await userService.filterByName(query)
            res.status(200).json(result)
        } catch (e) {
            next(e)
        }
    }
}

export const userController = new UserControllerProcess()