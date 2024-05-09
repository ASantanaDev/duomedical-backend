import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { Rol } from "./rol.model.js";

export const Usuario = sequelize.define(
    "usuario", 
    {
        _id_usuario: {
            type: DataTypes.CHAR(10),
            primaryKey: true,
            allowNull: false
        },
        primer_nombre: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        segundo_nombre: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        primer_apellido: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        segundo_apellido: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        contacto: {
            type: DataTypes.CHAR(10),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        rol: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 3,
            references: {
                model: Rol,
                key: '_id_rol'
            }
        },
    },
    { 
        timestamps: true,
        freezeTableName: true,
    }
);