import axios, { AxiosResponse } from 'axios';
import { handleError, handleResponse } from './response';

const BASE_URL = 'https://sf-tdp2-gateway-dev.herokuapp.com';

const post = async <T, E>(resource: string, payload: JSON): Promise<T> => {
    try {
        const response = await axios.post(`${BASE_URL}/${resource}`, payload);
        return handleResponse<T>(response);
    } catch (response) {
        return handleError<E>(response);
    }
};

const get = async <T, E>(resource: string, params: JSON): Promise<T> => {
    try {
        const response = await axios.get(`${BASE_URL}/${resource}`, {
            params: params,
        });
        return handleResponse(response);
    } catch (response) {
        return handleError(response);
    }
};

export const apiProvider = {
    post,
    get,
};
