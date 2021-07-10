import { apiProvider } from './utilities/provider';
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

type GetProfileApiRespose = Profile;

const getProfile = async (userId: string): Promise<GetProfileApiRespose> => {
    const authToken = store.getState().session.token;
    const apiResponse = apiProvider.get<GetProfileApiRespose, null>(
        `users/${userId}`,
        null,
        { headers: { Authorization: `Bearer ${authToken}` } }
    );
    console.log(apiResponse);
    return apiResponse;
};

export { getProfile };
