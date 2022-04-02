// module imports
import { Request, Response, NextFunction } from 'express';
import joi, { AnySchema } from 'joi';

// utils imports
import { validateData } from '../utils';

// interfaces imports
import { IUpdateSchema } from './interfaces';

// middleware definition
const updatePostValidation = (
    req: Request,
    _: Response,
    next: NextFunction
) => {
    const schema: AnySchema<IUpdateSchema> = joi.object({
        title: joi.string().trim().min(3).max(255).allow(null),
        content: joi.string().trim().min(3).max(255).allow(null)
    });

    try {
        validateData(req.body, schema);

        return next();
    } catch (error: any) {
        return next({ status: 400, message: error.message });
    }
};

// exports
export { updatePostValidation };
