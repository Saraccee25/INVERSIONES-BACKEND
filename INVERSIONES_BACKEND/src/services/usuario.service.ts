import type { Usuario } from "../types/usuario";
import pool from "../config/db";
import { SelectResult, MutationResult } from "../types/types";

export const getUsuariosService = async (): Promise<SelectResult> => {
    const query = 'SELECT * FROM usuario';
    const [rows] = await pool.query<SelectResult>(query);
    return rows;
}

export const createUsuarioService = async (usuario: Omit<Usuario, "cod_ref">): Promise<void> => {
    const codeRef = usuario.documento + "_" + usuario.nombre;
    if (!usuario.interes_ref){
        usuario.interes_ref = 0;
    }
    const query = 'INSERT INTO usuario (documento, nombre, apellido, correo, cod_ref, cod_usuario_ref, interes_ref) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const values = [usuario.documento, usuario.nombre, usuario.apellido, usuario.correo, codeRef, usuario.cod_usuario_ref, usuario.interes_ref];
    const [result] = await pool.query<MutationResult>(query, values);
}

export const getUsuarioByDocumentoService = async (documento: string): Promise<Usuario | null> => {
    const query = 'SELECT * FROM usuario WHERE documento = ?';
    const [rows] = await pool.query<SelectResult>(query, [documento]);
    if (rows.length === 0) {
        return null;
    }
    return {
        documento: rows[0].documento,
        nombre: rows[0].nombre,
        apellido: rows[0].apellido,
        correo: rows[0].correo,
        cod_ref: rows[0].cod_ref,
        cod_usuario_ref: rows[0].cod_usuario_ref,
        interes_ref: rows[0].interes_ref
    }
}

export const updateUsuarioService = async (documento: string, usuario: Partial<Usuario>): Promise<void> => {
    const fields = [];
    const values = [];

    if (usuario.nombre) {
        fields.push('nombre = ?');
        values.push(usuario.nombre);
    }
    if (usuario.apellido) {
        fields.push('apellido = ?');
        values.push(usuario.apellido);
    }
    if (usuario.correo) {
        fields.push('correo = ?');
        values.push(usuario.correo);
    }

    if (usuario.cod_usuario_ref) {
        fields.push('cod_usuario_ref = ?');
        values.push(usuario.cod_usuario_ref);
    }

    if (usuario.interes_ref) {
        fields.push('interes_ref = ?');
        values.push(usuario.interes_ref);
    }

    if (fields.length === 0) {
        throw new Error('No se proporcionaron campos para actualizar');
    }

    const query = `UPDATE usuario SET ${fields.join(', ')} WHERE documento = ?`;
    values.push(documento);
    await pool.query(query, values);
}
