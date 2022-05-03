// imports
import jwt from 'jsonwebtoken';
import 'dotenv/config';

// models
import { User } from '@prisma/client';

// constants
import { JWT_TOKEN_EXPIRE_TIME } from '../../../../constants';
import { IUserInfo } from '../interfaces';

// class definition
class TokenServices {
    public signToken(user: Partial<User>): string {
        const token: string = jwt.sign(user, process.env.JWT_SECRET!, {
            expiresIn: JWT_TOKEN_EXPIRE_TIME
        });

        return token;
    }

    public verifyToken(token: string): IUserInfo {
        try {
            const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

            const user: IUserInfo = {
                id: decoded.id,
                username: decoded.username,
                email: decoded.email
            };

            return user;
        } catch (error: any) {
            throw new Error(error.message || 'Invalid token!');
        }
    }
}

// exports
const tokenServices = new TokenServices();

export { tokenServices as TokenServices };
