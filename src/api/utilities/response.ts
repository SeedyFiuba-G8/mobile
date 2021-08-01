import { AxiosError, AxiosResponse } from 'axios';
import { logout } from '../../session/SessionUtil';

export function handleResponse<T>(response: AxiosResponse): T {
    // Generic http request response processing should be done here (or logging).
    return response.data;
}

export function handleError(error: AxiosError, skipTokenCheck: boolean): void {
    // Generic http request response error processing should be done here (or logging).
    console.log(error.response);
    if (error.response?.data?.status === 401 && !skipTokenCheck) {
        logout();
    }
}
