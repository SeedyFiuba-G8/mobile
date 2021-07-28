import { apiProvider } from './utilities/provider';
import type { Response } from './utilities/provider';
import store from '../stores/MainStore';

//Responses
type postSessionApiResponse = {
    id: string;
    token: string;
};

// Payloads
type postSessionPayload = {
    email: string;
    password: string;
    expoToken: string;
};

type postFacebookSessionPayload = {
    fbToken: string;
    expoToken: string;
};

const createSession = async (
    email: string,
    password: string,
    expoToken: string
): Promise<Response<postSessionApiResponse>> => {
    const apiResponse = apiProvider.post<
        postSessionApiResponse,
        postSessionPayload
    >('users/session', {
        email: email,
        password: password,
        expoToken: expoToken,
    });
    return apiResponse;
};

const deleteSession = async (): Promise<Response<null>> => {
    const authToken = store.getState().session.token;
    const expoToken = store.getState().expoToken.expoToken;
    const apiResponse = apiProvider.del<null, null>('users/session', null, {
        headers: {
            Authorization: `Bearer ${authToken}`,
            ['expo-token']: expoToken,
        },
    });
    return apiResponse;
};

const createSessionFacebook = async (
    fbToken: string,
    expoToken: string
): Promise<Response<postSessionApiResponse>> => {
    const apiResponse = apiProvider.post<
        postSessionApiResponse,
        postFacebookSessionPayload
    >('users/session', {
        fbToken: fbToken,
        expoToken: expoToken,
    });
    return apiResponse;
};

export { createSession, createSessionFacebook, deleteSession };
