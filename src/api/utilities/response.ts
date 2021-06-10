import { AxiosError, AxiosResponse } from 'axios';

type errorResponseType<E> = {
    statusCode: number;
    errorData?: E;
};

export function handleResponse<T>(response: AxiosResponse): T {
    // Generic http request response processing should be done here (or logging).
    if (response.data) {
        return response.data;
    }
    return response;
}

export function handleError<E>(error: AxiosError): errorResponseType<E> {
    // Generic http request response error processing should be done here (or logging).
    throw error;
}
