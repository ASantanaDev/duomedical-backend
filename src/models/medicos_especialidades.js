import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database';
import { Medico } from './medicos.model';
import { Especialidad } from './especialidades.model';

export const MedicoEspecialidad = sequelize.define(
    "medicos_especialidades",
    {
        _id_med_esp: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        _id_medico: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            references: {
                model: 'medicos',
                key: '_id_medico'
            }
        },
        _id_especialidad: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            references: {
                model: 'especialidades',
                key: '_id_especialidad'
            }
        },
    },
    {
        timestamps: false,
    }
);