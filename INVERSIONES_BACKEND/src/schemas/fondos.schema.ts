import {z} from "zod";

export const FondoSchema = z.object({
    nombre: z.string().min(1, "El nombre del fondo es requerido"),
    descripcion: z.string().min(1, "La descripción del fondo es requerida"),
    rentabilidad: z.number().min(0, "La rentabilidad debe ser un número positivo"),
    riesgo: z.enum(["Bajo", "Medio", "Alto"], { message: "El riesgo debe ser 'Bajo', 'Medio' o 'Alto'" }),
})

export const FondoUpdateSchema = z.object({
    nombre: z.string().min(1, "El nombre del fondo es requerido").optional(),
    descripcion: z.string().min(1, "La descripción del fondo es requerida").optional(),
    rentabilidad: z.number().min(0, "La rentabilidad debe ser un número positivo").optional(),
    riesgo: z.enum(["Bajo", "Medio", "Alto"], { message: "El riesgo debe ser 'Bajo', 'Medio' o 'Alto'" }).optional(),
})