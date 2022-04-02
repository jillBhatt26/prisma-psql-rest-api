// imports
import { Request, Response, NextFunction } from 'express';
import joi, { AnySchema } from 'joi';

// utils imports
import { validateData } from '../utils';

// interfaces imports
import { IPostParams } from './interfaces';

// middleware definition
const validatePostParams = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const schema: AnySchema<IPostParams> = joi.object({
        id: joi.string().trim().required()
    });

    try {
        validateData(req.params, schema);

        return next();
    } catch (error: any) {
        return next({ status: 400, message: error.message });
    }
};

// exports
export { validatePostParams };
