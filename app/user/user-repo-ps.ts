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
            `SELECT id 
            FROM users 
            WHERE id=$1`, [id]);
        return result.rows[0];
    }    
    
    public async updateUser(payload: User): Promise<User> {
        return { ...payload };
    }
}