import type { updateExpoTokenActionType } from '../actions/UpdateExpoTokenAction';

type ExpoTokenStatusType = {
    expoToken: string;
};

const expoTokenReducer = (
    state = initialState,
    action: updateExpoTokenActionType
): ExpoTokenStatusType => {
    switch (action.type) {
        case 'UPDATE_EXPO_TOKEN':
            return {
                expoToken: action.payload.expoToken,
            };
        default:
            return state;
    }
};

const initialState = {
    expoToken: '',
};

export default expoTokenReducer;
