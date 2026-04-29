import { Router } from "express";
import {getFondosUsuarioByIdController, getFondosUsuarioController, createFondoUsuarioController, updateFondoUsuarioController, deleteFondoUsuarioController} from "../controllers/fondo-usuario.controller";

const router = Router();

router.get("/", getFondosUsuarioController);
router.post("/", createFondoUsuarioController);
router.get("/:id", getFondosUsuarioByIdController);
router.put("/:id", updateFondoUsuarioController);
router.delete("/:id", deleteFondoUsuarioController);

export default router;