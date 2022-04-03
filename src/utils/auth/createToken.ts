// imports
import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// interfaces imports
import { ITokenParams } from './interfaces';
import { JWT_TOKEN_EXPIRE_TIME } from '../../constants';

dotenv.config();

// util definition
const createToken: Function = (tokenParams: ITokenParams): string => {
    const token: string = jwt.sign(tokenParams, process.env.JWT_SECRET!, {
        expiresIn: JWT_TOKEN_EXPIRE_TIME
    });

    return token;
};

// exports
export { createToken };
