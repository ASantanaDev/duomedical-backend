import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database';
import { Usuario } from './usuarios.model';

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
            type: DataTypes.STRING(500),
            allowNull: false
        },
    },
    {
        timestamps: true,
    }
);

