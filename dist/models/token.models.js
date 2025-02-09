"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token = void 0;
const mongoose_1 = require("mongoose");
const user_model_1 = require("./user.model");
const tokenSchema = new mongoose_1.Schema({
    accessToken: { type: String, required: true },
    refreshToken: { type: String, required: true },
    _userId: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: user_model_1.User }
}, {
    timestamps: true, versionKey: false
});
exports.Token = (0, mongoose_1.model)("tokens", tokenSchema);
