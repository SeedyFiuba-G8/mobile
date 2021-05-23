export enum LoggingInFlowState {
    NotLoggedIn,
    WaitingForAuthResponse,
    LoggedIn,
    CredentialsError,
}

export type loginActionType = {
    type: string;
    payload: {
        loginState: LoggingInFlowState;
    };
};

export const updateLoginStatusAction = (
    newLoginState: LoggingInFlowState
): loginActionType => {
    return {
        type: 'LOGIN',
        payload: {
            loginState: newLoginState,
        },
    };
};
