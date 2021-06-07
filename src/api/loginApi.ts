import { AxiosError } from 'axios';
import { apiProvider } from './utilities/provider';

type sessionCreationResponseType = {
    id: string;
    token: string;
};

type loginResult = {
    loginSuccessful: boolean;
    response?: sessionCreationResponseType;
};

const logIn = async (
    email: string,
    password: string
): Promise<loginResult> => {
    try {
        const apiResponse =
            await apiProvider.post<sessionCreationResponseType>(
                'user/session',
                {
                    email: email,
                    password: password,
                }
            );
        console.log('Login succesful!');
        return {
            loginSuccessful: true,
            response: apiResponse,
        };
    } catch (error: AxiosError) {
        if (error.response) {
            console.log(error.response.status);
        }
        return {
            loginSuccessful: false,
        };
    }
};

export const loginApi = {
    logIn,
};
