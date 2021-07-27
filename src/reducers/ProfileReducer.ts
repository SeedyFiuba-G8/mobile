import type { updateProfileInfoActionType } from '../actions/UpdateNameAction';
import { Reducer } from 'redux';

type profileState = {
    first_name: string;
    last_name: string;
    profile_pic_url?: string;
};

const ProfileReducer: Reducer<profileState, updateProfileInfoActionType> = (
    state = initialState,
    action: updateProfileInfoActionType
): profileState => {
    switch (action.type) {
        case 'UPDATE_NAME':
            return {
                profile_pic_url: action.payload.profile_pic_url,
                first_name: action.payload.first_name,
                last_name: action.payload.last_name,
            };
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
