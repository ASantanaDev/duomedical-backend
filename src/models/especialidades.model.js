export { DataTypes } from 'sequelize';
export { sequelize } from '../config/database';

export const Especialidad = sequelize.define(
    "especialidades",
    {
        _id_especialidad: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nombre: {
            type: DataTypes.STRING(250),
            allowNull: false
        },
    },
    {
        timestamps: false,
    }
);