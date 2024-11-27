import { Router } from 'express';

const router = Router();

import * as tratamientoCtrl from '../controllers/tratamiento/tratamiento.controller.js';

const tratamientoRoutes = Router();

tratamientoRoutes.post('/nuevoTratamiento', tratamientoCtrl.createTratamiento);
tratamientoRoutes.get('/tratamientosPorCategoria/:_id_categoria', tratamientoCtrl.getTratamientosPorCategoria);
tratamientoRoutes.post('/updateTratamiento/:_id_tratamiento', tratamientoCtrl.updateTratamiento);
tratamientoRoutes.delete('/deleteTratamiento/:_id_tratamiento', tratamientoCtrl.deleteTratamiento);

router.use('/api/tratamiento', tratamientoRoutes);

export default router;