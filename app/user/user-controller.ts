import { Request, Response, NextFunction } from "express";
import { UserRepo } from "./user-repo";

export class UserController {
    constructor(private readonly repo: UserRepo) {

    }

    getUser = async(req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await this.repo.getUser(req.params.id);
            res.json(user);
        } catch (e) {
            next(e);
        }
    }

    updateUser = async(req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await this.repo.updateUser(req.body);
            res.json(user);
        } catch (e) {
            next(e);
        }
    }
}