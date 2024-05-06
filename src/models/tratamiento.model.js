import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database';
import { Servicio } from './servicio.model';

export const Tratamiento = sequelize.define(
    "tratamiento",
    {
        _id_tratamiento: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        servicio: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Servicio,
                key: '_id_servicio'
            }
        },
        tratamiento: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        subtratamiento: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: Tratamiento,
                key: '_id_tratamiento'
            }
        },
    },
    {
        timestamps: true,
    }
);