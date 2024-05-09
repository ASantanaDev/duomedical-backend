import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";


export const HistoricoCita = sequelize.define(
    "historico_cita",
    {
        _id_historico_cita: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        medico: {
            type: DataTypes.CHAR(10),
            allowNull: false,
        },
        paciente: {
            type: DataTypes.CHAR(10),
            allowNull: false,
        },
        estado_cita: {
            type: DataTypes.ENUM,
            values: ['Ocupado', 'Desocupado'],
            allowNull: false,
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
