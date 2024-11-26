import { Servicio } from "../../models/servicio.model.js";

//Crear servicio
export const createServicio = async (req, res) => {
  try {
    const { servicio } = req.body;

    if (!servicio) {
      return res.status(400).json({ error: "El campo 'servicio' es obligatorio." });
    }

    const newServicio = await Servicio.create({ servicio });

    return res.json({ 
        message: "Servicio creado exitosamente", 
        servicio: newServicio 
    });
  } catch (error) {
    return res.status(500).json({ 
      error: "Error al crear el servicio." 
  });
  }
};

//Lista de servicios
export const getServicios = async (req, res) => {
  try {

    const servicios = await Servicio.findAll({
      order: [['_id_servicio', 'ASC']], 
    });

    return res.json(servicios);
  } catch (error) {
    return res.status(500).json({ 
      error: "Error al obtener la lista de servicios." 
    });
  }
};

// Obtener un único servicio
export const getServicio = async (req, res) => {
  try {
    const { _id_servicio } = req.params;

    const servicio = await Servicio.findByPk(_id_servicio);
    if (servicio) {
      return res.json(servicio);
    } else {
      return res.status(404).json({ 
          error: "Servicio no encontrado." 
      });
    }
  } catch (error) {
    return res.status(500).json({ 
        error: "Error al obtener el servicio." 
    });
  }
};

//Modificar servicio
export const updateServicio = async (req, res) => {
  try {
    const { _id_servicio } = req.params;
    const { servicio } = req.body;

    if (!servicio) {
      return res.status(400).json({ 
          error: "El campo 'servicio' es obligatorio." 
      });
    }

    const serv = await Servicio.findByPk(_id_servicio);

    if (serv) {
      await serv.update({ servicio });
      return res.json({ 
          message: "Servicio actualizado correctamente." 
      });
    } else {
      return res.status(404).json({ 
          error: "Servicio no encontrado." 
      });
    }
  } catch (error) {
    return res.status(500).json({ 
        error: "Error al actualizar el servicio." 
    });
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
          message: "Servicio eliminado correctamente." 
      });
    } else {
      return res.status(404).json({ 
          error: "Servicio no encontrado." 
      });
    }
  } catch (error) {
    return res.status(500).json({ 
        error: "Error al eliminar el servicio." 
    });
  }
};
