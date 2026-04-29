import {z} from "zod";

export const createInversionSchema = z.object({
    inversion: z.number().min(0, "La inversión debe ser un número positivo"),
    fondo_usuario_id: z.number().min(1, "El ID del fondo de usuario es requerido"),
})

export const updateInversionSchema = z.object({
    inversion: z.number().min(0, "La inversión debe ser un número positivo").optional(),
    fondo_usuario_id: z.number().min(1, "El ID del fondo de usuario es requerido").optional(),
})