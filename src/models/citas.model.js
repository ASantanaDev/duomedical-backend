import { DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import { Paciente } from "./pacientes.model";   
import { Medico } from "./medico.model";  
import { EstadoCita } from "./estadocita.model";


//TODO: Redefinir campos
export const Cita = sequelize.define(
    "cita",
    {
        _id_cita: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        medico: {
            type: DataTypes.CHAR(10),
            allowNull: false,
            references: {
                model: Medico,
                key: '_id_medico'
            }
        },
        paciente: {
            type: DataTypes.CHAR(10),
            allowNull: false,
            references: {
                model: Paciente,
                key: '_id_paciente'
            }
        },
        estado_cita: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: EstadoCita,
                key: '_id_estado_cita'
            }
        },
        fecha_cita: {
            type: DataTypes.DATE,
            allowNull: false
        },
    },
    {
        timestamps: true,
    }
);
