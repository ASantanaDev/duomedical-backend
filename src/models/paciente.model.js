import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import { Usuario } from './usuario.model.js';
import { TipoSangre } from './tiposangre.model.js';
import { Sexo } from './sexo.model.js';

export const Paciente = sequelize.define(
    "paciente",
    {
        _id_paciente: {
            type: DataTypes.CHAR(10),
            primaryKey: true,
            allowNull: false,
            references: {
                model: Usuario,
                key: '_id_usuario'
            }
        },
        fecha_nacimiento: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        tipo_sangre: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: TipoSangre,
                key: '_id_tipo_sangre'
            }
        },
        peso: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        altura: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        sexo: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: Sexo,
                key: '_id_sexo'
            }
        },

    },
    {
        timestamps: true,
        freezeTableName: true,
    }
);
