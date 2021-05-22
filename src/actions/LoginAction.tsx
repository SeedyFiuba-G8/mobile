export type loginInfoType = {
    username: string;
    password: string;
};

export type loginActionType = {
    type: string;
    payload: {
        username: string;
        password: string;
    };
};

export const loginAction = (loginInfo: loginInfoType): loginActionType => {
    return {
        type: 'LOGIN',
        payload: {
            username: loginInfo.username,
            password: loginInfo.password,
        },
    };
};
