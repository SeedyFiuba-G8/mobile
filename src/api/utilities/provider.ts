import axios, { AxiosRequestConfig } from 'axios';
import { handleError, handleResponse } from './response';

const BASE_URL = 'https://sf-tdp2-gateway.herokuapp.com';

export type Response<T> =
    | {
          successful: false;
          errorMessage?: string;
          errorCode?: string;
      }
    | { successful: true; data: T };

const post = async <T, P>(
    resource: string,
    payload: P,
    options?: AxiosRequestConfig,
    skipTokenCheck = false
): Promise<Response<T>> => {
    try {
        const response = await axios.post(`${BASE_URL}/${resource}`, payload, {
            ...options,
        });
        const data = handleResponse<T>(response);
        return {
            successful: true,
            data: data,
        };
    } catch (error) {
        handleError(error, skipTokenCheck);
        return {
            successful: false,
            errorMessage: error.response.data.message,
            errorCode: error.response.data.status,
        };
    }
};

const get = async <T, P>(
    resource: string,
    params: P,
    options?: AxiosRequestConfig,
    skipTokenCheck = false
): Promise<Response<T>> => {
    try {
        const response = await axios.get(`${BASE_URL}/${resource}`, {
            params: params,
            ...options,
        });
        const data = handleResponse<T>(response);
        return {
            successful: true,
            data: data,
        };
    } catch (error) {
        handleError(error, skipTokenCheck);
        return {
            successful: false,
            errorMessage: error.response.data.message,
            errorCode: error.response.data.status,
        };
    }
};

const del = async <T, P>(
    resource: string,
    params: P,
    options?: AxiosRequestConfig,
    skipTokenCheck = false
): Promise<Response<T>> => {
    try {
        const response = await axios.delete(`${BASE_URL}/${resource}`, {
            params: params,
            ...options,
        });
        const data = handleResponse<T>(response);
        return {
            successful: true,
            data: data,
        };
    } catch (error) {
        handleError(error, skipTokenCheck);
        return {
            successful: false,
            errorMessage: error.response.data.message,
            errorCode: error.response.data.status,
        };
    }
};

const patch = async <T, P>(
    resource: string,
    payload: P,
    options?: AxiosRequestConfig,
    skipTokenCheck = false
): Promise<Response<T>> => {
    try {
        const response = await axios.patch(
            `${BASE_URL}/${resource}`,
            payload,
            {
                ...options,
            }
        );
        const data = handleResponse<T>(response);
        return {
            successful: true,
            data: data,
        };
    } catch (error) {
        handleError(error, skipTokenCheck);
        return {
            successful: false,
            errorMessage: error.response.data.message,
            errorCode: error.response.data.status,
        };
    }
};

const put = async <T, P>(
    resource: string,
    payload: P,
    options?: AxiosRequestConfig,
    skipTokenCheck = false
): Promise<Response<T>> => {
    try {
        const response = await axios.put(`${BASE_URL}/${resource}`, payload, {
            ...options,
        });
        const data = handleResponse<T>(response);
        return {
            successful: true,
            data: data,
        };
    } catch (error) {
        handleError(error, skipTokenCheck);
        return {
            successful: false,
            errorMessage: error.response.data.message,
            errorCode: error.response.data.status,
        };
    }
};
export const apiProvider = {
    post,
    get,
    patch,
    del,
    put,
};
