import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export function createToken (username: string) {
    const { JWTSECRET } = process.env;
    return jwt.sign({ username }, JWTSECRET as string, { expiresIn: '1h' })
}

export function dummyCheckToken(user: string) {
    return async (req: Request, res: Response, next: NextFunction) => {
        req.params.userId = user;
        next();
    }
}