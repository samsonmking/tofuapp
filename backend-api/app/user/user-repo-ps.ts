import { UserRepo } from "./user-repo";
import { User } from "./user";
import { query } from "../db";

export class UserRepoPS implements UserRepo {
    public async addUser(id: string, password: string): Promise<User> {
        const user = await query(
            `INSERT INTO users (id, password) 
            VALUES ($1, $2) 
            RETURNING *`, [id, password]);
        return user.rows[0];
    }

    public async getUser(id: string): Promise<User> {
        const result = await query(
            `SELECT id, password 
            FROM users 
            WHERE id=$1`, [id]);
        return result.rows[0];
    }    
    
    public async updateUser(payload: User): Promise<User> {
        const user = await query(
            `UPDATE users
            SET id=$1, password=$2
            WHERE id=$1
            RETURNING *`
        );
        return user.rows[0];
    }
}