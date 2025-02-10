export interface IPost {
    _id: string,
    title: string,
    body: string,
    _userId: string,
    createdAt: Date,
    updatedAt: Date
}

export interface IPostCreateBody extends Pick<IPost, "title" | "body"> {}

export interface IPostUpdateBody {
    title?: string,
    body?: string
}

export interface IPostCreateDto extends Pick<IPost, "title" | "body" | "_userId"> {}