import { Route } from "../route";
import express from 'express';
import { UserController } from "./user-controller";

export class UserRoutes implements Route {
    constructor(private readonly userController: UserController) {

    }

    contributeRoutes(app: express.Application): void {
        app.post('/login', this.userController.login);
    }
}