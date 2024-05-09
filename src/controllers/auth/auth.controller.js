import { Usuario } from "../../models/usuario.model.js";

import validarCedula from "../../utils/validarCedula.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "../../../loadEnv.js";

//Sign Up
export const signUp = async (req, res) => {
  try {
    const { 
      _id_usuario, 
      primer_nombre, 
      segundo_nombre, 
      primer_apellido, 
      segundo_apellido,
      contacto,
      email, 
      password,
    } = req.body;

    if (
      !_id_usuario ||
      !primer_nombre ||
      !segundo_nombre ||
      !primer_apellido ||
      !segundo_apellido ||
      !contacto ||
      !email ||
      !password
    ) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios" });
    }

    // Validar cédula
    if (!validarCedula(_id_usuario)) {
      return res
        .status(400)
        .json({ error: "La cédula proporcionada no es válida" });
    }

    //verificar si la cedula ya existe
    const cedulaExistente = await Usuario.findOne({
      where: { _id_usuario: _id_usuario },
    });
    if (cedulaExistente) {
      return res.status(400).json({ error: "La cédula ya existe" });
    }

    // Validar el formato del correo electrónico
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailValid.test(email)) {
      return res
        .status(400)
        .json({ error: "El formato del correo electrónico es inválido" });
    }

    //verificar si el usuario ya existe
    const usuarioExistente = await Usuario.findOne({ where: { email: email } });
    if (usuarioExistente) {
      return res
        .status(400)
        .json({ error: "El correo electronico ya está registrado" });
    }

    //Hashear contraseña
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    //crear usuario
    const usuario = await Usuario.create({
      _id_usuario,
      primer_nombre,
      segundo_nombre,
      primer_apellido,
      segundo_apellido,
      contacto,
      email,
      password: passwordHash,
      rol: 3,
    });

    return res.status(201).json({
      message: "Usuario registrado exitosamente",
      data: usuario,
    });
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
    return res.status(500).json({
      message: "Error al registrar el usuario",
    });
  }
};

//Sign In
export const signIn = async (req, res) => {
  try {
    // validación de datos
    const { email, password } = req.body;

    // Verificar campos requeridos
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios" });
    }

    // Validar el formato del correo electrónico
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailValid.test(email)) {
      return res
        .status(400)
        .json({ error: "El formato del correo electrónico es inválido" });
    }

    // verificar si el usuario ya existe
    const usuarioExistente = await Usuario.findOne({ where: { email: email } });
    if (!usuarioExistente) {
      return res
        .status(400)
        .json({ error: "El correo electronico no está registrado" });
    }

    // verificar contraseña
    const passwordValida = await bcrypt.compare(
      password,
      usuarioExistente.password
    );
    if (!passwordValida) {
      return res.status(400).json({ error: "Contraseña incorrecta" });
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
      message: "Ingreso de usuario exitoso",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error en el ingreso de usuario",
    });
  }
};
