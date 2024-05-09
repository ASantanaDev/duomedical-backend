import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";

const app = express();

//middlewares
app.use(cors({
    origin: '*',
}));
app.use(express.json());

//routes
app.use(
    authRoutes,
);

export default app;