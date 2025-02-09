"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
class CustomError extends Error {
    status;
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}
exports.CustomError = CustomError;
