import { Router } from "express";
import { authController } from "../controllers/auth.controller-process";
import {tokenMiddleware} from "../middlewares/token.process";

const router = Router();

router.post('/create', authController.create )

router.post('/login', authController.login)

router.get('/refresh', tokenMiddleware.checkRefreshToken, authController.refresh)

router.delete('/logout', tokenMiddleware.checkRefreshToken, authController.logout)

export const authRouterConnect = router