export interface IToken {
    _id: string,
    _userId: string,
    accessToken: string,
    refreshToken: string,
    createdAt: Date,
    updatedAt: Date
}

export interface ITokenPayload {
    userId: string
}

export interface ITokenPair extends Pick<IToken, "accessToken" | "refreshToken"> {}

export interface ITokenCreateDto extends Pick<IToken, "accessToken" | "refreshToken" | "_userId"> {}