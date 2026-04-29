import type { Usuario } from "../types/usuario";
import pool from "../config/db";
import { SelectResult, MutationResult } from "../types/types";

export const getUsuariosService = async (): Promise<SelectResult> => {
    const query = 'SELECT * FROM usuarios';
    const [rows] = await pool.query<SelectResult>(query);
    return rows;
}