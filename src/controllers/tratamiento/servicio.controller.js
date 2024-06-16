import { Servicio } from "../../models/servicio.model.js";

//Crear servicio
export const createServicio = async (req, res) => {
  try {
    const { servicio } = req.body;

    if (!servicio) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios" });
    }

    const nuevoServicio = await Servicio.create({ servicio });

    return res.status(201).json({
      status: true,
      message: "Servicio creado exitosamente",
      data: nuevoServicio,
    });
  } catch (error) {
    console.error("Error al crear el servicio:", error);
    return res.status(500).json({ 
        message: "Error al crear el servicio" 
    });
  }
};

//Lista de servicios
export const getServicios = async (req, res) => {
  try {
    const servicios = await Servicio.findAll();

    return res.json(servicios);
  } catch (error) {
    return res.status(500).json({ 
        error: error.message 
    });
  }
};

//Modificar servicio
export const updateServicio = async (req, res) => {
  try {
    const { _id_servicio } = req.params;
    const { servicio } = req.body;

    const serv = await Servicio.findByPk(_id_servicio);

    if (serv) {
      await serv.update({ servicio });
      return res.json({ 
        message: "Servicio actualizado" 
    });
    } else {
      return res.status(404).json({ 
        error: "Servicio no encontrado" 
    });
    }
  } catch (error) {
    return res.status(500).json({ error: "error.message" });
  }
};

//Eliminar servicio
export const deleteServicio = async (req, res) => {
  try {
    const { _id_servicio } = req.params;

    const serv = await Servicio.findByPk(_id_servicio);

    if (serv) {
      await serv.destroy();
      return res.json({ 
        message: "Servicio eliminado" 
    });
    } else {
      return res.status(404).json({ 
        error: "Servicio no encontrado" 
    });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
