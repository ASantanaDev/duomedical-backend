import { Router } from "express";

const router = Router();

import * as servicioCtrl from "../controllers/tratamiento/servicio.controller.js";

const servicioRoutes = Router();

servicioRoutes.get('/servicios', servicioCtrl.getServicios);
// servicioRoutes.get('/servicio/:_id_servicio', servicioCtrl.getServicio);
servicioRoutes.post('/nuevoServicio', servicioCtrl.createServicio);
servicioRoutes.put('/servicio/:_id_servicio', servicioCtrl.updateServicio);
servicioRoutes.delete('/servicio/:_id_servicio', servicioCtrl.deleteServicio);

router.use('/api/servicio', servicioRoutes);

export default router;