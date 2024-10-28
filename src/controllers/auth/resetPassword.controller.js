import { Usuario } from "../../models/usuario.model.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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

    // Crear un token para el restablecimiento de contraseña
    const token = jwt.sign(
      { _id_usuario: usuario._id_usuario },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );
    const url = `http://localhost:3000/reset-password/${token}`;

    // Enviar el correo de restablecimiento de contraseña
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Restablecimiento de contraseña",
      html: `<p>Haga clic en el siguiente enlace para restablecer su contraseña: <a href="${url}">${url}</a></p>`,
    });

    return res.status(200).json({
      message: "Se ha enviado un enlace para restablecer la contraseña",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error al solicitar el restablecimiento de contraseña",
    });
  }
};

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const usuario = await Usuario.findOne({
      where: { _id_usuario: decoded._id_usuario },
    });

    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Hashear la nueva contraseña
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    usuario.password = passwordHash;

    await usuario.save();

    return res
      .status(200)
      .json({ message: "Contraseña restablecida con éxito" });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Token inválido o expirado" });
  }
};
