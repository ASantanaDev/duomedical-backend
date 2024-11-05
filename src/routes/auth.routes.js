import { Router } from "express";

const router = Router();

import * as authCtrl from "../controllers/auth/signUp.controller.js";
import * as signInCtrl from "../controllers/auth/signIn.controller.js"
import * as resetPasswordCtrl from "../controllers/auth/resetPassword.controller.js";

const authRoutes =  Router();

authRoutes.post('/signup', authCtrl.createPatient);
authRoutes.post('/signin', signInCtrl.signIn);
authRoutes.post('/reset-password-request', resetPasswordCtrl.requestPasswordReset);
authRoutes.post('/reset-password/:token', resetPasswordCtrl.resetPassword);

router.use('/api/auth', authRoutes);

export default router;