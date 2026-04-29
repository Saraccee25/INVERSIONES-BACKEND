import {Request, Response} from "express";
import { Inversion } from "../types/inversiones";
import { createInversionSchema } from "../schemas/inversiones.schema";
import { getInversionesService, createInversionService, getInversionByIdService, updateInversionService, deleteInversionService} from "../services/inversiones.service";

export const getInversionesController = async (req: Request, res: Response) => {
    try {
        const inversiones: Inversion[] = await getInversionesService();
        return res.status(200).json(inversiones);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: "Error al obtener inversiones",
                error: error.message,
            });
        } else {
            res.status(500).json({ message: "Error interno del servidor" });
        }
    }
};

export const createInversionController = async (req: Request, res: Response) => {
    try {
        const validation = createInversionSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({
                message: "Datos de inversión inválidos",
                errors: validation.error.flatten().fieldErrors,
            });
        }
        const inversion = await createInversionService(req.body);
        return res.status(201).json({ message: "Inversión creada exitosamente" });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: "Error al crear inversión",
                error: error.message,
            });
        } else {
            res.status(500).json({ message: "Error interno del servidor" });
        }
    }
}

export const getInversionByIdController = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        const inversion = await getInversionByIdService(id);
        if (!inversion) {
            return res.status(404).json({ message: "Inversión no encontrada" });
        }
        return res.status(200).json(inversion);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: "Error al obtener inversión",
                error: error.message,
            });
        } else {
            res.status(500).json({ message: "Error interno del servidor" });
        }
    }
};


export const updateInversionController = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        await updateInversionService(id, req.body);
        return res.status(200).json({ message: "Inversión actualizada exitosamente" });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: "Error al actualizar inversión",
                error: error.message,
            });
        } else {
            res.status(500).json({ message: "Error interno del servidor" });
        }
    }
}

export const deleteInversionController = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        await deleteInversionService(id);
        return res.status(200).json({ message: "Inversión eliminada exitosamente" });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: "Error al eliminar inversión",
                error: error.message,
            });
        }
            else {
            res.status(500).json({ message: "Error interno del servidor" });
        }
    }
}
