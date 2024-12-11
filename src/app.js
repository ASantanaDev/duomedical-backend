import cors from "cors";
import express from "express";
import bodyParser from 'body-parser';

import authRoutes from "./routes/auth.routes.js";
import calendarioRoutes from "./routes/calendario.routes.js";
import categoriaRoutes from "./routes/categoria.routes.js";
import doctorRoutes from "./routes/medico.routes.js";
import patientRoutes from "./routes/paciente.routes.js"
import rolRoutes from "./routes/rol.routes.js";
import servicioRoutes from "./routes/servicio.routes.js";
import tratamientoRoutes from "./routes/tratamiento.routes.js";
import usuarioRoutes from "./routes/usuario.routes.js";

const app = express();

//middlewares
app.use(cors({
    origin: [
        "http://localhost:4200",
        "https://localhost:4200",
        "https://duomedical-frontend.vercel.app",
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
}));
app.use(express.json());
app.use(bodyParser.json()); 

//routes
app.use(
    authRoutes,
    calendarioRoutes,
    categoriaRoutes,
    doctorRoutes,
    patientRoutes,
    rolRoutes,
    servicioRoutes,
    tratamientoRoutes,
    usuarioRoutes,
);


export default app;