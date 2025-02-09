"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const mongoose_1 = require("mongoose");
const user_model_1 = require("./user.model");
const postSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    _userId: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: user_model_1.User }
}, {
    timestamps: true, versionKey: false
});
exports.Post = (0, mongoose_1.model)("posts", postSchema);
