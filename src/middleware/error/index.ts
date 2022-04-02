// express imports
import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';
import { IError } from './interfaces';

// middleware definition
const errorHandler: ErrorRequestHandler = async (
    error: IError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    return res
        .status(error.status)
        .json({ success: false, message: error.message });
};

export { errorHandler };
