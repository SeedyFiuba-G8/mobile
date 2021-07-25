export type updateBalanceActionType = {
    type: 'UPDATE_BALANCE';
    payload: {
        balance: number;
    };
};

export const updateBalanceAction = (
    balance: number
): updateBalanceActionType => {
    return {
        type: 'UPDATE_BALANCE',
        payload: {
            balance: balance,
        },
    };
};
