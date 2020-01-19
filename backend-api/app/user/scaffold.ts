import { UserRepoPS } from "./user-repo-ps";
import { hashPassword } from "./password";

export async function createUser(username = 'sam', password = 'defaultPassword') {
    const repo = new UserRepoPS();
    const hash = await hashPassword(password);
    const newUser = await repo.addUser(username, hash)
    return newUser.id;
}