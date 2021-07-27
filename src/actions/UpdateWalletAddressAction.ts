export type updateWalletAddressActionType = {
    type: 'UPDATE_WALLET_ADDRESS';
    payload: {
        address: string;
    };
};

export const updateWalletAddressAction = (
    address: string
): updateWalletAddressActionType => {
    return {
        type: 'UPDATE_WALLET_ADDRESS',
        payload: {
            address: address,
        },
    };
};
