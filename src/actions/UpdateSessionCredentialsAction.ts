export type updateSessionCredentialsActionType = {
    type: string;
    payload: {
        id: string;
        token: string;
    };
};

export const updateSessionCredentialsAction = (
    id: string,
    token: string
): updateSessionCredentialsActionType => {
    return {
        type: 'UPDATE_SESSION',
        payload: {
            id: id,
            token: token,
        },
    };
};
