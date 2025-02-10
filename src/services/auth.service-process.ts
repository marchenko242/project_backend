import {IUser, IUserCreateDto, IUserLoginDto, IUserResponseDto} from "../interfaces/user.model";
import {ITokenPair, ITokenPayload} from "../interfaces/token.model";
import {passwordService} from "./password.service-process";
import {userService} from "./user.service-process";
import {userRepository} from "../repositories/user.repos-process";
import {tokenService} from "./token.service-process";
import {tokenRepository} from "../repositories/token.repos-process";
import {CustomError} from "../error/custom-error";


class AuthService {
    public async create (userDto: IUserCreateDto): Promise<{user: IUserResponseDto, tokens: ITokenPair}> {
        await userService.isEmailUnique(userDto.email)
        const password = await passwordService.hashPassword(userDto.password)
        const user: IUser = await userRepository.create({...userDto, password})

        const tokens = tokenService.generateToken({userId: user._id})
        await tokenRepository.create({...tokens, _userId: user._id})
        return {
            user,
            tokens
        }
    }

    public async login (userDto: IUserLoginDto): Promise<{user: IUserResponseDto, tokens: ITokenPair}> {
        const user = await userRepository.getByEmail(userDto.email)
        if (!user || !user.password) {
            throw new CustomError("User not found or password missing", 400);
        }
        const isPasswordCorrect = await passwordService.comparePassword(
            userDto.password,
            user.password
        )
        if (!isPasswordCorrect) {
            throw new CustomError("Incorrect email or password", 401);
        }
        const tokens = tokenService.generateToken({userId: user._id})
        await tokenRepository.create({...tokens, _userId: user._id})
        return {
            user,
            tokens
        }
    }

    public async refresh (tokenPayload: ITokenPayload, refreshToken: string): Promise<ITokenPair> {
        await tokenRepository.deleteByParams({refreshToken})
        const tokens = tokenService.generateToken({userId: tokenPayload.userId})
        await tokenRepository.create({...tokens, _userId: tokenPayload.userId})
        return tokens
    }

    public async logout (refreshToken: string): Promise<void> {
        await tokenRepository.deleteByParams({refreshToken})
    }
}

export const authService = new AuthService();