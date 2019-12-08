import { Request, Response, NextFunction } from 'express';
import { isArray } from 'util';
import boom from 'boom';
import jwt from 'jsonwebtoken'
import { DecodedToken } from './decoded-token';
const { JWTSECRET } = process.env;

export function checkToken(req: Request, res: Response, next: NextFunction) {
    const token = getTokenFromHeader(req);
    if(!token) {
        return next(boom.unauthorized('Auth token not supplied'));
    }
    jwt.verify(token, JWTSECRET as string, (err, decoded) => {
        if(err) {
            return next(boom.unauthorized(err.message));
        }
        req.params.userId = (decoded as DecodedToken).username;
        next();
    });
}

function getTokenFromHeader(req: Request) {
    const token = req.headers['x-access-token'] || req.headers['authorization'];
    const strToken: string = (isArray(token)) ? token[0] : token as string;
    if(strToken) {
        const bearer = 'Bearer ';
        return strToken.startsWith(bearer) ? strToken.slice(bearer.length, strToken.length) : strToken;
    }
    return ''; 
}
