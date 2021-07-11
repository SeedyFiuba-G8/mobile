import { apiProvider } from './utilities/provider';
import type { Response } from './utilities/provider';

import store from '../stores/MainStore';

export type Profile = {
    firstName: string;
    lastName: string;
    banned: boolean;
    signupDate: string;
    profilePicUrl: string;
    country: string;
    city: string;
    interests: Array<string>;
};

// Resposes
type GetProfileApiRespose = Profile;

// Payload
export type UpdateProfilePayload = {
    city?: string;
    country?: string;
    interests?: string[];
    profilePicUrl?: string;
};

const getProfile = async (
    userId: string
): Promise<Response<GetProfileApiRespose>> => {
    const authToken = store.getState().session.token;
    const apiResponse = apiProvider.get<GetProfileApiRespose, null>(
        `users/${userId}`,
        null,
        { headers: { Authorization: `Bearer ${authToken}` } }
    );
    console.log(apiResponse);
    return apiResponse;
};

const updateProfile = async (
    userId: string,
    payload: UpdateProfilePayload
): Promise<Response<null>> => {
    const authToken = store.getState().session.token;

    const apiResponse = apiProvider.patch<null, UpdateProfilePayload>(
        `users/${userId}`,
        payload,
        { headers: { Authorization: `Bearer ${authToken}` } }
    );
    console.log(apiResponse);
    return apiResponse;
};

export { getProfile, updateProfile };
