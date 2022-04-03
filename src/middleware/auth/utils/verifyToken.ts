// imports
import * as jwt from 'jsonwebtoken';

// interfaces imports
import { IUserInfo } from '../../../controllers/users/interfaces';

// util definition
const verifyToken: Function = async (token: string): Promise<IUserInfo> => {
    try {
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

        const user: IUserInfo = {
            id: decoded.id,
            username: decoded.username,
            email: decoded.email
        };

        return user;
    } catch (error: any) {
        throw new Error('Invalid token!');
    }
};

// exports
export { verifyToken };
