"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenRepository = void 0;
const token_models_1 = require("../models/token.models");
class TokenReposProcess {
    async create(dto) {
        return await token_models_1.Token.create(dto);
    }
    async findByParams(params) {
        return await token_models_1.Token.findOne(params);
    }
    async deleteByParams(params) {
        await token_models_1.Token.deleteOne(params);
    }
}
exports.tokenRepository = new TokenReposProcess();
