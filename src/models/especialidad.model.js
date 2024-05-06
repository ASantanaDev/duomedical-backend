export { DataTypes } from 'sequelize';
export { sequelize } from '../config/database';

export const Especialidad = sequelize.define(
    "especialidad",
    {
        _id_especialidad: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        especialidad: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
    },
    {
        timestamps: true,
    }
);