// imports
import { hash, verify } from 'argon2';

// class definition
class PasswordServices {
    public async hashPassword(password: string): Promise<string> {
        try {
            const hashedPassword: string = await hash(password, {
                timeCost: 4,
                memoryCost: 1024,
                parallelism: 1,
                hashLength: 32
            });

            return hashedPassword;
        } catch (error: any) {
            throw new Error(`Hashing password failed: ${error.message}`);
        }
    }

    public async verifyPassword(
        input: string,
        hashed: string
    ): Promise<boolean> {
        try {
            const doesMatch: boolean = await verify(hashed, input);

            return doesMatch;
        } catch (error: any) {
            throw new Error(`Hashing verification failed: ${error.message}`);
        }
    }
}

const passwordServices = new PasswordServices();

// exports
export { passwordServices as PasswordServices };
