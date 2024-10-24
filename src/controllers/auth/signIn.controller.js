import { Usuario } from "../../models/usuario.model.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import "../../../loadEnv.js";

//Sign In - Login de usuario
export const signIn = async (req, res) => {
    try {
      // validación de datos
      const { email, password } = req.body;
  
      // Verificar campos requeridos
      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Todos los campos son obligatorios" });
      }
  
      // Validar el formato del correo electrónico
      const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailValid.test(email)) {
        return res
          .status(400)
          .json({ message: "El formato del correo electrónico es inválido" });
      }
  
      // verificar si el usuario ya existe
      const usuarioExistente = await Usuario.findOne({ where: { email: email } });
      if (!usuarioExistente) {
        return res
          .status(400)
          .json({ message: "El correo electronico no está registrado" });
      }
  
      // verificar contraseña
      const passwordValida = await bcrypt.compare(
        password,
        usuarioExistente.password
      );
      if (!passwordValida) {
        return res.status(400).json({ message: "Contraseña incorrecta" });
      }
  
      // Crear token
      let token = null;
  
      if (!process.env.SECRET_KEY) {
        console.error("Secret key no definido.");
      } else {
        // Generar el token
        token = jwt.sign(
          {
            _id_usuario: usuarioExistente._id_usuario,
            primer_nombre: usuarioExistente.primer_nombre,
            segundo_nombre: usuarioExistente.segundo_nombre,
            primer_apellido: usuarioExistente.primer_apellido,
            segundo_apellido: usuarioExistente.segundo_apellido,
            contacto: usuarioExistente.contacto,
            email: usuarioExistente.email,
            id_rol: usuarioExistente.rol,
          },
          process.env.SECRET_KEY,
          {
            expiresIn: "1h",
          }
        );
      }
  
      // Devolver respuesta adecuada
      return res.status(200).json({
        status: true,
        message: "Ingreso de usuario exitoso",
        data: token,
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: "Error en el ingreso de usuario",
      });
    }
  };
  