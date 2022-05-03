// express imports
import { Request, Response, NextFunction } from 'express';

// prisma imports
import { User } from '@prisma/client';

// global interfaces imports
import { IAuthRequest } from '../../interfaces';

// constants imports
import { COOKIE_EXPIRE_TIME } from '../../constants';

// services
import { AccountServices, TokenServices } from '../../services';

// class definition
class AccountControllers {
    public async signUpUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { username, email, password } = req.body;

            const newUser: Partial<User> = await AccountServices.signup(
                username,
                email,
                password
            );

            // generate the token
            const token: string = TokenServices.signToken(newUser);

            // send the token as cookie
            res.cookie('auth', token, {
                maxAge: COOKIE_EXPIRE_TIME,
                httpOnly: true
            });

            // send user response
            return res.status(201).json({ user: newUser });
        } catch (error: any) {
            return next({
                status: error.status || 500,
                message: error.message
            });
        }
    }

    public async loginUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { username, email, password } = req.body;

            // Verify credentials and fetch user
            const user: Partial<User> = await AccountServices.login(
                username,
                email,
                password
            );

            // generate the token
            const token: string = TokenServices.signToken(user);

            // send the token as cookie
            res.cookie('auth', token, {
                maxAge: COOKIE_EXPIRE_TIME,
                httpOnly: true
            });

            // send user response
            return res.status(200).json({ user: user });
        } catch (error: any) {
            return next({
                status: error.status || 500,
                message: error.message
            });
        }
    }

    public logoutUser(req: IAuthRequest, res: Response, next: NextFunction) {
        if (!req.user) {
            return next({ status: 401, message: 'Unauthorized request' });
        }

        res.cookie('auth', '', { maxAge: 1, httpOnly: true });

        return res.status(200).json({ success: true });
    }

    public async fetchUser(
        req: IAuthRequest,
        res: Response,
        next: NextFunction
    ) {
        if (!req.user) {
            return next({ status: 401, message: 'Unauthorized request' });
        }

        try {
            const user: Partial<User> = await AccountServices.fetch(
                Number(req.user!.id)
            );

            return res.status(200).json({ user });
        } catch (error: any) {
            return next({ status: 500, message: error.message });
        }
    }

    public async updateUser(
        req: IAuthRequest,
        res: Response,
        next: NextFunction
    ) {
        if (!req.user) {
            return next({ status: 401, message: 'Unauthorized request' });
        }

        try {
            const updateInfo: Partial<User> = {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            };

            const updatedUser: Partial<User> = await AccountServices.update(
                Number(req.user!.id),
                updateInfo
            );

            // generate the token
            const token: string = TokenServices.signToken(updatedUser);

            // send the token as cookie
            res.cookie('auth', token, {
                maxAge: COOKIE_EXPIRE_TIME,
                httpOnly: true
            });

            // send user response
            return res.status(200).json({ user: updatedUser });
        } catch (error: any) {
            return next({
                status: error.status || 500,
                message: error.message
            });
        }
    }

    public async deleteUser(
        req: IAuthRequest,
        res: Response,
        next: NextFunction
    ) {
        if (!req.user) {
            return next({ status: 401, message: 'Unauthorized request' });
        }

        try {
            const success: boolean = await AccountServices.delete(
                Number(req.user!.id)
            );

            return res.status(200).json({ success });
        } catch (error: any) {
            return next({
                status: error.status || 500,
                message: error.message
            });
        }
    }
}

const accountControllers = new AccountControllers();

export { accountControllers as AccountControllers };
