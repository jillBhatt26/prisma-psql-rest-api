// imports
import { IClientError, IErrorHandlerJSON } from '../interfaces';

// class definition
class ErrorHandler extends Error {
    constructor(
        public failurePoint: string,
        public message: string,
        public clientMsg: string,
        public status?: number // NOTE: Not required in 5XX status codes
    ) {
        super(message);
    }

    // NOTE: to be used in development
    public toJSON(): IErrorHandlerJSON {
        return {
            failurePoint: this.failurePoint,
            message: this.message,
            status: this.status || 500
        };
    }

    // NOTE: To be used in production
    public toClientError(): IClientError {
        return {
            status: this.status || 500,
            message: this.clientMsg
        };
    }
}

// exports

export { ErrorHandler };
