import express, {NextFunction, Request, Response} from "express"
import swaggerUi from "swagger-ui-express"
import {CustomError} from "./error/custom-error";
import mongoose from "mongoose";
import {authRouterConnect} from "./routers/auth.router-connect";
import {userRouterConnect} from "./routers/user.router-connect";
import {postRouterConnect} from "./routers/post.router-connect";
import swaggerDocument from '../docs/swagger.json'
import {configModel} from "./config/config-model";


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/auth', authRouterConnect )
app.use('/users', userRouterConnect)
app.use('/posts', postRouterConnect)
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req: Request, res: Response) => {
    res.send('hello world')
})

app.use('*', (error: CustomError, req: Request, res: Response, next: NextFunction) => {
    const status = error.status ?? 500
    const message = error.message ?? "Something went wrong"

    res.status(status).json({status, message})
})
process.on('uncaughtException', (error: Error) => {
    console.error("Uncaught Exception: ", error);
    process.exit(1);
})

app.listen(configModel.porthost, async () => {
    await mongoose.connect(configModel.mongoUri)
    console.log(`Server has been started on port ${configModel.porthost}`)
})