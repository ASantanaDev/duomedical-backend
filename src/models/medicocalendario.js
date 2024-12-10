import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import { Calendario } from './calendario.model.js';
import { Medico } from './medico.model.js';

export const MedicoCalendario = sequelize.define(
    'medico_calendario',
    {
        _id_medico_calendario: {
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
        calendario: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Calendario,
                key: '_id_calendario'
            }
        },
        estado: {
            type: DataTypes.ENUM('Disponible', 'Ocupado', 'Bloqueado'),
            allowNull: false,
            defaultValue: 'Disponible'
        },
    },
    {
        timestamps: true,
        freezeTableName: true,
    }
);