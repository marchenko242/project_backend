"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenService = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const config_model_1 = require("../config/config-model");
const custom_error_1 = require("../error/custom-error");
class TokenServiceProcess {
    generateToken(payload) {
        try {
            const accessToken = jwt.sign(payload, config_model_1.configModel.KEYACCES, {
                expiresIn: "25m"
            });
            const refreshToken = jwt.sign(payload, config_model_1.configModel.KEYREFRESH, {
                expiresIn: "14d"
            });
            return {
                accessToken,
                refreshToken
            };
        }
        catch (e) {
            throw new custom_error_1.CustomError(e.message, 500);
        }
    }
    verifyToken(token, type) {
        try {
            let secret;
            switch (type) {
                case "access":
                    secret = config_model_1.configModel.KEYACCES;
                    break;
                case "refresh":
                    secret = config_model_1.configModel.KEYREFRESH;
                    break;
                default:
                    throw new custom_error_1.CustomError("Wrong token", 401);
            }
            return jwt.verify(token, secret);
        }
        catch (e) {
            throw new custom_error_1.CustomError("Wrong token", 401);
        }
    }
}
exports.tokenService = new TokenServiceProcess();
