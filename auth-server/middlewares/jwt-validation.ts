import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

interface JWTPayLoad {
    id: number;
    first_name: string;
    last_name: string;
};

export const validateJWT = (req: Request, res: Response, next: NextFunction) => {

    const token = req.header('x-token');

    if(!token) return res.status(401).json({msg: 'There is required'});

    try {

        // If there is no secret seed we can send a empty string to get failed
        const seed = process.env.SECRET_JWT_SEED || '';

        const payload = jwt.verify(token, seed) as JWTPayLoad;

        req.id = payload.id;
        req.first_name = payload.first_name;
        req.last_name = payload.last_name;

    } catch (error) {
        // If it can't read the token 
        return res.status(401).json({
            msg: 'Token is not valid'
        })
    }

    next();
}