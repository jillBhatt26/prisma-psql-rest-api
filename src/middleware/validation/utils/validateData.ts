// options imports
import { options } from '../options';

// util definition
const validateData = (data: any, schema: any) => {
    const { error } = schema.validate(data, options);

    if (error) {
        const errors = error.details.map((error: any) => error.message);

        throw new Error(errors.join(', ').replace(/"/g, ''));
    }
};

// exports
export { validateData };
