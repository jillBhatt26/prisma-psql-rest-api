// module imports
import { Request, Response, NextFunction } from 'express';
import joi, { AnySchema } from 'joi';

// utils imports
import { validateData } from '../utils';

// interface imports
import { IUpdateUserData } from './interfaces';

// middleware definition
const updateValidation = (req: Request, _: Response, next: NextFunction) => {
    const schema: AnySchema<IUpdateUserData> = joi.object({
        username: joi.string().trim().min(4).allow(null),
        email: joi.string().trim().email().allow(null),
        password: joi.string().trim().min(8).allow(null)
    });

    try {
        validateData(req.body, schema);

        return next();
    } catch (error: any) {
        return next({ status: 400, message: error.message });
    }
};

// exports
export { updateValidation };
