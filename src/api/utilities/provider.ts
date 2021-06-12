import axios from 'axios';
import { handleError, handleResponse } from './response';

const BASE_URL = 'https://sf-tdp2-gateway-dev.herokuapp.com';

const post = async <T, P>(resource: string, payload: P): Promise<T> => {
    const response = await axios.post(`${BASE_URL}/${resource}`, payload);
    return handleResponse<T>(response);
};

const get = async <T>(resource: string, params: JSON): Promise<T> => {
    const response = await axios.get(`${BASE_URL}/${resource}`, {
        params: params,
    });
    return handleResponse<T>(response);
};

export const apiProvider = {
    post,
    get,
};
