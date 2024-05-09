import { Router } from "express";

const router = Router();

import * as authCtrl from "../controllers/auth/auth.controller.js";

const authRoutes =  Router();

authRoutes.post('/signup', authCtrl.signUp);
authRoutes.post('/signin', authCtrl.signIn);

router.use('/api/auth', authRoutes);

export default router;