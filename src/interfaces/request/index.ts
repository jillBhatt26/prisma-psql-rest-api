import { Request } from 'express';
import { IUserInfo } from '../../controllers/account/interfaces';

export interface IAuthRequest extends Request {
    user?: IUserInfo;
}
