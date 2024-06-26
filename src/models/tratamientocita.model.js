import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import { Cita } from './citas.model.js';
import { Tratamiento } from './tratamiento.model.js';

export const TratamientoCita = sequelize.define(
    'tratamiento_cita',
    {
        _id_tratamiento_cita: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        tratamiento: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Tratamiento,
                key: '_id_tratamiento'
            }
        },
        cita: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Cita,
                key: '_id_cita'
            }
        },
    },
    {
        timestamps: true,
        freezeTableName: true,
    }
);