// express imports
import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';
import { ErrorHandler, IClientError, IErrorHandlerJSON } from '../../utils';
import 'dotenv/config';

const errorHandler: ErrorRequestHandler = async (
    err: ErrorHandler,
    _: Request,
    res: Response,
    __: NextFunction
) => {
    const errorHandler: ErrorHandler = new ErrorHandler(
        err.failurePoint,
        err.message,
        err.clientMsg,
        err.status
    );

    if (process.env.NODE_ENV!.toLowerCase() === 'development') {
        const error: IErrorHandlerJSON = errorHandler.toJSON();
        return res.status(error.status).json({ error });
    }

    const error: IClientError = errorHandler.toClientError();

    return res.status(error.status).json({ error });
};

export { errorHandler };
