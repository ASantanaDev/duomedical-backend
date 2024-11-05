import cors from "cors";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/auth.routes.js";
import calendarioRoutes from "./routes/calendario.routes.js";
import doctorRoutes from "./routes/medico.routes.js";
import patientRoutes from "./routes/paciente.routes.js"
import rolRoutes from "./routes/rol.routes.js";
import servicioRoutes from "./routes/servicio.routes.js";
import usuarioRoutes from "./routes/usuario.routes.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//middlewares
app.use(cors({
    origin: [
        "http://localhost:4200",
        "https://localhost:4200",
    ],
    credentials: true
}));
app.use(express.json());

//routes
app.use(
    authRoutes,
    calendarioRoutes,
    doctorRoutes,
    patientRoutes,
    rolRoutes,
    servicioRoutes,
    usuarioRoutes,
);

//static files
app.use(express.static(path.join(__dirname, '../../duomedical-frontend/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../duomedical-frontend/dist', 'index.html'));
  });

export default app;