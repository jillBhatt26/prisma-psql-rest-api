// express imports
import { Request, Response, NextFunction } from 'express';

// prisma imports
import { PrismaClient, User } from '@prisma/client';

// utils imports
import { createToken, hashPassword, verifyPassword } from '../../utils';

// user interfaces imports
import { IUpdateCheckUser, IUserInfo } from './interfaces';

// global interfaces imports
import { IAuthRequest } from '../../interfaces';

// constants imports
import { COOKIE_EXPIRE_TIME } from '../../constants';

// models extraction
const prisma = new PrismaClient();

// controllers definitions
const signUpUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user: User | null = await prisma.user.findFirst({
            where: {
                OR: [{ username: req.body.username }, { email: req.body.email }]
            }
        });

        if (user) {
            return next({
                status: 400,
                message: 'Username or email already exists'
            });
        }

        const hashedPassword: string = await hashPassword(req.body.password);

        const newUser: IUserInfo = await prisma.user.create({
            data: {
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword
            },
            select: {
                id: true,
                username: true,
                email: true
            }
        });

        const authToken: string = createToken(newUser);

        res.cookie('auth', authToken, {
            maxAge: COOKIE_EXPIRE_TIME,
            httpOnly: true
        });

        return res.status(201).json({ user: newUser });
    } catch (error: any) {
        return next({ status: 500, message: error.message });
    }
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user: User | null = await prisma.user.findFirst({
            where: {
                OR: [{ username: req.body.username }, { email: req.body.email }]
            }
        });

        if (!user) {
            return next({
                status: 404,
                message: 'No user found!'
            });
        }

        // TODO: Verify the password
        const doesMatch: boolean = await verifyPassword(
            user.password,
            req.body.password
        );

        if (!doesMatch) {
            return next({ status: 400, message: 'Incorrect password!' });
        }

        const { id, username, email } = user;

        const authToken: string = createToken({ id, username, email });

        // TODO: Set cookies
        res.cookie('auth', authToken, {
            maxAge: COOKIE_EXPIRE_TIME,
            httpOnly: true
        });

        // TODO: Send the login user info without the password
        return res.status(200).json({ user: { id, username, email } });
    } catch (error: any) {
        return next({ status: 500, message: error.message });
    }
};

const fetchUser = async (req: Request, res: Response, next: NextFunction) => {};

const logoutUser = async (
    req: IAuthRequest,
    res: Response,
    next: NextFunction
) => {
    if (!req.user) {
        return next({ status: 401, message: 'Unauthorized request' });
    }

    res.cookie('auth', '', { maxAge: 1, httpOnly: true });

    return res.status(200).json({ success: true });
};

const updateUser = async (
    req: IAuthRequest,
    res: Response,
    next: NextFunction
) => {
    if (!req.user) {
        return next({ status: 401, message: 'Unauthorized request' });
    }

    try {
        // check if email / username is taken
        const user: IUpdateCheckUser | null = await prisma.user.findFirst({
            where: {
                OR: [{ username: req.body.username }, { email: req.body.email }]
            },
            select: {
                email: true,
                username: true
            }
        });

        if (user) {
            if (user.email === req.body.email) {
                return next({
                    status: 400,
                    message: 'Email already exists'
                });
            }

            if (user.username === req.body.username) {
                return next({
                    status: 400,
                    message: 'Username already exists'
                });
            }
        }

        const updateUserData: {
            username?: string;
            email?: string;
            password?: string;
        } = {};

        if (req.body.password) {
            // hash the password before saving
            const hashedPassword: string = await hashPassword(
                req.body.password
            );

            updateUserData.password = hashedPassword;
        }

        if (req.body.username) {
            updateUserData.username = req.body.username;
        }

        if (req.body.email) {
            updateUserData.email = req.body.email;
        }

        const updatedUser: IUserInfo = await prisma.user.update({
            where: {
                id: Number(req.user!.id)
            },
            data: updateUserData,
            select: {
                id: true,
                username: true,
                email: true,
                updatedAt: true
            }
        });

        const authToken: string = createToken(updatedUser);

        res.cookie('auth', authToken, {
            maxAge: COOKIE_EXPIRE_TIME,
            httpOnly: true
        });

        return res.status(200).json({ user: updatedUser });
    } catch (error: any) {
        return next({ status: 500, message: error.message });
    }
};

const deleteUser = async (
    req: IAuthRequest,
    res: Response,
    next: NextFunction
) => {
    // NOTE: Deleting a user will also delete the user's posts

    if (!req.user) {
        return next({ status: 401, message: 'Unauthorized request' });
    }

    try {
        await prisma.user.delete({
            where: {
                id: Number(req.user!.id)
            }
        });

        return res.status(200).json({ success: true });
    } catch (error: any) {
        return next({ status: 500, message: error.message });
    }
};

// exports
export { signUpUser, loginUser, fetchUser, logoutUser, updateUser, deleteUser };
