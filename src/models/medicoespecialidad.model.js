import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import { Medico } from './medico.model.js';

export const MedicoEspecialidad = sequelize.define(
    "medico_especialidad",
    {
        _id_med_esp: {
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
        titulo: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        no_registro: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
    },
    {
        timestamps: true,
        freezeTableName: true,
        
    }
);