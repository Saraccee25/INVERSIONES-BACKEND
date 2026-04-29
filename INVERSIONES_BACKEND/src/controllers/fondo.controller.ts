import type { Request, Response } from "express";
import { Fondo } from "../types/fondo";
import { getFondosService, createFondoService, getFondoByIdService, updateFondoService, deleteFondoService} from "../services/fondo.service";

export const getFondosController = async (req: Request, res: Response) => {
  try {
    const fondos: Fondo[] = await getFondosService();
    return res.status(200).json(fondos);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        message: "Error al obtener experiencias",
        error: error.message,
      });
    } else {
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }
};

export const createFondoController = async (req: Request, res: Response) => {
  try {
    const { nombre, tasa_mensual, monto_min } = req.body;
    await createFondoService({ nombre, tasa_mensual, monto_min });
    return res.status(201).json({ message: "Fondo creado exitosamente" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        message: "Error al crear fondo",
        error: error.message,
      });
    } else {
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }
};

export const getFondoByIdController = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const fondo = await getFondoByIdService(id);
    if (!fondo) {
      return res.status(404).json({ message: "Fondo no encontrado" });
    }
    return res.status(200).json(fondo);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        message: "Error al obtener fondo",
        error: error.message,
      });
    } else {
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }
};

export const updateFondoController = async (req: Request<{ id: string }>, res: Response) => {
  try{
    const id = parseInt(req.params.id, 10);
    await updateFondoService(id, req.body);
    return res.status(200).json({ message: "Fondo actualizado exitosamente" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        message: "Error al actualizar fondo",
        error: error.message,
      });
    } else {
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }
}

export const deleteFondoController = async (req: Request<{ id: string }>, res: Response) => {
  try{
    const id = parseInt(req.params.id, 10);
    await deleteFondoService(id);
    return res.status(200).json({ message: "Fondo eliminado exitosamente" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        message: "Error al eliminar fondo",
        error: error.message,
      });
    } else {
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }
}
  
