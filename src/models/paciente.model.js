import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database';
import { Usuario } from './usuarios.model';
import { TipoSangre } from './tiposangre.model';
import { Sexo } from './sexo.model';

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
            allowNull: false
        },
        tipo_sangre: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: TipoSangre,
                key: '_id_tipo_sangre'
            }
        },
        sexo: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Sexo,
                key: '_id_sexo'
            }
        },
        peso: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        altura: {
            type: DataTypes.FLOAT,
            allowNull: false
        },

    },
    {
        timestamps: true,
    }
);
