import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database';
import { Usuario } from './usuarios.model';

export const Paciente = sequelize.define(
    "pacientes",
    {
        _id_paciente: {
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
        tipo_sangre: {
            type: DataTypes.STRING(5),
            allowNull: false
        },
        fecha_nacimiento: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        genero: {
            type: DataTypes.STRING(1),
            allowNull: false
        },
    },
    {
        timestamps: false,
    }
);
