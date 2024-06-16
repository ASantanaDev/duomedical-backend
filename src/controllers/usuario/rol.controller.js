import { Usuario } from "../../models/usuario.model.js";
import { Rol } from "../../models/rol.model.js";

//Modificar rol a usuario
export const updateRol = async (req, res) => {
  try {
    const { _id_usuario } = req.params;
    const { rol } = req.body;

    const user = await Usuario.findByPk(_id_usuario);
    if (user) {
      await user.update({ rol });
      return res.json({ message: "Rol actualizado" });
    } else {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

//Lista de roles
export const getRoles = async (req, res) => {
  try {
    const roles = await Rol.findAll();
    return res.json(roles);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

//Crear rol
export const createRol = async (req, res) => {
  try {
    const { rol } = req.body;
    const newRol = await Rol.create({ rol });
    return res.json(newRol);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

//Eliminar rol
export const deleteRol = async (req, res) => {
  try {
    const { _id_rol } = req.params;
    const rol = await Rol.findByPk(_id_rol);
    if (rol) {
      await rol.destroy();
      return res.json({ message: "Rol eliminado" });
    } else {
      return res.status(404).json({ error: "Rol no encontrado" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}



