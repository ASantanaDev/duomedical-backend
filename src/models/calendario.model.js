import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database';
import { Horario } from './horario.model';

export const Calendario = sequelize.define(
    'calendario',
    {
        _id_calendario: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        horario: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Horario,
                key: '_id_horario'
            }
        },
        fecha: {
            type: DataTypes.DATE,
            allowNull: false
        },
    },
    {
        timestamps: true,
    }
);