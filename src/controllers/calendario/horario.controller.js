import { Horario } from "../../models/horario.model.js";

// Obtener todos los horarios con paginación
export const getHorarios = async (req, res) => {
  try {
    // Obtener los parámetros de consulta para paginación
    const { page = 1, limit = 10 } = req.query;

    // Convertir los parámetros a números
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    // Calcular el desplazamiento
    const offset = (pageNumber - 1) * limitNumber;

    // Consultar los horarios con paginación
    const { count, rows } = await Horario.findAndCountAll({
      order: [["hora_inicio", "ASC"]],
      limit: limitNumber,
      offset: offset,
    });

    // Calcular el total de páginas
    const totalPages = Math.ceil(count / limitNumber);

    return res.json({
      data: rows, // Horarios paginados
      totalItems: count, // Total de elementos
      currentPage: pageNumber, // Página actual
      totalPages: totalPages, // Total de páginas
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error al obtener los horarios", detalle: error.message });
  }
};

// Cambiar vigencia de un horario
export const cambiarVigencia = async (req, res) => {
  try {
    const { _id_horario } = req.params;

    const horario = await Horario.findByPk(_id_horario);

    if (!horario) {
      return res
        .status(404)
        .json({ error: "No se encontró el horario con el ID proporcionado" });
    }

    horario.vigente = !horario.vigente;
    await horario.save();

    return res.json({ mensaje: "Vigencia actualizada", horario });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error al cambiar la vigencia", detalle: error.message });
  }
};

// Crear un nuevo horario
export const crearHorario = async (req, res) => {
  try {
    const { hora_inicio, hora_fin } = req.body;

    if (!hora_inicio || !hora_fin) {
      return res
        .status(400)
        .json({ error: "Los campos hora_inicio y hora_fin son obligatorios" });
    }

    const nuevoHorario = await Horario.create({ hora_inicio, hora_fin });

    return res
      .status(201)
      .json({ mensaje: "Horario creado exitosamente", horario: nuevoHorario });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error al crear el horario", detalle: error.message });
  }
};

// Eliminar un horario
export const eliminarHorario = async (req, res) => {
  try {
    const { _id_horario } = req.params;

    const horario = await Horario.findByPk(_id_horario);

    if (!horario) {
      return res
        .status(404)
        .json({ error: "No se encontró el horario con el ID proporcionado" });
    }

    await horario.destroy();
    return res.json({ mensaje: "Horario eliminado exitosamente" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error al eliminar el horario", detalle: error.message });
  }
};
