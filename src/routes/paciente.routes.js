import { Router } from "express";

const router = Router();

import * as patientCtrl from "../controllers/usuario/paciente.controller.js"

const patientRoutes = Router();

patientRoutes.put('/updateInfo/:_id_paciente', patientCtrl.updatePatient);
patientRoutes.get('/showInfo/:_id_paciente', patientCtrl.getPatientInfo);

router.use('/api/paciente', patientRoutes);

export default router;