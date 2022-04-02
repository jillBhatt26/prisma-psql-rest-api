// express imports
import { Request, Response, NextFunction } from 'express';

// TODO: Add password hashing library
// TODO: Add password update functionality
// TODO: Add argon password verify library

// controllers definitions
const signUpUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {};

const fetchUser = async (req: Request, res: Response, next: NextFunction) => {};

const logoutUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {};

const updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    // NOTE: Deleting a user will also delete the user's posts
};

// exports
export { signUpUser, loginUser, fetchUser, logoutUser, updateUser, deleteUser };
