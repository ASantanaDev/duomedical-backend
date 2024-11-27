import { Router } from "express";

const router = Router();

import * as categoriaCtrl from "../controllers/tratamiento/categoria.controller.js";

const categoriaRoutes = Router();

categoriaRoutes.get('/listaCategorias/:_id_servicio', categoriaCtrl.getCategorias);
categoriaRoutes.post('/nuevaCategoria', categoriaCtrl.createCategoria);
categoriaRoutes.put('/updateCategoria/:_id_categoria', categoriaCtrl.updateCategoria);
categoriaRoutes.delete('/deleteCategoria/:_id_categoria', categoriaCtrl.deleteCategoria);

router.use('/api/categoria', categoriaRoutes);

export default router;