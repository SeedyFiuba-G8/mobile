import { apiProvider } from './utilities/provider';
type sessionCreationResponseType = {
    id: string;
    token: string;
};

type loginResult =
    | {
          loginSuccessful: false;
      }
    | {
          loginSuccessful: true;
          response: sessionCreationResponseType;
      };

type sessionCreationPayloadType = {
    email: string;
    password: string;
};

type facebookSessionCreationPayloadType = {
    fbToken: string;
};
const createSession = async (
    email: string,
    password: string
): Promise<loginResult> => {
    try {
        const apiResponse = await apiProvider.post<
            sessionCreationResponseType,
            sessionCreationPayloadType
        >('users/session', {
            email: email,
            password: password,
        });
        console.log('Login succesful!');
        return {
            loginSuccessful: true,
            response: apiResponse,
        };
    } catch (error) {
        if (error.response) {
            console.log(error.response.status);
        }
        return {
            loginSuccessful: false,
        };
    }
};

const createSessionFacebook = async (fbToken: string): Promise<loginResult> => {
    try {
        const apiResponse = await apiProvider.post<
            sessionCreationResponseType,
            facebookSessionCreationPayloadType
        >('users/session', {
            fbToken: fbToken,
        });
        console.log('Login succesful!');
        return {
            loginSuccessful: true,
            response: apiResponse,
        };
    } catch (error) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response);
        }
        return {
            loginSuccessful: false,
        };
    }
};

export { createSession, createSessionFacebook };
