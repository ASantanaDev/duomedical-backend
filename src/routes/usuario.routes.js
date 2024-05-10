import { Router } from "express";

const router = Router();

import * as usuarioCtrl from "../controllers/usuario/usuario.controller.js";

export const usuarioRoutes = Router();

usuarioRoutes.delete("/:_id_usuario", usuarioCtrl.deleteUser);
usuarioRoutes.get("/", usuarioCtrl.getUsers);
usuarioRoutes.get("/:_id_usuario", usuarioCtrl.getUserById);
usuarioRoutes.put("/:_id_usuario", usuarioCtrl.updateUser);

router.use('/api/user', usuarioRoutes);

export default router;