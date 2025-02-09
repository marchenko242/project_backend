import { Router } from "express";
import {tokenMiddleware} from "../middlewares/token.process";
import {postController} from "../controllers/post.controller-process";

const router = Router();

router.get('/userPosts/:userId', postController.getUserPosts)

router.post('/create', tokenMiddleware.checkAccessToken, postController.create)

router.delete('/delete/:postId', tokenMiddleware.checkAccessToken, postController.delete)

router.patch('/updated/:postId', tokenMiddleware.checkAccessToken, postController.updated)

export const postRouterConnect = router