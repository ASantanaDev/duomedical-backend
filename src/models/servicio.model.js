import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Servicio = sequelize.define(
    "servicio",
    {
        _id_servicio: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        servicio: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
    },
    {
        timestamps: true,
        freezeTableName: true,
    }
);

