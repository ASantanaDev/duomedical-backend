import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import { Tratamiento } from './tratamiento.model.js';

export const Subtratamiento = sequelize.define(
    'subtratamiento',
    {
        _id_subtratamiento: {
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
        subtratamiento: {
            type: DataTypes.STRING(255),
            allowNull: false
        }
    },
    {
        timestamps: true,
        freezeTableName: true,
    }
);