"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const mongoose_1 = __importDefault(require("mongoose"));
const auth_router_connect_1 = require("./routers/auth.router-connect");
const user_router_connect_1 = require("./routers/user.router-connect");
const post_router_connect_1 = require("./routers/post.router-connect");
const swagger_json_1 = __importDefault(require("../docs/swagger.json"));
const config_model_1 = require("./config/config-model");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/auth', auth_router_connect_1.authRouterConnect);
app.use('/users', user_router_connect_1.userRouterConnect);
app.use('/posts', post_router_connect_1.postRouterConnect);
app.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
app.get('/', (req, res) => {
    res.send('hello world');
});
app.use('*', (error, req, res, next) => {
    const status = error.status ?? 500;
    const message = error.message ?? "Something went wrong";
    res.status(status).json({ status, message });
});
process.on('uncaughtException', (error) => {
    console.error("Uncaught Exception: ", error);
    process.exit(1);
});
app.listen(config_model_1.configModel.port, async () => {
    await mongoose_1.default.connect(config_model_1.configModel.mongoUri);
    console.log(`Server has been started on port ${config_model_1.configModel.port}`);
});
