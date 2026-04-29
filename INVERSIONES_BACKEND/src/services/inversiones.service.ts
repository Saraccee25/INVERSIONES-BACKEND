import pool from "../config/db";
import { SelectResult, MutationResult } from "../types/types";
import type { Inversion } from "../types/inversiones";

export const getInversionesService = async (): Promise<Inversion[]> => {
    const query = 'SELECT * FROM inversiones';
    const [rows] = await pool.query<SelectResult>(query);
    return rows as Inversion[];
}
 export const createInversionService = async (inversion: Omit<Inversion, "id">): Promise<void> => {
    const query = 'INSERT INTO inversiones (inversion, fondo_usuario_id) VALUES (?, ?)';
    const values = [inversion.inversion, inversion.fondo_usuario_id];
    await pool.query<MutationResult>(query, values);
}

export const getInversionByIdService = async (id: number): Promise<Inversion | null> => {
    const query = 'SELECT * FROM inversiones WHERE id = ?';
    const [rows] = await pool.query<SelectResult>(query, [id]);
    if (rows.length === 0) {
        return null;
    }
    return rows[0] as Inversion;
}

export const updateInversionService = async (id: number, inversion: Partial<Inversion>): Promise<void> => {
    const fields = [];
    const values = [];
    if (inversion.inversion) {
        fields.push('inversion = ?');
        values.push(inversion.inversion);
    }
    if (inversion.fondo_usuario_id) {
        fields.push('fondo_usuario_id = ?');
        values.push(inversion.fondo_usuario_id);
    }
    
    if (fields.length === 0) {
        throw new Error('No se proporcionaron campos para actualizar');
    }
    const query = `UPDATE inversiones SET ${fields.join(', ')} WHERE id = ?`;
    values.push(id);
    await pool.query<MutationResult>(query, values);
}


export const deleteInversionService = async (id: number): Promise<void> => {
    const query = 'DELETE FROM inversiones WHERE id = ?';
    await pool.query<MutationResult>(query, [id]);
}