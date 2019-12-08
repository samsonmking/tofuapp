import { UserRepoPS } from "./user-repo-ps";

export async function createUser(username = 'sam', password = 'defaultPassword') {
    const repo = new UserRepoPS();
    const newUser = await repo.addUser(username, password)
    return newUser.id;
}