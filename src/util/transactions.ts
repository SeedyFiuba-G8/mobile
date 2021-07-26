import store from '../stores/MainStore';
import { getProfile } from '../api/profileApi';
import { updateBalanceAction } from '../actions/UpdateBalanceAction';
const updateBalance = async (): Promise<void> => {
    const myProfileId = store.getState().session.id;
    const profile = await getProfile(myProfileId);
    if (profile.successful) {
        if (profile.data.balance !== undefined) {
            store.dispatch(updateBalanceAction(profile.data.balance));
        }
    }
};

export { updateBalance };
