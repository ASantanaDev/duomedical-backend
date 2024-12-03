import { Paciente } from "../../models/paciente.model.js";
import { TipoSangre } from "../../models/tiposangre.model.js";
import { Sexo } from "../../models/sexo.model.js";
import { Usuario } from "../../models/usuario.model.js";

//Modificar informacion de paciente
export const updatePatient = async (req, res) => {
  try {
    const { _id_paciente } = req.params;
    const {
      primer_nombre,
      segundo_nombre,
      primer_apellido,
      segundo_apellido,
      fecha_nacimiento,
      contacto,
      tipo_sangre,
      peso,
      altura,
      sexo,
    } = req.body;
    
    const genderId = sexo === "Masculino" ? 1 : sexo === "Femenino" ? 2 : null;
    
    if (!genderId) {
      return res.status(400).json({ error: "Sexo no válido" });
    }
    
    const bloodType = await TipoSangre.findOne({
      where: { tipo_sangre: tipo_sangre },
    });
    
    if (!bloodType) {
      return res.status(400).json({ error: "Tipo de sangre no válido" });
    }

    const searchedUser = await Usuario.findByPk(_id_paciente);
    const searchedPatient = await Paciente.findByPk(_id_paciente);
    
    if (searchedUser) {
      searchedUser.primer_nombre = primer_nombre;
      searchedUser.segundo_nombre = segundo_nombre;
      searchedUser.primer_apellido = primer_apellido;
      searchedUser.segundo_apellido = segundo_apellido;
      searchedUser.contacto = contacto;
      await searchedUser.save();
    } else {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    
    if (searchedPatient) {
      searchedPatient.fecha_nacimiento = fecha_nacimiento;
      searchedPatient.tipo_sangre = bloodType._id_tipo_sangre;
      searchedPatient.peso = peso;
      searchedPatient.altura = altura;
      searchedPatient.sexo = genderId;
      await searchedPatient.save();
    } else {
      return res.status(404).json({ error: "Paciente no encontrado" });
    }
    
    return res.json({ message: "Paciente actualizado" });
    
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//Obtener informacion del paciente
export const getPatientInfo = async (req, res) => {
  try {
    const { _id_paciente } = req.params;

    const searchedUser = await Usuario.findByPk(_id_paciente);
    const searchedPatient = await Paciente.findByPk(_id_paciente);

    if (searchedPatient) {
      const bloodType = await TipoSangre.findByPk(searchedPatient.tipo_sangre);
      const gender = await Sexo.findByPk(searchedPatient.sexo);

      const userInfo = {
        _id_usuario: searchedUser._id_usuario,
        primer_nombre: searchedUser.primer_nombre,
        segundo_nombre: searchedUser.segundo_nombre,
        primer_apellido: searchedUser.primer_apellido,
        segundo_apellido: searchedUser.segundo_apellido,
        contacto: searchedUser.contacto,
        email: searchedUser.email,
      };

      const patientInfo = {
        _id_paciente: searchedPatient._id_paciente,
        fecha_nacimiento: searchedPatient.fecha_nacimiento,
        tipo_sangre: bloodType?.tipo_sangre || null,
        peso: searchedPatient.peso,
        altura: searchedPatient.altura,
        sexo: gender?.sexo || null,
      };

      return res.json({
        usuario: userInfo,
        paciente: patientInfo,
      });
    } else {
      return res.status(404).json({ error: "Paciente no encontrado" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};
