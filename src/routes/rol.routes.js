import { Router } from "express";

const router = Router();

import * as rolCtrl from "../controllers/usuario/rol.controller.js";

export const rolRoutes = Router()

rolRoutes.get("/", rolCtrl.getRoles);
rolRoutes.post("/", rolCtrl.createRol);
rolRoutes.put("/:_id_usuario", rolCtrl.updateRol);
rolRoutes.delete("/:_id_rol", rolCtrl.deleteRol);


router.use('/api/rol', rolRoutes);

export default router;