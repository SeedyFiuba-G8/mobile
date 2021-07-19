import type { updateProfileInfoActionType } from '../actions/UpdateNameAction';

type profileStatusType = {
    first_name: string;
    last_name: string;
    profile_pic_url: string;
};

const ProfileReducer = (
    state = initialState,
    action: updateProfileInfoActionType
): profileStatusType => {
    switch (action.type) {
        case 'UPDATE_NAME':
            return {
                profile_pic_url: action.payload.profile_pic_url,
                first_name: action.payload.first_name,
                last_name: action.payload.last_name,
            };
            return state;
        default:
            return state;
    }
};

const initialState = {
    first_name: '',
    last_name: '',
    profile_pic_url: '',
};

export default ProfileReducer;
