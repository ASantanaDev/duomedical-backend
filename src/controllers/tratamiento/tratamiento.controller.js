import { Tratamiento, Categoria } from "../../models/index.js";

// Crear un nuevo tratamiento
export const createTratamiento = async (req, res) => {
  try {
    const { categoria, tratamiento } = req.body;

    // Verificar si la categoría existe
    const categoriaExistente = await Categoria.findByPk(categoria);
    if (!categoriaExistente) {
      return res.status(404).json({ error: "Categoría no encontrada." });
    }

    // Crear un nuevo tratamiento
    const nuevoTratamiento = await Tratamiento.create({
      categoria,
      tratamiento,
    });

    return res.json({
      message: "Tratamiento creado exitosamente",
      tratamiento: nuevoTratamiento,
    });
  } catch (error) {
    console.error("Error al crear tratamiento:", error);
    return res.status(500).json({
      error: "Error al crear el tratamiento.",
    });
  }
};

// Obtener los tratamientos por categoría
export const getTratamientosPorCategoria = async (req, res) => {
  try {
    const { _id_categoria } = req.params;

    // Buscar los tratamientos de la categoría
    const tratamientos = await Tratamiento.findAll({
      where: { categoria: _id_categoria },
    });

    if (tratamientos.length === 0) {
      return res.status(404).json({ error: "No se encontraron tratamientos." });
    }

    return res.json({
      tratamientos,
    });
  } catch (error) {
    console.error("Error al obtener tratamientos:", error);
    return res.status(500).json({
      error: "Error al obtener los tratamientos.",
    });
  }
};

// Actualizar un tratamiento
export const updateTratamiento = async (req, res) => {
  try {
    const { _id_tratamiento } = req.params;
    const { tratamiento } = req.body;

    // Buscar el tratamiento por ID
    const tratamientoExistente = await Tratamiento.findByPk(_id_tratamiento);
    if (!tratamientoExistente) {
      return res.status(404).json({
        error: "Tratamiento no encontrado.",
      });
    }

    // Actualizar el tratamiento
    await Tratamiento.update(
      { tratamiento },
      { where: { _id_tratamiento } }
    );

    return res.json({
      message: "Tratamiento actualizado exitosamente.",
    });
  } catch (error) {
    console.error("Error al actualizar tratamiento:", error);
    return res.status(500).json({
      error: "Error al actualizar el tratamiento.",
    });
  }
};

// Eliminar un tratamiento
export const deleteTratamiento = async (req, res) => {
  try {
    const { _id_tratamiento } = req.params;

    // Buscar el tratamiento por ID
    const tratamientoExistente = await Tratamiento.findByPk(_id_tratamiento);
    if (!tratamientoExistente) {
      return res.status(404).json({
        error: "Tratamiento no encontrado.",
      });
    }

    // Eliminar el tratamiento
    await Tratamiento.destroy({ where: { _id_tratamiento } });

    return res.json({
      message: "Tratamiento eliminado exitosamente.",
    });
  } catch (error) {
    console.error("Error al eliminar tratamiento:", error);
    return res.status(500).json({
      error: "Error al eliminar el tratamiento.",
    });
  }
};
