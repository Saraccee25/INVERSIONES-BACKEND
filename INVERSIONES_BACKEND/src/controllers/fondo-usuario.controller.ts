import {Request, Response} from "express";
import {getFondoUsuarioByIdService, getFondosUsuarioService, createFondoUsuarioService, deleteFondoUsuarioService, updateFondoUsuarioService} from "../services/fondo-usuario.service";
import type { FondoUsuario } from "../types/fondo-usuario";

export const getFondosUsuarioController = async (_req: Request, res: Response) => {
    try{
        const fondosUsuario: FondoUsuario[] = await getFondosUsuarioService();
        res.status(200).json(fondosUsuario);
    }catch(error){
        if (error instanceof Error) {
            res.status(500).json({
                message: "Error al obtener fondos de usuario",
                error: error.message,
            });
        } else {
            res.status(500).json({ message: "Error interno del servidor" });
        }
    }
}


export const getFondosUsuarioByIdController = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        const fondoUsuario = await getFondoUsuarioByIdService(id);
        if (!fondoUsuario) {
            return res.status(404).json({ message: "Fondo de usuario no encontrado" });
        }
        return res.status(200).json(fondoUsuario);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: "Error al obtener fondo de usuario",
                error: error.message,
            });
        } else {
            res.status(500).json({ message: "Error interno del servidor" });
        }
    }
}


export const createFondoUsuarioController = async (req: Request, res: Response) => {
    try {
        const { usuario_documento, fondo_id, fecha_registro, num_meses, inversion_inicial } = req.body;
        await createFondoUsuarioService({ usuario_documento, fondo_id, num_meses, inversion_inicial });
        return res.status(201).json({ message: "Fondo de usuario creado exitosamente" });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: "Error al crear fondo de usuario",
                error: error.message,
            });
        }
        else {
            res.status(500).json({ message: "Error interno del servidor" });
        }
    }
}

export const deleteFondoUsuarioController = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        await deleteFondoUsuarioService(id);
        return res.status(200).json({ message: "Fondo de usuario eliminado exitosamente" });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: "Error al eliminar fondo de usuario",
                error: error.message,
            });
        } else {
            res.status(500).json({ message: "Error interno del servidor" });
        }
    }
}

export const updateFondoUsuarioController = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        const { usuario_documento, fondo_id, fecha_registro, num_meses, inversion_inicial } = req.body;
        await updateFondoUsuarioService(id, { usuario_documento, fondo_id, fecha_registro, num_meses, inversion_inicial });
        return res.status(200).json({ message: "Fondo de usuario actualizado exitosamente" });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: "Error al actualizar fondo de usuario",
                error: error.message,
            });
        } else {
            res.status(500).json({ message: "Error interno del servidor" });
        }
    }
}

