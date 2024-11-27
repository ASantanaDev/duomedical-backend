import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Tratamiento = sequelize.define(
    'tratamiento',
    {
        _id_tratamiento: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        categoria: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        tratamiento: {
            type: DataTypes.STRING(255),
            allowNull: false
        }
    },
    {
        timestamps: true,
        freezeTableName: true,
    }
);