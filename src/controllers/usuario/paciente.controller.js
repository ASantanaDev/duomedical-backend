import { Paciente } from "../../models/paciente.model.js";
import { TipoSangre } from "../../models/tiposangre.model.js";
import { Sexo } from "../../models/sexo.model.js";

//Modificar informacion de paciente
export const updatePatient = async (req, res) => {
  try {
    const { _id_paciente } = req.params;
    const { fecha_nacimiento, tipo_sangre, peso, altura, sexo } = req.body;

    const genderId = sexo === "Masculino" ? 1 : 2;

    const bloodType = await TipoSangre.findOne({
      where: { tipo_sangre: tipo_sangre },
    });

    if (!bloodType)
      return res.status(400).json({ error: "Tipo de sangre no válido" });

    const searchedPatient = await Paciente.findByPk(_id_paciente);

    if (searchedPatient) {
      (searchedPatient.fecha_nacimiento = fecha_nacimiento),
        (searchedPatient.tipo_sangre = bloodType._id_tipo_sangre),
        (searchedPatient.peso = peso),
        (searchedPatient.altura = altura),
        (searchedPatient.sexo = genderId);
      await searchedPatient.save();
      return res.json(searchedPatient);
    } else {
      return res.status(404).json({ error: "Paciente no encontrado" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//Obtener informacion del paciente
export const getPatientInfo = async (req, res) => {
  try {
    const { _id_paciente } = req.params;

    const searchedPatient = await Paciente.findByPk(_id_paciente);

    if (searchedPatient) {
      const bloodType = await TipoSangre.findByPk(searchedPatient.tipo_sangre);
      const gender = await Sexo.findByPk(searchedPatient.sexo);

      searchedPatient.tipo_sangre = bloodType.tipo_sangre;
      searchedPatient.sexo = gender.sexo;

      return res.json(searchedPatient);
    } else return res.status(404).json({ error: "Paciente no encontrado" });
  } catch {
    return res.status(500).json({ error: error.message });
  }
};
