import Router from "koa-router";

import { AuthController } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.mddleware";

const router = new Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/me', authMiddleware, AuthController.me);

export default router;
