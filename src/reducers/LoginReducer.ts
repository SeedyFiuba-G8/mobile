import type { loginActionType } from '../actions/UpdateLoginStatusAction';
import { LoggingInFlowState } from '../actions/UpdateLoginStatusAction';

type loginStatusType = {
    loggedInState: LoggingInFlowState;
};

const loginReducer = (
    state = initialState,
    action: loginActionType
): loginStatusType => {
    switch (action.type) {
        case 'LOGIN':
            return {
                loggedInState: action.payload.loginState,
            };
        default:
            return state;
    }
};

const initialState = {
    loggedInState: LoggingInFlowState.NotLoggedIn,
};

export default loginReducer;
