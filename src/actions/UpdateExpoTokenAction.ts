export type updateExpoTokenActionType = {
    type: 'UPDATE_EXPO_TOKEN';
    payload: {
        expoToken: string;
    };
};

export const updateExpoTokenAction = (
    expoToken: string
): updateExpoTokenActionType => {
    return {
        type: 'UPDATE_EXPO_TOKEN',
        payload: {
            expoToken: expoToken,
        },
    };
};
