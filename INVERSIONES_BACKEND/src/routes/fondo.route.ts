import { Router } from "express";
import { getFondosController, createFondoController, getFondoByIdController, updateFondoController, deleteFondoController } from "../controllers/fondo.controller";

const router = Router();

router.get("/", getFondosController);
router.post("/", createFondoController);
router.get("/:id", getFondoByIdController);
router.put("/:id", updateFondoController);
router.delete("/:id", deleteFondoController);

export default router;
