import { UserRepo } from "./user-repo";
import { User } from "./user";
import { query } from "../db";

export class UserRepoPS implements UserRepo {
    public async addUser(id: string): Promise<User> {
        const user = await query(
            `INSERT INTO users (id) 
            VALUES ($1) 
            RETURNING *`, [id]);
        return user.rows[0];
    }

    public async getUser(id: string): Promise<User> {
        const result = await query(
            `SELECT id, default_list_id 
            FROM users 
            WHERE id=$1`, [id]);
        return result.rows[0];
    }    
    
    public async updateUser(payload: User): Promise<User> {
        const result = await query(
            `UPDATE users 
            SET default_list_id=$2
            WHERE id=$1 
            RETURNING id, default_list_id`, [payload.id, payload.default_list_id]);
        return result.rows[0];
    }
}