import { RowDataPacket, ResultSetHeader } from 'mysql2';

export type SelectResult = (RowDataPacket & Record<string, any>)[];
export type MutationResult = ResultSetHeader;