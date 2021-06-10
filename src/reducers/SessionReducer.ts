import type { updateSessionCredentialsActionType } from '../actions/UpdateSessionCredentialsAction';

type sessionStatusType = {
    id: string;
    token: string;
};

const loginReducer = (
    state = initialState,
    action: updateSessionCredentialsActionType
): sessionStatusType => {
    switch (action.type) {
        case 'UPDATE_SESSION':
            console.log(
                `new id is ${action.payload.id} and new token is ${action.payload.token}`
            );
            return {
                id: action.payload.id,
                token: action.payload.token,
            };
        default:
            return state;
    }
};

const initialState = {
    id: '',
    token: '',
};

export default loginReducer;
