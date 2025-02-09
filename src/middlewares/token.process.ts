import {NextFunction, Request, Response} from "express";
import {CustomError} from "../error/custom-error";
import {tokenService} from "../services/token.service-process";
import {tokenRepository} from "../repositories/token.repos-process";

class TokenProcess {
    public async checkAccessToken(req: Request, res: Response, next: NextFunction) {
        try{
            const header = req.headers.authorization
            if(!header) {
                throw new CustomError("untoken provided", 401)
            }

            const accessToken = header?.split("Bearer ")[1];
            if(!accessToken) {
                throw new CustomError("token unprovided", 401)
            }

            const tokenPayload = tokenService.verifyToken(accessToken, "access")

            const pair = await tokenRepository.findByParams({accessToken})
            if(!pair) {
                throw new CustomError("Token wrong", 401)
            }

            res.locals.tokenPayload = tokenPayload
            next()
        } catch (e) {
            next(e)
        }
    }
    public async checkRefreshToken(req: Request, res: Response, next: NextFunction) {
        try{
            const header = req.headers.authorization
            if(!header) {
                throw new CustomError("untoken provided", 401)
            }

            const refreshToken = header?.split("Bearer ")[1];
            if(!refreshToken) {
                throw new CustomError("ontoken provided", 401)
            }

            const tokenPayload = tokenService.verifyToken(refreshToken, "refresh")

            const pair = await tokenRepository.findByParams({refreshToken})
            if(!pair) {
                throw new CustomError("Token wrong", 401)
            }

            res.locals.tokenPayload = tokenPayload
            res.locals.refreshToken = refreshToken
            next()
        } catch (e) {
            next(e)
        }
    }
}

export const tokenMiddleware = new TokenProcess()