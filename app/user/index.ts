import { UserRepoPS } from "./user-repo-ps";
import { UserController } from "./user-controller";
import { UserRoutes } from "./user-routes";

export function getUserRoutes() {
    const repo = new UserRepoPS();
    const controller = new UserController(repo);
    return new UserRoutes(controller);
}