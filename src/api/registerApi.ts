import { apiProvider } from './utilities/provider';
import type { Response } from './utilities/provider';

//Responses
type registerApiResponse = Record<string, never>;

//Payload
type registerApiPayload = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
};
const register = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string
): Promise<Response<registerApiResponse>> => {
    const apiResponse = apiProvider.post<
        registerApiResponse,
        registerApiPayload
    >('users', {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
    });
    console.log('Registered successfully!');
    return apiResponse;
};

export { register };
