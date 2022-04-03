import { Request } from 'express';
import { IUserInfo } from '../../controllers/users/interfaces';

export interface IAuthRequest extends Request {
    user?: IUserInfo;
}
