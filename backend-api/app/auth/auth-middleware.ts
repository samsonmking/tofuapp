import { Request, Response, NextFunction } from 'express';
import { isArray } from 'util';
import boom from 'boom';
import * as admin from 'firebase-admin';

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: "https://tofu-app-fb.firebaseio.com"
});

export async function checkToken(req: Request, res: Response, next: NextFunction) {
    const token = getTokenFromHeader(req);

    try {
        const user = await admin.auth().verifyIdToken(token);
        req.params.userId = user.uid;
        next();
        if (!token) {
            return next(boom.unauthorized('Auth token not supplied'));
        }
    } catch (ex) {
        next(boom.unauthorized(ex.message))
    }
}

function getTokenFromHeader(req: Request) {
    const token = req.headers['x-access-token'] || req.headers['authorization'];
    const strToken: string = (isArray(token)) ? token[0] : token as string;
    if (strToken) {
        const bearer = 'Bearer ';
        return strToken.startsWith(bearer) ? strToken.slice(bearer.length, strToken.length) : strToken;
    }
    return '';
}
