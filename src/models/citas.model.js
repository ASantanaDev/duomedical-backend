import { DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import { Paciente } from "./pacientes.model";   
import { Servicio } from "./servicios.model";   


//TODO: Redefinir campos
export const Cita = sequelize.define(
    "citas",
    {
        _id_cita: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        _id_paciente: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Paciente,
                key: '_id_paciente'
            }
        },
        _id_servicio: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Servicio,
                key: '_id_servicio'
            }
        },
        _id_atencion: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        estado: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
    },
    {
        timestamps: false,
    }
);
