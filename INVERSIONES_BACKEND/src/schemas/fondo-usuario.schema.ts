import {z} from "zod";

export const FondoUsuarioSchema = z.object({
    usuario_documento: z.string().min(1, "El documento del usuario es requerido"),
    fondo_id: z.number().min(1, "El ID del fondo es requerido"),
    fecha_registro: z.date({ message: "La fecha de registro debe ser una fecha válida" }),
    num_meses: z.number().min(1, "El número de meses debe ser al menos 1"),
    inversion_inicial: z.number().min(0, "La inversión inicial debe ser un número positivo"),
})

export const FondoUsuarioUpdateSchema = z.object({
    usuario_documento: z.string().min(1, "El documento del usuario es requerido").optional(),
    fondo_id: z.number().min(1, "El ID del fondo es requerido").optional(),
    fecha_registro: z.date({ message: "La fecha de registro debe ser una fecha válida" }).optional(),
    num_meses: z.number().min(1, "El número de meses debe ser al menos 1").optional(),
    inversion_inicial: z.number().min(0, "La inversión inicial debe ser un número positivo").optional(),
})