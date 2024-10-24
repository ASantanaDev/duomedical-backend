import { Router } from "express";

const router = Router();

import * as doctorCtrl from "../controllers/usuario/medico.controller.js"

const doctorRoutes = Router();

doctorRoutes.post('/createDoctor', doctorCtrl.createDoctor);
doctorRoutes.post('/updateInfo/:_id_medico', doctorCtrl.updateDoctor)

router.use('/api/doctor', doctorRoutes);

export default router;