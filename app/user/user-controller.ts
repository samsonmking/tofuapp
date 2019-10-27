import { Request, Response, NextFunction } from "express";
import { UserRepo } from "./user-repo";
import boom from 'boom';
import { signToken } from "../auth";

export class UserController {
    constructor(private readonly repo: UserRepo) {

    }

    getUser = async(req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await this.repo.getUser(req.params.userId);
            res.json({ id: user.id });
        } catch (e) {
            next(e);
        }
    }

    updateUser = async(req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await this.repo.updateUser(req.body);
            res.json({ id: user.id });
        } catch (e) {
            next(e);
        }
    }

    login = async(req: Request, res: Response, next: NextFunction) => {
        try {
            const username = req.body.username;
            const password = req.body.password;

            if(username && password) {
                const user = await this.repo.getUser(username);
                if (user.password === password) {
                    const token = signToken(username);
                    res.json({ 
                        user: { id: user.id },
                        auth: { token }
                    });
                } else {
                    next(boom.unauthorized('Incorrect password'));
                }
            } else {
                next(boom.unauthorized('Login failed'));
            }
        } catch (e) {
            next(e);
        }
    }
}