import { Pool, QueryResult } from 'pg';

let pool: Pool | null;

export type Query = (queryTextOrConfig: string, values?: any[]) => Promise<QueryResult>;

export const query: Query = (text: string, params?: any[]) => {
    if (!pool) {
        pool = new Pool();
    }
    return pool.query(text, params);
}

export const dispose = async () => {
    if (pool) {
        await pool.end();
        pool = null;
    }
}