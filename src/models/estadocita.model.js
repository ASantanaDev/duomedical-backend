import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

export const EstadoCita = sequelize.define(
    'estado_cita',
    {
        _id_estado_cita: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        estado_cita: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
    },
    {
        timestamps: true,
    }
);