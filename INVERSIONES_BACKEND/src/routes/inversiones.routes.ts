import {Router} from "express";
import { getInversionesController, createInversionController, getInversionByIdController, updateInversionController, deleteInversionController} from "../controllers/inversiones.controller";

const router = Router();

router.get("/", getInversionesController);
router.post("/", createInversionController);
router.get("/:id", getInversionByIdController);
router.put("/:id", updateInversionController);
router.delete("/:id", deleteInversionController);

export default router;