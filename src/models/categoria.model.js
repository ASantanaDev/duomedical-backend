import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Categoria = sequelize.define(
    "categoria",
    {
        _id_categoria: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        servicio: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        categoria: {
            type: DataTypes.STRING(255),
            allowNull: false
        },        
    },
    {
        timestamps: true,
        freezeTableName: true,
    }
);
