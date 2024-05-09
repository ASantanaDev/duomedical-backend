import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Sexo = sequelize.define(
    'sexo',
    {
        _id_sexo: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        sexo: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
    },
    {
        timestamps: true,
        freezeTableName: true,
    }
);