import jwt from 'jsonwebtoken';

export function createToken (username: string) {
    const { JWTSECRET } = process.env;
    return jwt.sign({ username }, JWTSECRET as string, { expiresIn: '1h' })
}