import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import fondoRoutes from "./routes/fondo.route";
import usuarioRoutes from "./routes/usuario.routes";
//import inversionesRoutes from "./routes/inversiones.routes";
import fondoUsuarioRoutes from "./routes/fondo-usuario.routes";

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);

app.use(express.json());
app.use("/fondos", fondoRoutes);
app.use("/usuarios", usuarioRoutes);
//app.use("/inversiones", inversionesRoutes);
app.use("/fondos-usuario", fondoUsuarioRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    message: "Not found",
  });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
});

export default app;
