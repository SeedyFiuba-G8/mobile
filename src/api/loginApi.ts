import { apiProvider } from './utilities/provider';

type loginResult = {
    loginSuccessful: boolean;
    token: string | null;
};

const logIn = async (
    username: string,
    password: string
): Promise<loginResult> => {
    const apiResponse = await apiProvider.post('login', {
        username: username,
        password: password,
    });
    console.log(`Api response is ${apiResponse}`);
    console.log(username);
    console.log(password);
    if (username === 'nicomatex' && password === '1234') {
        console.log('Log in succesful!');
        return {
            loginSuccessful: true,
            token: '123456789',
        };
    }
    return {
        loginSuccessful: false,
        token: null,
    };
};

export const loginApi = {
    logIn,
};
