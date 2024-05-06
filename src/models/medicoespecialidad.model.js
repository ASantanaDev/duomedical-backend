import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database';
import { Medico } from './medico.model';
import { Especialidad } from './especialidad.model';

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
                model: Especialidad,
                key: '_id_especialidad'
            }
        },
    },
    {
        timestamps: true,
    }
);