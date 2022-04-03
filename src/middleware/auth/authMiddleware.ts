// imports
import { Request, Response, NextFunction } from 'express';

// utils imports
import { verifyToken } from './utils';

// interfaces imports
import { IAuthRequest } from '../../interfaces';

// middleware definition
const authMiddleware = async (
    req: IAuthRequest,
    _: Response,
    next: NextFunction
) => {
    // extract token from cookies
    const token: string | undefined = req.cookies.auth;

    if (!token) {
        return next({ status: 401, message: 'No token provided!' });
    }

    try {
        // verify token
        const user: IAuthRequest['user'] = await verifyToken(token);

        // set user to request
        req.user = user;

        return next();
    } catch (error: any) {
        return next({ status: 401, message: error.message });
    }
};

// exports
export { authMiddleware };
