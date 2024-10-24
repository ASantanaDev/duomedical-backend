import { Router } from "express";

const router = Router();

import * as authCtrl from "../controllers/auth/signUp.controller.js";
import * as signInCtrl from "../controllers/auth/signIn.controller.js"

const authRoutes =  Router();

authRoutes.post('/signup', authCtrl.createPatient);
authRoutes.post('/signin', signInCtrl.signIn);

router.use('/api/auth', authRoutes);

export default router;