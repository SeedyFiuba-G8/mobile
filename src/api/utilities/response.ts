import { AxiosError, AxiosResponse } from 'axios';

type errorResponseType = {
    statusCode: number;
    errorData: any;
};

export function handleResponse<T>(response: AxiosResponse): T {
    // Generic http request response processing should be done here (or logging).
    return response.data;
}

export function handleError(error: AxiosError): errorResponseType {
    // Generic http request response error processing should be done here (or logging).
    throw error;
}
