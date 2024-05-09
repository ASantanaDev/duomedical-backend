import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import { Horario } from './horario.model.js';

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
        estado_calendario: {
            type: DataTypes.ENUM('Ocupado', 'Desocupado'),
            allowNull: false
        },
    },
    {
        timestamps: true,
        freezeTableName: true,
    }
);