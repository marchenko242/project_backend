export interface IUser {
    _id: string,
    name: string,
    email: string,
    password: string,
    createdAt: Date,
    updatedAt: Date
}

export interface IUserCreateDto extends Pick<IUser, "name" | "email" | "password"> {}

export interface IUserResponseDto extends Pick<IUser, "name" | "email" | "_id" | "updatedAt" | "createdAt"> {}

export interface IUserLoginDto extends Pick<IUser, "email" | "password"> {}

export interface IUserUpdatedDto extends Pick<IUser, "name"> {}

export interface IGetUserDto {
    id?: string,
    email?: string,
}