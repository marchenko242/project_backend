"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configModel = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.configModel = {
    port: process.env.PORTHOST,
    mongoUri: process.env.MONGOURI,
    jwtAccessSecret: process.env.KEYACCES,
    jwtRefreshSecret: process.env.KEYREFRESH,
};
