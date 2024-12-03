import { Categoria } from "./categoria.model.js";
import { Servicio } from "./servicio.model.js";
import { Tratamiento } from "./tratamiento.model.js";
import { Medico } from "./medico.model.js";
import { MedicoEspecialidad } from "./medicoespecialidad.model.js";

// Configuración de asociaciones existentes
Servicio.hasMany(Categoria, { foreignKey: "servicio", as: "categorias" });
Categoria.belongsTo(Servicio, { foreignKey: "servicio", as: "servicioInfo" });

Categoria.hasMany(Tratamiento, { foreignKey: "categoria", as: "tratamientos" });
Tratamiento.belongsTo(Categoria, {
  foreignKey: "categoria",
  as: "categoriaInfo",
});

// Configuración de nuevas asociaciones
MedicoEspecialidad.belongsTo(Servicio, {
  foreignKey: "especialidad",
  as: "servicio",
});

Servicio.hasMany(MedicoEspecialidad, {
  foreignKey: "especialidad",
});

MedicoEspecialidad.belongsTo(Medico, {
  foreignKey: "medico",
  as: "medicoInfo",
});

Medico.hasMany(MedicoEspecialidad, {
  foreignKey: "medico",
  as: "especialidades",
});

// Exportar los modelos
export { Categoria, Servicio, Tratamiento, Medico, MedicoEspecialidad };
