// imports
import { Prisma, PrismaClient, User } from '@prisma/client';
import { PasswordServices } from '../../password';

// class definition
class AccountServices {
    private prisma: PrismaClient<
        Prisma.PrismaClientOptions,
        never,
        Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
    > = new PrismaClient();

    public async signup(username: string, email: string, password: string) {
        try {
            const user: User | null = await this.prisma.user.findFirst({
                where: {
                    OR: [{ username }, { email }]
                }
            });

            if (user) {
                throw new Error('Username or email already exists');
            }

            const hashedPassword: string = await PasswordServices.hashPassword(
                password
            );

            const newUser: Partial<User> = await this.prisma.user.create({
                data: {
                    username,
                    email,
                    password: hashedPassword
                },
                select: {
                    id: true,
                    username: true,
                    email: true
                }
            });

            return newUser;
        } catch (error: any) {
            throw new Error(error.message || 'Error while creating user');
        }
    }

    public async login(
        username: string,
        email: string,
        password: string
    ): Promise<Partial<User>> {
        try {
            const user: User | null = await this.prisma.user.findFirst({
                where: {
                    OR: [{ username }, { email }]
                }
            });

            if (!user) {
                throw new Error('User not found');
            }

            const doPasswordsMatch: boolean =
                await PasswordServices.verifyPassword(password, user.password);

            if (!doPasswordsMatch) {
                throw new Error('Invalid password');
            }

            return {
                id: user.id,
                username: user.username,
                email: user.email
            };
        } catch (error: any) {
            throw new Error(error.message || 'Error while logging in');
        }
    }

    public async fetch(userID: number): Promise<Partial<User>> {
        try {
            const user: Partial<User> | null = await this.prisma.user.findFirst(
                {
                    where: {
                        id: userID
                    },

                    select: {
                        id: true,
                        username: true,
                        email: true
                    }
                }
            );

            if (!user) {
                throw new Error('User not found');
            }

            return user;
        } catch (error: any) {
            throw new Error(error.message || 'Error while fetching users');
        }
    }

    public async update(
        userID: number,
        updateInfo: Partial<User>
    ): Promise<Partial<User>> {
        try {
            const { username, email, password } = updateInfo;

            // check if email / username is taken
            const user: Partial<User> | null = await this.prisma.user.findFirst(
                {
                    where: {
                        OR: [{ username }, { email }]
                    },
                    select: {
                        email: true,
                        username: true
                    }
                }
            );

            if (user) {
                if (user.email === email) {
                    throw new Error('Email already exists');
                }

                if (user.username === username) {
                    throw new Error('Username already exists');
                }
            }

            const updateUserData: {
                username?: string;
                email?: string;
                password?: string;
            } = {};

            if (password) {
                // hash the password before saving
                const hashedPassword: string =
                    await PasswordServices.hashPassword(password);

                updateUserData.password = hashedPassword;
            }

            if (username) {
                updateUserData.username = username;
            }

            if (email) {
                updateUserData.email = email;
            }

            const updatedUser: Partial<User> = await this.prisma.user.update({
                where: {
                    id: Number(userID)
                },
                data: updateUserData,
                select: {
                    id: true,
                    username: true,
                    email: true,
                    updatedAt: true
                }
            });

            return updatedUser;
        } catch (error: any) {
            throw new Error(error.message || 'Error while updating user');
        }
    }

    public async delete(userID: number): Promise<boolean> {
        try {
            await this.prisma.user.delete({
                where: {
                    id: userID
                }
            });

            return true;
        } catch (error: any) {
            throw new Error(error.message || 'Error while deleting user');
        }
    }
}

// exports
const accountServices = new AccountServices();

export { accountServices as AccountServices };
