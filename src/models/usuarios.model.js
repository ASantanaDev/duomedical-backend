import { DataTypes } from "sequelize";
import { sequelize } from "../config/database";

export const Usuario = sequelize.define(
    "usuarios", 
    {
        _id_usuario: {
            type: Sequelize.CHAR(10),
            primaryKey: true,
            allowNull: false
        },
        primer_nombre: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        segundo_nombre: {
            type: Sequelize.STRING(100),
            allowNull: true
        },
        primer_apellido: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        segundo_apellido: {
            type: Sequelize.STRING(100),
            allowNull: true
        },
        contacto: {
            type: Sequelize.STRING(10),
            allowNull: false
        },
        email: {
            type: Sequelize.STRING(200),
            allowNull: false
        },
        password: {
            type: Sequelize.STRING(500),
            allowNull: false
        },
        IsDoctor: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        IsAdmin: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
    },
    { 
        timestamps: true,
    }
);