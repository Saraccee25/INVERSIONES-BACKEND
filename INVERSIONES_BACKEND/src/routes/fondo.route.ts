import { Router } from "express";
import { getFondosController } from "../controllers/fondo.controller";

const router = Router();

router.get("/", getFondosController);

export default router;
