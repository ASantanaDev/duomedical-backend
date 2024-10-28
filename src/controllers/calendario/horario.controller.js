import { Horario } from '../../models/horario.model.js';

//Obtener horarios
export const getHorarios = async (res) => {
  try {
    const horarios = await Horario.findAll();

    return res.json(horarios);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//Cambiar vigencia
export const cambiarVigencia = async (req, res) => {
  try {
    const { _id_horario } = req.params;

    const horario = await Horario.findByPk(_id_horario);

    if (!horario) {
      return res.status(404).json({ error: "No se encontró el horario" });
    }

    horario.vigente = !horario.vigente;

    await horario.save();

    return res.json(horario);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};