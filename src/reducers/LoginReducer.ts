import type { loginActionType } from '../actions/LoginAction';

type loginStatusType = {
    isLogged: boolean;
};

export enum LoggingInFlowState {
    NotLoggedIn,
    WaitingForAuthResponse,
    LoggedIn,
    CredentialsError,
}

const loginReducer = (
    state = initialState,
    action: loginActionType
): loginStatusType => {
    switch (action.type) {
        case 'LOGIN':
            // Esta lógica es temporaria. No debería hacerse la request desde este reducer.
            if (
                action.payload.username === 'nicomatex' &&
                action.payload.password === '1234'
            ) {
                console.log('Validation successful!');
                return {
                    loggedInState: LoggingInFlowState.LoggedIn,
                };
            }
            console.log('Validation WRONG');
            return {
                loggedInState: LoggingInFlowState.WaitingForAuthResponse,
            };
        default:
            return state;
    }
};

const initialState = {
    loggedInState: LoggingInFlowState.NotLoggedIn,
};

export default loginReducer;
