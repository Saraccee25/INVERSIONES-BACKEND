import { Router } from "express";
import { getFondosUsuarioByIdController, getFondosUsuarioController, createFondoUsuarioController, updateFondoUsuarioController, deleteFondoUsuarioController, getFondoUsuarioByDocumentoController, simularRendimientoFondoUsuarioController } from "../controllers/fondo-usuario.controller";

const router = Router();

router.get("/", getFondosUsuarioController);
router.post("/", createFondoUsuarioController);
router.get("/usuario/:usuario_documento", getFondoUsuarioByDocumentoController);
router.get("/:id", getFondosUsuarioByIdController);
router.put("/:id", updateFondoUsuarioController);
router.delete("/:id", deleteFondoUsuarioController);
router.get("/simular/:id", simularRendimientoFondoUsuarioController);
export default router;