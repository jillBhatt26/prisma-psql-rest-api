// module imports
import { Request, Response, NextFunction } from 'express';
import joi, { AnySchema } from 'joi';

// utils imports
import { validateData } from '../utils';

// interface imports
import { ISignup } from './interfaces';

// middleware definition
const signupValidation = (req: Request, _: Response, next: NextFunction) => {
    const schema: AnySchema<ISignup> = joi.object({
        username: joi.string().trim().min(4).required(),
        email: joi.string().trim().email().required(),
        password: joi.string().trim().min(8).required()
    });

    try {
        validateData(req.body, schema);

        return next();
    } catch (error: any) {
        return next({ status: 400, message: error.message });
    }
};

// exports
export { signupValidation };
