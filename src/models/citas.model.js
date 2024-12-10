import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { Paciente } from "./pacientes.model.js";   
import { Medico } from "./medico.model.js";  


export const Cita = sequelize.define(
    "cita",
    {
        _id_cita: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        medico: {
            type: DataTypes.CHAR(10),
            allowNull: false,
            references: {
                model: Medico,
                key: '_id_medico'
            }
        },
        paciente: {
            type: DataTypes.CHAR(10),
            allowNull: false,
            references: {
                model: Paciente,
                key: '_id_paciente'
            }
        },
        estado_cita: {
            type: DataTypes.ENUM('Pendiente', 'Atendida', 'Cancelada'),
            allowNull: false,
            defaultValue: 'Pendiente'
        },
        motivo_consulta: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        enfermedad_actual: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        diagnostico_ingreso: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        horario: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        fecha: {
            type: DataTypes.DATE,
            allowNull: false,
        },        
    },
    {
        timestamps: true,
        freezeTableName: true,
    }
);
