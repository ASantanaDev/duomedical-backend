import { Usuario } from "../../models/usuario.model.js";

import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

import "../../../loadEnv.js";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expirationTime = new Date(Date.now() + 15 * 60 * 1000); // Expira en 15 minutos
    const url = `${process.env.FRONTEND_URL}/reset-password`;

    usuario.password_reset_code = code;
    usuario.password_reset_code_expires = expirationTime;
    await usuario.save();

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Solicitud de Restablecimiento de Contraseña",
      html: `
        <p>Hola ${usuario.primer_nombre || "Usuario"},</p>
        <p>Recibimos una solicitud para restablecer la contraseña de tu cuenta. Para continuar, haz clic en el enlace a continuación:</p>
        <p><a href="${url}" style="color: #1a73e8;">Restablecer mi contraseña</a></p>
        <p>Tu código de restablecimiento de contraseña es: <strong>${code}</strong></p><p>Este código expira en 15 minutos.</p>
        <p>Si no realizaste esta solicitud, puedes ignorar este mensaje; tu cuenta permanecerá segura.</p>
        <p>Si tienes algún problema, no dudes en contactarnos.</p>
        <br>
        <p>Saludos,</p>
        <p>El equipo de Duo Medical Esthetic</p>
      `,
    });

    return res.status(200).json({
      message:
        "Se ha enviado un enlace para restablecer la contraseña. Por favor revise su correo electrónico.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error al solicitar el restablecimiento de contraseña",
    });
  }
};

export const resetPassword = async (req, res) => {
  const { email, code, password } = req.body;
  console.log('Datos recibidos:', { email, code, password });

  try {
    const usuario = await Usuario.findOne({ where: { email }  });

    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (usuario.password_reset_code !== code || usuario.password_reset_code_expires < Date.now()) {
      return res.status(400).json({ message: "Código inválido o expirado" });
    }

    // Hashear la nueva contraseña
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    usuario.password = passwordHash;
    usuario.password_reset_code = null;
    usuario.password_reset_code_expires = null;

    await usuario.save();

    return res.status(200).json({ message: "Contraseña restablecida con éxito" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al restablecer la contraseña" });
  }
};

