import { Usuario } from "../../models/usuario.model.js";
import { Medico, Servicio, MedicoEspecialidad } from "../../models/index.js";

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
    const {
      primer_nombre,
      segundo_nombre,
      primer_apellido,
      segundo_apellido,
      email,
      contacto,
      descripcion,
      especialidades, // Array de IDs de especialidades
    } = req.body;

    // Verificar si el usuario y médico existen
    const searchedUser = await Usuario.findByPk(_id_medico);
    const searchedDoctor = await Medico.findByPk(_id_medico);

    if (!searchedUser) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    if (!searchedDoctor) {
      return res.status(404).json({ error: "Médico no encontrado" });
    }

    // Actualizar información del usuario
    searchedUser.primer_nombre = primer_nombre;
    searchedUser.segundo_nombre = segundo_nombre;
    searchedUser.primer_apellido = primer_apellido;
    searchedUser.segundo_apellido = segundo_apellido;
    searchedUser.contacto = contacto;
    searchedUser.email = email;
    await searchedUser.save();

    // Actualizar información del médico
    searchedDoctor.descripcion = descripcion;
    await searchedDoctor.save();

    // Validar y agregar especialidades
    if (especialidades && Array.isArray(especialidades)) {
      // Validar que las especialidades existen en la tabla Servicio
      const validSpecialties = await Servicio.findAll({
        where: { _id_servicio: especialidades },
      });

      const validSpecialtyIds = validSpecialties.map(s => s._id_servicio);

      if (validSpecialtyIds.length !== especialidades.length) {
        return res.status(400).json({
          error: "Algunas especialidades proporcionadas no son válidas.",
        });
      }

      // Actualizar las especialidades del médico
      await MedicoEspecialidad.destroy({ where: { medico: _id_medico } });

      const medicoEspecialidades = validSpecialtyIds.map(especialidad => ({
        medico: _id_medico,
        especialidad,
      }));

      await MedicoEspecialidad.bulkCreate(medicoEspecialidades);
    }

    return res.json({ message: "Médico actualizado con especialidades." });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getDoctorInfo = async (req, res) => {
  try {
    const { _id_medico } = req.params;

    // Buscar el usuario asociado al médico
    const usuario = await Usuario.findOne({
      where: { _id_usuario: _id_medico },
    });

    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Buscar los datos del médico
    const medico = await Medico.findOne({
      where: { _id_medico },
    });

    if (!medico) {
      return res.status(404).json({ error: 'Médico no encontrado' });
    }

    // Buscar las especialidades del médico
    const especialidades = await MedicoEspecialidad.findAll({
      where: { medico: _id_medico },
      include: [
        {
          model: Servicio,
          as: 'servicio', // Esto debe coincidir con el alias definido en belongsTo
          attributes: ['_id_servicio', 'servicio'],
        },
      ],
    });
    

    // Formatear las especialidades
    const formattedEspecialidades = especialidades.map((esp) => ({
      id: esp.especialidad,
      nombre: esp.servicio.servicio,
    }));

    // Construir la respuesta
    const response = {
      usuario: {
        primer_nombre: usuario.primer_nombre,
        segundo_nombre: usuario.segundo_nombre,
        primer_apellido: usuario.primer_apellido,
        segundo_apellido: usuario.segundo_apellido,
        contacto: usuario.contacto,
        email: usuario.email,
      },
      medico: {
        descripcion: medico.descripcion,
      },
      especialidades: formattedEspecialidades,
    };

    return res.json(response);
  } catch (error) {
    console.error('Error al obtener la información del médico:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};
