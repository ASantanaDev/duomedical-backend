import { Router } from "express";

const router = Router();

import * as servicioCtrl from "../controllers/tratamiento/servicio.controller.js";

const servicioRoutes = Router();

servicioRoutes.get('/listaServicios', servicioCtrl.getServicios);
servicioRoutes.get('/getServicio/:_id_servicio', servicioCtrl.getServicio);
servicioRoutes.post('/nuevoServicio', servicioCtrl.createServicio);
servicioRoutes.put('/updateServicio/:_id_servicio', servicioCtrl.updateServicio);
servicioRoutes.delete('/deleteServicio/:_id_servicio', servicioCtrl.deleteServicio);

router.use('/api/servicio', servicioRoutes);

export default router;