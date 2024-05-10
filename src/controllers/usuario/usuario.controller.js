import { Usuario } from "../../models/usuario.model.js";


//Obtener usuario por cédula
export const getUserById = async (req, res) => {
  try {
    const { _id_usuario } = req.params;
    const user = await Usuario.findByPk(_id_usuario);
    if (user) {
      return res.json(user);
    } else {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

//Obtener todos los usuarios
export const getUsers = async (req, res) => {
  try {
    const users = await Usuario.findAll();
    return res.json(users);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

//Eliminar usuario
export const deleteUser = async (req, res) => {
  try {
    const { _id_usuario } = req.params;
    const user = await Usuario.findByPk(_id_usuario);
    if (user) {
      await user.destroy();
      return res.json({ message: "Usuario eliminado" });
    } else {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

//Actualizar usuario
export const updateUser = async (req, res) => {
  try {
    const { _id_usuario } = req.params;
    const {
      primer_nombre,
      segundo_nombre,
      primer_apellido,
      segundo_apellido,
      contacto,
    } = req.body;

    const user = await Usuario.findByPk(_id_usuario);
    if (user) {
      user.primer_nombre = primer_nombre;
      user.segundo_nombre = segundo_nombre;
      user.primer_apellido = primer_apellido;
      user.segundo_apellido = segundo_apellido;
      user.contacto = contacto;
      await user.save();
      return res.json(user);
    } else {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}