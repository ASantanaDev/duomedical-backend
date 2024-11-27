import { Categoria } from "./categoria.model.js";
import { Servicio } from "./servicio.model.js";
import { Tratamiento } from "./tratamiento.model.js";

// Configuración de asociaciones
Servicio.hasMany(Categoria, { foreignKey: "servicio", as: "categorias" });
Categoria.belongsTo(Servicio, { foreignKey: "servicio", as: "servicioInfo" });

Categoria.hasMany(Tratamiento, { foreignKey: "categoria", as: "tratamientos" });

Tratamiento.belongsTo(Categoria, { foreignKey: "categoria", as: "categoriaInfo" });

export { Categoria, Servicio, Tratamiento };
