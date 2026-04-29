import type { Request, Response } from "express";
import { Fondo } from "../types/fondo";
import { getFondosService } from "../services/fondo.service";

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
