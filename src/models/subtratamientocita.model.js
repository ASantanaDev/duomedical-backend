import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import { Cita } from './citas.model.js';
import { Subtratamiento } from './subtratamiento.model.js';

export const SubtratamientoCita = sequelize.define(
    'tratamiento_cita',
    {
        _id_tratamiento_cita: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        subtratamiento: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Subtratamiento,
                key: '_id_subtratamiento'
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