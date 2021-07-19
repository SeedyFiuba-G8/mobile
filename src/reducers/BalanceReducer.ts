import type { updateBalanceActionType } from '../actions/UpdateBalanceAction';

type balanceStatusType = {
    balance: number;
};

const ProfileReducer = (
    state = initialState,
    action: updateBalanceActionType
): balanceStatusType => {
    switch (action.type) {
        case 'UPDATE_BALANCE':
            return {
                balance: action.payload.balance,
            };
        default:
            return state;
    }
};

const initialState = {
    balance: 0.22352,
};

export default ProfileReducer;
