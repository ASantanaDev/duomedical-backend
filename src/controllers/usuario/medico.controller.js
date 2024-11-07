import { Medico } from "../../models/medico.model.js";
import { MedicoEspecialidad } from "../../models/medicoespecialidad.model.js";
import { Usuario } from "../../models/usuario.model.js";

import bcrypt from "bcrypt";

import validarCedula from "../../utils/validarCedula.js";

//Crear medico
export const createDoctor = async (req, res) => {
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
      rol: 2,
      password_reset_code: null,
      password_reset_code_expires: null,
    });

    const doctor = await Medico.create({
      _id_medico: _id_usuario,
      descripcion: null,
    });

    const espec = await MedicoEspecialidad.create({
      medico: _id_usuario,
      titulo: null,
      no_registro: null,
    });

    return res.status(201).json({
      status: true,
      message: "Usuario registrado exitosamente",
      data: { usuario, doctor, espec },
    });
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
    return res.status(500).json({
      message: "Error al registrar el usuario",
    });
  }
};

//Actualizar medico
export const updateDoctor = async (req, res) => {
  try {
    const { _id_medico } = req.params;
    const { descripcion } = req.body;

    const searchedDoctor = await Medico.findByPk(_id_medico);

    if (searchedDoctor) {
      (searchedDoctor.descripcion = descripcion);
      await searchedDoctor.save();
      return res.json(searchedDoctor);
    } else {
      return res.status(404).json({ error: "Médico no encontrado" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
