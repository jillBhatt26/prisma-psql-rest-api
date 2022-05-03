// imports
import { Response, NextFunction } from 'express';

// interfaces imports
import { IAuthRequest } from '../../interfaces';

// services
import { TokenServices } from '../../services';

// middleware definition
const authMiddleware = async (
    req: IAuthRequest,
    _: Response,
    next: NextFunction
) => {
    // extract token from cookies
    const token: string | undefined = req.cookies.auth;

    if (!token) {
        return next({ status: 401, message: 'Authentication required!' });
    }

    try {
        // verify token
        const user: IAuthRequest['user'] = TokenServices.verifyToken(token);

        // set user to request
        req.user = user;

        return next();
    } catch (error: any) {
        return next({ status: 401, message: error.message });
    }
};

// exports
export { authMiddleware };
