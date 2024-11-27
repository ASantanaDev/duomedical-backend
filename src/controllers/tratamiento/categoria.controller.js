import { Servicio, Categoria } from "../../models/index.js";

//Crear categoria
export const createCategoria = async (req, res) => {
  try {
    const { servicio, categoria } = req.body;

    if (!categoria) {
      return res
        .status(400)
        .json({ error: "El campo 'categoria' es obligatorio." });
    }

    // Verificar si el servicio existe
    const servicioExistente = await Servicio.findByPk(servicio);
    if (!servicioExistente) {
      return res.status(404).json({ error: "Servicio no encontrado." });
    }

    // Crear la nueva categoría
    const newCategoria = await Categoria.create({
      servicio,
      categoria,
    });

    return res.json({
      message: "Categoría creada exitosamente",
      categoria: newCategoria,
    });
  } catch (error) {
    console.error("Error al crear categoría:", error);
    return res.status(500).json({
      error: "Error al crear la categoría.",
    });
  }
};


//Lista de categorias por servicio
export const getCategorias = async (req, res) => {
  try {
    const { _id_servicio } = req.params;

    const servicio = await Servicio.findByPk(_id_servicio, {
      include: [
        {
          model: Categoria,
          as: "categorias",
        },
      ],
    });

    if (!servicio) {
      return res.status(404).json({ error: "Servicio no encontrado." });
    }

    // Ordenar las categorías por _id_categoria
    servicio.categorias.sort((a, b) => a._id_categoria - b._id_categoria);

    return res.json({
      servicio: servicio.servicio, // Nombre del servicio
      categorias: servicio.categorias, // Lista de categorías asociadas ordenada
    });
  } catch (error) {
    console.error("Error en getCategorias:", error);
    return res.status(500).json({
      error: "Error al obtener la lista de categorías.",
    });
  }
};



// Modificar categoria
export const updateCategoria = async (req, res) => {
  try {
    const { _id_categoria } = req.params;
    const { categoria } = req.body;

    const categoriaExistente = await Categoria.findByPk(_id_categoria);

    if (!categoriaExistente) {
      return res.status(404).json({
        error: "Categoria no encontrada.",
      });
    }

    await Categoria.update(
      { categoria },
      {
        where: { _id_categoria },
      }
    );

    return res.json({
      message: "Categoria modificada exitosamente",
    });
  } catch (error) {
    return res.status(500).json({
      error: "Error al modificar la categoria.",
    });
  }
};

// Eliminar categoria
export const deleteCategoria = async (req, res) => {
  try {
    const { _id_categoria } = req.params;

    const categoriaExistente = await Categoria.findByPk(_id_categoria);

    if (!categoriaExistente) {
      return res.status(404).json({
        error: "Categoría no encontrada.",
      });
    }

    await Categoria.destroy({ where: { _id_categoria } });

    return res.json({
      message: "Categoría eliminada exitosamente",
    });
  } catch (error) {
    return res.status(500).json({
      error: "Error al eliminar la categoría.",
    });
  }
};
