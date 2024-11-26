import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import { Medico } from './medico.model.js';
import { Servicio } from './servicio.model.js';

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
        especialidad: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Servicio,
                key: '_id_servicio'
            }
        }
    },
    {
        timestamps: true,
        freezeTableName: true,
        
    }
);