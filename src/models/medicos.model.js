import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database';
import { Usuario } from './usuarios.model';

export const Medico = sequelize.define(
    "medicos",
    {
        _id_medico: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        _id_usuario: {
            type: DataTypes.CHAR(10),
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
        timestamps: false,
    }
);

