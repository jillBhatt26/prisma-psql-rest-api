// module imports
import { Request, Response, NextFunction } from 'express';
import joi, { AnySchema } from 'joi';

// utils imports
import { validateData } from '../utils';

// interface imports
import { ILogin } from './interfaces';

// middleware definition
const loginValidation = (req: Request, _: Response, next: NextFunction) => {
    const schema: AnySchema<ILogin> = joi
        .object({
            username: joi.string().trim().min(4).allow(null),
            email: joi.string().trim().email().allow(null),
            password: joi.string().trim().min(8).required()
        })
        .xor('username', 'email');

    try {
        validateData(req.body, schema);

        return next();
    } catch (error: any) {
        return next({ status: 400, message: error.message });
    }
};

// exports
export { loginValidation };
