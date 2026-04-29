import pool from "../config/db";
import { SelectResult, MutationResult } from "../types/types";
import type { FondoUsuario } from "../types/fondo-usuario";
import { getUsuarioByDocumentoService } from "./usuario.service";

export const getFondosUsuarioService = async (): Promise<FondoUsuario[]> => {
    const query = 'SELECT * FROM fondo_usuario';
    const [rows] = await pool.query<SelectResult>(query);
    return rows as FondoUsuario[];
}

export const createFondoUsuarioService = async (fondoUsuario: Omit<FondoUsuario, "id" | "fecha_registro">): Promise<void> => {
    const usuarioExistente = await getUsuarioByDocumentoService(fondoUsuario.usuario_documento);
    if (!usuarioExistente) {
        throw new Error('El usuario con el documento proporcionado no existe');
    }
    const numMeses = fondoUsuario.num_meses || 0;
    const fechaRegistro = new Date();
    const query = 'INSERT INTO fondo_usuario (usuario_documento, fondo_id, fecha_registro, num_meses, inversion_inicial) VALUES (?, ?, ?, ?, ?)';
    const values = [fondoUsuario.usuario_documento, fondoUsuario.fondo_id, fechaRegistro, numMeses, fondoUsuario.inversion_inicial];
    await pool.query<MutationResult>(query, values);
}

export const getFondoUsuarioByIdService = async (id: number): Promise<FondoUsuario | null> => {
    const query = 'SELECT * FROM fondo_usuario WHERE id = ?';
    const [rows] = await pool.query<SelectResult>(query, [id]);
    if (rows.length === 0) {
        return null;
    }
    return rows[0] as FondoUsuario;
}


export const updateFondoUsuarioService = async (id: number, fondoUsuario: Partial<FondoUsuario>): Promise<void> => {
    const fields = [];
    const values = [];
    if (fondoUsuario.usuario_documento) {
        fields.push('usuario_documento = ?');
        values.push(fondoUsuario.usuario_documento);
    }
    if (fondoUsuario.fondo_id) {
        fields.push('fondo_id = ?');
        values.push(fondoUsuario.fondo_id);
    }

    if (fondoUsuario.fecha_registro) {
        fields.push('fecha_registro = ?');
        values.push(fondoUsuario.fecha_registro);
    }

    if (fondoUsuario.num_meses) {
        fields.push('num_meses = ?');
        values.push(fondoUsuario.num_meses);
    }

    if (fondoUsuario.inversion_inicial) {
        fields.push('inversion_inicial = ?');
        values.push(fondoUsuario.inversion_inicial);
    }

    if (fields.length === 0) {
        throw new Error('No se proporcionaron campos para actualizar');
    }

    const query = `UPDATE fondo_usuario SET ${fields.join(', ')} WHERE id = ?`;
    values.push(id);
    await pool.query<MutationResult>(query, values);

}


export const deleteFondoUsuarioService = async (id: number): Promise<void> => {
    const query = 'DELETE FROM fondo_usuario WHERE id = ?';
    await pool.query<MutationResult>(query, [id]);
}
