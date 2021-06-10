import { apiProvider } from './utilities/provider';

const register = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string
): Promise<boolean> => {
    try {
        const apiResponse = await apiProvider.post<void>('user', {
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
        });
        console.log('Registered successfully!');
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};

export { register };
