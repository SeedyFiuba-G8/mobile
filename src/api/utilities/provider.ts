import axios from 'axios';
import { handleError, handleResponse } from './response';

const BASE_URL = 'https://127.0.0.1/api/';

const post = (
    resource: string,
    payload: JSON
): Promise<AxiosResponse<any>> => {
    return axios
        .post(`${BASE_URL}/${resource}`, payload)
        .then(handleResponse)
        .catch(handleError);
};

const get = (resource: string, params: JSON): Promise<AxiosResponse<any>> => {
    return axios
        .get(`${BASE_URL}/${resource}`, { params: params })
        .then(handleResponse)
        .catch(handleError);
};

export const apiProvider = {
    post,
    get,
};
