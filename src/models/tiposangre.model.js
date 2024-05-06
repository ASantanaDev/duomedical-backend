import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

export const TipoSangre = sequelize.define(
    'tipo_sangre',
    {
        _id_tipo_sangre: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        tipo_sangre: {
            type: DataTypes.STRING(5),
            allowNull: false
        },
    },
    {
        timestamps: true,
    }
);