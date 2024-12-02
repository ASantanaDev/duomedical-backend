import { Router } from "express";

const router = Router();

import * as calendarioCtrl from "../controllers/calendario/horario.controller.js";

const calendarioRoutes = Router();

calendarioRoutes.get('/horarios', calendarioCtrl.getHorarios);
calendarioRoutes.put('/horario/:_id_horario', calendarioCtrl.cambiarVigencia);
calendarioRoutes.post('/horario', calendarioCtrl.crearHorario);
calendarioRoutes.delete('/horario/:_id_horario', calendarioCtrl.eliminarHorario);

router.use('/api/calendario', calendarioRoutes);

export default router;