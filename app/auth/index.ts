import { checkToken } from "./auth-middleware";
import jwt from 'jsonwebtoken';
const { JWTSECRET } = process.env;

export { checkToken };

export function signToken(username: string) {
    return jwt.sign({ username }, JWTSECRET as string, { expiresIn: '24h' })
}