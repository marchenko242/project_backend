import { Router } from "express"
import {tokenMiddleware} from "../middlewares/token.process";
import {userController} from "../controllers/user.controller-process";

const router = Router();

router.delete('/deleteMe', tokenMiddleware.checkAccessToken, userController.deleteMe)

router.patch('/updatedMe', tokenMiddleware.checkAccessToken, userController.updatedMe)

router.get("/getList", tokenMiddleware.checkAccessToken, userController.getList)

router.get("/getUser", tokenMiddleware.checkAccessToken, userController.getUser)

router.get('/filterByName', userController.filterByName)

export const userRouterConnect = router