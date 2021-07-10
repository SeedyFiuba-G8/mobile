import { apiProvider } from './utilities/provider';
import type { Response } from './utilities/provider';

//Responses
type postSessionApiResponse = {
    id: string;
    token: string;
};

// Payloads
type postSessionPayload = {
    email: string;
    password: string;
};

type postFacebookSessionPayload = {
    fbToken: string;
};

const createSession = async (
    email: string,
    password: string
): Promise<Response<postSessionApiResponse>> => {
    const apiResponse = apiProvider.post<
        postSessionApiResponse,
        postSessionPayload
    >('users/session', {
        email: email,
        password: password,
    });
    return apiResponse;
};

const createSessionFacebook = async (
    fbToken: string
): Promise<Response<postSessionApiResponse>> => {
    const apiResponse = apiProvider.post<
        postSessionApiResponse,
        postFacebookSessionPayload
    >('users/session', {
        fbToken: fbToken,
    });
    return apiResponse;
};

export { createSession, createSessionFacebook };
