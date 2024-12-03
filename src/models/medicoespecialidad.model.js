import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

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
        },
        especialidad: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
        timestamps: true,
        freezeTableName: true,
        
    }
);
