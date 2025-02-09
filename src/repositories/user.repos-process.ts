import {IUser, IUserCreateDto, IUserResponseDto, IUserUpdatedDto} from "../interfaces/user.model";
import {User} from "../models/user.model";


class UserReposProcess {
    public async getByEmail (email: string): Promise<IUser> {
        return await User.findOne({ email }).select("-password")
    }

    public async create(dto: IUserCreateDto): Promise<IUser> {
        return await User.create(dto)
    }

    public async getById(userId: string): Promise<IUser> {
        return await User.findById(userId).select("-password")
    }

    public async deleteById(userId: string): Promise<IUser> {
        return await User.findByIdAndDelete({ _id: userId });
    }

    public async updatedById(userId: string, dto: IUserUpdatedDto): Promise<IUser> {
        return await User.findByIdAndUpdate(userId, dto, {new: true}).select("-password")
    }

    public async getList(): Promise<IUser[]> {
        return await User.find().select("-password")
    }

    public async filterByName(name: string): Promise<IUserResponseDto[]> {
        return await User.find({ name: new RegExp(name, "i") }).select("-password")
    }

}

export const userRepository = new UserReposProcess();