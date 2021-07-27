import type { updateBalanceActionType } from '../actions/UpdateBalanceAction';
import type { updateWalletAddressActionType } from '../actions/UpdateWalletAddressAction';

type balanceStatusType = {
    address: string;
    balance: number;
};

const BalanceReducer = (
    state = initialState,
    action: updateBalanceActionType | updateWalletAddressActionType
): balanceStatusType => {
    switch (action.type) {
        case 'UPDATE_BALANCE':
            console.log(`Updating balance to ${action.payload.balance}`);
            return {
                ...state,
                balance: action.payload.balance,
            };
        case 'UPDATE_WALLET_ADDRESS':
            return {
                ...state,
                address: action.payload.address,
            };
        default:
            return state;
    }
};

const initialState = {
    address: '',
    balance: 0,
};

export default BalanceReducer;
