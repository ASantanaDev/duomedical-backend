import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import { Usuario } from './usuario.model.js';

export const Medico = sequelize.define(
    "medico",
    {
        _id_medico: {
            type: DataTypes.CHAR(10),
            primaryKey: true,
            allowNull: false,
            references: {
                model: Usuario,
                key: '_id_usuario'
            }
        },
        descripcion: {
            type: DataTypes.TEXT,
            allowNull: false
        },
    },
    {
        timestamps: true,
        freezeTableName: true,
    }
);

