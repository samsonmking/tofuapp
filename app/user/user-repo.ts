import { User } from "./user";

export interface UserRepo {
    addUser(id: string): Promise<User>;
    getUser(id: string): Promise<User>;
    updateUser(payload: User): Promise<User>;
}