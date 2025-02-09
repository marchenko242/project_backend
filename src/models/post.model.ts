import {model, Schema} from "mongoose";
import { User } from "./user.model"
import {IPost} from "../interfaces/post.model";


const postSchema  = new Schema({
    title: {type: String, required: true},
    body: {type: String, required: true},
    _userId: {type: Schema.Types.ObjectId, required: true, ref: User}
}, {
    timestamps: true, versionKey: false
})

export const Post = model<IPost>("posts", postSchema)