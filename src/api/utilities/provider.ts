import axios, { AxiosRequestConfig } from 'axios';
import { handleError, handleResponse } from './response';

const BASE_URL = 'https://sf-tdp2-gateway-dev.herokuapp.com';

const post = async <T, P>(
    resource: string,
    payload: P,
    options?: AxiosRequestConfig
): Promise<T> => {
    const response = await axios.post(`${BASE_URL}/${resource}`, payload, {
        ...options,
    });
    return handleResponse<T>(response);
};

const get = async <T, P>(
    resource: string,
    params: P,
    options?: AxiosRequestConfig
): Promise<T> => {
    const response = await axios.get(`${BASE_URL}/${resource}`, {
        params: params,
        ...options,
    });
    return handleResponse<T>(response);
};

export const apiProvider = {
    post,
    get,
};
