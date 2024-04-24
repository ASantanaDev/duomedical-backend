import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

export const Servicio = sequelize.define(
    "servicios",
    {
        _id_servicio: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        servicio: {
            type: DataTypes.STRING(250),
            allowNull: false
        },
    },
    {
        timestamps: false,
    }
);