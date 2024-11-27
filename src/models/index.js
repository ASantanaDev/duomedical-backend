import { Categoria } from "./categoria.model.js";
import { Servicio } from "./servicio.model.js";

// Configuración de asociaciones
Servicio.hasMany(Categoria, { foreignKey: "servicio", as: "categorias" });
Categoria.belongsTo(Servicio, { foreignKey: "servicio", as: "servicioInfo" });

export { Categoria, Servicio };
