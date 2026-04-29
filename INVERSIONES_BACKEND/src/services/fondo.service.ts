import type { Fondo } from "../types/fondo";
import { SelectResult, MutationResult } from "../types/types";
import pool from "../config/db";

export async function getFondosService(): Promise<Fondo[]> {
  const [fondosEncontrados] = await pool.query<SelectResult>(
    "SELECT * FROM fondos",
  );

  if (fondosEncontrados.length === 0) {
    return [];
  }

  const fondos: Fondo[] = fondosEncontrados as Fondo[];
  return fondos;
}

export async function createFondoService(fondo: Omit<Fondo, "id">): Promise<void> {
  const { nombre, tasa_mensual, monto_min } = fondo;
  const query = "INSERT INTO fondos (nombre, tasa_mensual, monto_min) VALUES (?, ?, ?)";
  const values = [nombre, tasa_mensual, monto_min];
  await pool.query<MutationResult>(query, values);
}

export async function getFondoByIdService(id: number): Promise<Fondo | null> {
  const query = "SELECT * FROM fondos WHERE id = ?";
  const [rows] = await pool.query<SelectResult>(query, [id]);
  if (rows.length === 0) {
    return null;
  }
  return rows[0] as Fondo;
}


export const updateFondoService = async (id: number, fondo: Partial<Fondo>): Promise<void> => {
  const fields = [];
  const values = [];

  if (fondo.nombre) {
    fields.push('nombre = ?');
    values.push(fondo.nombre);
  }
  if (fondo.tasa_mensual) {
    fields.push('tasa_mensual = ?');
    values.push(fondo.tasa_mensual);
  }

  if (fondo.monto_min) {
    fields.push('monto_min = ?');
    values.push(fondo.monto_min);
  }

  if (fields.length === 0) {
    throw new Error('No se proporcionaron campos para actualizar');
  }

  const query = `UPDATE fondos SET ${fields.join(', ')} WHERE id = ?`;
  values.push(id);
  await pool.query<MutationResult>(query, values);

}

export const deleteFondoService = async (id: number): Promise<void> => {
  const query = "DELETE FROM fondos WHERE id = ?";
  await pool.query<MutationResult>(query, [id]);
}

