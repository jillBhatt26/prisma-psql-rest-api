// imports
import { verify } from 'argon2';

// util definition
const verifyPassword: Function = async (
    hashed: string,
    input: string
): Promise<boolean> => {
    try {
        const doesMatch: boolean = await verify(hashed, input);

        return doesMatch;
    } catch (error: any) {
        throw new Error(`Hashing verification failed: ${error.message}`);
    }
};

// exports
export { verifyPassword };
