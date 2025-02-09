import {CustomError} from "../error/custom-error";
import {userRepository} from "../repositories/user.repos-process";
import {ITokenPayload} from "../interfaces/token.model";
import {IGetUserDto, IUser, IUserResponseDto, IUserUpdatedDto} from "../interfaces/user.model";

class UserServiceProcess {
    public async isEmailUnique(email: string): Promise<void> {
        const user = await userRepository.getByEmail(email)
        if(user) {
            throw new CustomError("Email is already in use", 409)
        }
    }
    public async deleteMe(dto: ITokenPayload): Promise<IUser> {
        const user = await userRepository.getById(dto.userId)
        if(!user) {
            throw new CustomError("User not found", 404)
        }
        return await userRepository.deleteById(dto.userId)
    }

    public async updatedMe(tokenPayload: ITokenPayload, dto: IUserUpdatedDto): Promise<IUserResponseDto> {
        const user = await userRepository.getById(tokenPayload.userId);
        if (!user) {
            throw new CustomError("User not found", 404);
        }
        return await userRepository.updatedById(user._id, dto);
    }

    public async getList(): Promise<IUserResponseDto[]> {
        return await userRepository.getList()
    }

    public async getUser(dto: IGetUserDto): Promise<IUserResponseDto> {
        const {id, email} = dto
        let result: IUserResponseDto
        if (id) {
            result = await userRepository.getById(id)
        } else {
            result =  await userRepository.getByEmail(email)
        }
        return result
    }

    public async filterByName (name: string): Promise<IUserResponseDto[]> {
        return await userRepository.filterByName(name)
    }
}

export const userService = new UserServiceProcess();