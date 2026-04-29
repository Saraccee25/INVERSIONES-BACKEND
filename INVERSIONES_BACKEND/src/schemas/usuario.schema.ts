import {z} from "zod";

export const UsuarioSchema = z.object({
    documento: z.string().min(1, "El documento es requerido"),
    nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    apellido: z.string().min(2, "El apellido debe tener al menos 2 caracteres"),
    correo: z.string().email("El correo no es válido"),
    cod_ref: z.string().min(1, "El código de referencia es requerido").optional(),
    cod_usuario_ref: z.string().min(1, "El código de usuario de referencia es requerido").optional(),
    interes_ref: z.number().min(0, "El interés debe ser un número positivo"),
})

export const UsuarioUpdateSchema = z.object({
    documento: z.string().min(1, "El documento es requerido"),
    nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres").optional(),
    apellido: z.string().min(2, "El apellido debe tener al menos 2 caracteres").optional(),
    correo: z.string().email("El correo no es válido").optional(),
    cod_ref: z.string().min(1, "El código de referencia es requerido").optional(),
    cod_usuario_ref: z.string().min(1, "El código de usuario de referencia es requerido").optional(),
    interes_ref: z.number().min(0, "El interés debe ser un número positivo").optional(),
})

