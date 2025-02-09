import * as jwt from 'jsonwebtoken'
import {configModel} from "../config/config-model";
import {ITokenPair, ITokenPayload} from "../interfaces/token.model";
import {CustomError} from "../error/custom-error";

class TokenServiceProcess {
    public generateToken (payload: ITokenPayload): ITokenPair {
        try {
            const accessToken = jwt.sign(payload, configModel.KEYACCES, {
                expiresIn: "25m"
            });
            const refreshToken = jwt.sign(payload, configModel.KEYREFRESH, {
                expiresIn: "14d"
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
                    secret = configModel.KEYACCES;
                    break;
                case "refresh":
                    secret = configModel.KEYREFRESH;
                    break;
                default:
                    throw new CustomError("Wrong token", 401);
            }

            return jwt.verify(token, secret) as ITokenPayload;
        } catch (e) {
            throw new CustomError("Wrong token", 401);
        }
    }
}

export const tokenService = new TokenServiceProcess()