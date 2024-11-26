import { Tratamiento } from '../../models/tratamiento.model.js';
import { Servicio } from '../../models/servicio.model.js';

export const createTratamiento = async (req, res) => {
    try {
        const { servicio, tratamiento } = req.body;

        const newTratamiento = await Tratamiento.create({
            servicio,
            tratamiento
        });
        res.json(newTratamiento);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error creating Tratamiento"
        });
    }
};

export const getTratamientos = async (req, res) => {
    try {
        const tratamientos = await Tratamiento.findAll({
            include: Servicio
        });
        res.json(tratamientos);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error fetching Tratamientos"
        });
    }
};

export const getTratamientoById = async (req, res) => {
    const { _id_tratamiento } = req.params;
    try {
        const tratamiento = await Tratamiento.findByPk(_id_tratamiento);
        res.json(tratamiento);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error fetching Tratamiento"
        });
    }
};

export const updateTratamiento = async (req, res) => {
    const { _id_tratamiento } = req.params;
    const { servicio, tratamiento } = req.body;

    try {
        const tratamientoUpdate = await Tratamiento.update({
            servicio,
            tratamiento
        }, {
            where: {
                _id_tratamiento
            }
        });
        res.json(tratamientoUpdate);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error updating Tratamiento"
        });
    }
}

export const deleteTratamiento = async (req, res) => {
    const { _id_tratamiento } = req.params;
    try {
        await Tratamiento.destroy({
            where: {
                _id_tratamiento
            }
        });
        res.json({
            message: "Tratamiento deleted successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error deleting Tratamiento"
        });
    }
}

