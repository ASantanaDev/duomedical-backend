import { Medico } from "../../models/medico.model.js";
import { Usuario } from "../../models/usuario.model.js";

import bcrypt from "bcrypt";
import crypto from "crypto";
import nodemailer from "nodemailer";

import validarCedula from "../../utils/validarCedula.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const createDoctor = async (req, res) => {
  try {
    const { _id_usuario, primer_nombre, primer_apellido, contacto, email } =
      req.body;

    if (
      !_id_usuario ||
      !primer_nombre ||
      !primer_apellido ||
      !contacto ||
      !email
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

    // Verificar si la cédula ya existe
    const cedulaExistente = await Usuario.findOne({ where: { _id_usuario } });
    if (cedulaExistente) {
      return res.status(400).json({ error: "La cédula ya existe" });
    }

    // Validar formato del correo electrónico
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailValid.test(email)) {
      return res
        .status(400)
        .json({ error: "El formato del correo electrónico es inválido" });
    }

    // Verificar si el correo ya existe
    const usuarioExistente = await Usuario.findOne({ where: { email } });
    if (usuarioExistente) {
      return res
        .status(400)
        .json({ error: "El correo electrónico ya está registrado" });
    }

    // Generar contraseña temporal aleatoria
    const tempPassword = crypto.randomBytes(3).toString("hex"); // 6 caracteres aleatorios
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(tempPassword, salt);

    // Generar código de verificación y fecha de expiración
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    const resetExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutos
    const url = `${process.env.FRONTEND_URL}/reset-password`;

    // Crear usuario
    const usuario = await Usuario.create({
      _id_usuario,
      primer_nombre,
      segundo_nombre: null,
      primer_apellido,
      segundo_apellido: null,
      contacto,
      email,
      password: passwordHash,
      rol: 2,
      password_reset_code: resetCode,
      password_reset_code_expires: resetExpires,
    });

    // Crear registros adicionales
    const doctor = await Medico.create({
      _id_medico: _id_usuario,
      descripcion: null,
    });

    // Enviar correo con la contraseña temporal y código de verificación

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Registro Exitoso - Credenciales Temporales",
      html: `
        <p>Hola <strong>${primer_nombre}</strong>,</p>
        <p>Bienvenido/a a nuestra plataforma. A continuación encontrarás tus credenciales temporales:</p>
        <ul>
          <li><strong>Contraseña Temporal:</strong> ${tempPassword}</li>
          <li><strong>Código de Verificación:</strong> ${resetCode}</li>
        </ul>
        <p>Este código de verificación expira en 15 minutos. Por favor, utiliza el siguiente enlace para iniciar sesión y cambiar tu contraseña:</p>
        <p><a href="${url}?code=${resetCode}&email=${encodeURIComponent(
          email
        )}" target="_blank">Cambiar Contraseña</a></p>
        <p>Si no solicitaste este registro, por favor ignora este correo.</p>
        <p>Saludos,<br>Equipo de Duo Medical Esthetic.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(201).json({
      status: true,
      message:
        "Usuario registrado exitosamente. Se ha enviado un correo con las credenciales temporales.",
      data: { usuario, doctor },
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
      searchedDoctor.descripcion = descripcion;
      await searchedDoctor.save();
      return res.json(searchedDoctor);
    } else {
      return res.status(404).json({ error: "Médico no encontrado" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
