import * as jwt from 'jsonwebtoken'
import {configModel} from "../config/config-model";
import {ITokenPair, ITokenPayload} from "../interfaces/token.model";
import {CustomError} from "../error/custom-error";

class TokenServiceProcess {
    public generateToken (payload: ITokenPayload): ITokenPair {
        try {
            const accessToken = jwt.sign(payload, configModel.jwtAccessSecret, {
                expiresIn: "15m"
            });
            const refreshToken = jwt.sign(payload, configModel.jwtRefreshSecret, {
                expiresIn: "7d"
            })

            return {
                accessToken,
                refreshToken
            }
        } catch (e) {
            throw new CustomError(e.message, 500)
        }
    }
    public verifyToken(token: string, type: "access" | "refresh"): ITokenPayload {
        try {
            let secret: string;

            switch (type) {
                case "access":
                    secret = configModel.jwtAccessSecret;
                    break;
                case "refresh":
                    secret = configModel.jwtRefreshSecret;
                    break;
                default:
                    throw new CustomError("Invalid token type", 401);
            }

            return jwt.verify(token, secret) as ITokenPayload;
        } catch (e) {
            throw new CustomError("Invalid token", 401);
        }
    }
}

export const tokenService = new TokenServiceProcess()