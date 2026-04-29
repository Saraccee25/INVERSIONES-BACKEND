export interface Usuario {
  documento: string;
  nombre: string;
  apellido: string;
  correo: string;
  cod_ref: string;
  cod_usuario_ref: string;
  interes_ref?: number;
}