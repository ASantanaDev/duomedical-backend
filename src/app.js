import cors from "cors";
import express from "express";

import authRoutes from "./routes/auth.routes.js";
import doctorRoutes from "./routes/medico.routes.js";
import patientRoutes from "./routes/paciente.routes.js"
import rolRoutes from "./routes/rol.routes.js";
import usuarioRoutes from "./routes/usuario.routes.js";

const app = express();

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
    doctorRoutes,
    patientRoutes,
    rolRoutes,
    usuarioRoutes,
);

export default app;