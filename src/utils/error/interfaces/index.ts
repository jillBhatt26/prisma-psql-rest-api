export interface IErrorHandlerJSON {
    failurePoint: string;
    message: string;
    status: number;
}

export interface IClientError {
    status: number;
    message: string;
}
