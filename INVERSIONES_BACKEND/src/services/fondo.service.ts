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
