import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import usuarioRoutes from "./routes/usuario.routes.js";
import rolRoutes from "./routes/rol.routes.js";

const app = express();

//middlewares
app.use(cors({
    origin: '*',
}));
app.use(express.json());

//routes
app.use(
    authRoutes,
    usuarioRoutes,
    rolRoutes
);

export default app;