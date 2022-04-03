// imports
import { hash } from 'argon2';

// util definition
const hashPassword: Function = async (password: string): Promise<string> => {
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
};

// exports
export { hashPassword };
