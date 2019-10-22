import { UserRepoPS } from "./user-repo-ps";

export async function createDefaultUser() {
    const repo = new UserRepoPS();
    const newUser = await repo.addUser('sam', 'defaultPassword')
    return newUser.id;
}