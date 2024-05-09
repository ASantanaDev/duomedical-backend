import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Rol = sequelize.define(
    "rol", 
    {
        _id_rol: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        rol: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
    },
    { 
        timestamps: true,
        freezeTableName: true,
    }
);