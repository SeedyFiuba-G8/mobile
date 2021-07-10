export type updateProfileInfoActionType = {
    type: string;
    payload: {
        first_name?: string;
        last_name?: string;
        profile_pic_url?: string;
    };
};

export const updateNameAction = (
    first_name: string,
    last_name: string
): updateProfileInfoActionType => {
    return {
        type: 'UPDATE_NAME',
        payload: {
            first_name: first_name,
            last_name: last_name,
        },
    };
};
