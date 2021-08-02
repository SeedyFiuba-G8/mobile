import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateBalanceAction } from '../actions/UpdateBalanceAction';
import {
    LoggingInFlowState,
    updateLoginStatusAction,
} from '../actions/UpdateLoginStatusAction';
import { updateNameAction } from '../actions/UpdateNameAction';
import { updateWalletAddressAction } from '../actions/UpdateWalletAddressAction';
import { getProfile } from '../api/profileApi';
import { deleteSession } from '../api/sessionApi';
import store from '../stores/MainStore';

const logout = async (): Promise<void> => {
    deleteSession();

    await clearSessionData();
    store.dispatch(updateLoginStatusAction(LoggingInFlowState.NotLoggedIn));
};

const persistSessionData = async (id: string, token: string): Promise<void> => {
    try {
        await AsyncStorage.setItem('id', id);
        await AsyncStorage.setItem('token', token);
        console.log('Successfully persisted session data');
    } catch (e) {
        console.log('Unable to persist session data.');
    }
};

const clearSessionData = async (): Promise<void> => {
    try {
        await AsyncStorage.removeItem('id');
        await AsyncStorage.removeItem('token');
    } catch (e) {
        console.log('Unable to clear session data.');
    }
};

const retrieveSessionData = async (): Promise<{
    id: string;
    token: string;
} | null> => {
    try {
        const id = await AsyncStorage.getItem('id');
        const token = await AsyncStorage.getItem('token');
        if (id !== null && token !== null) {
            return {
                id: id,
                token: token,
            };
        }
    } catch (e) {
        console.log('Unable to retrieve session data from storage');
    }
    return null;
};

const updateProfileInfo = async (userId: string): Promise<void> => {
    const profileResponse = await getProfile(userId);
    if (profileResponse.successful) {
        store.dispatch(
            updateNameAction(
                profileResponse.data.firstName,
                profileResponse.data.lastName,
                profileResponse.data.profilePicUrl
            )
        );
        if (profileResponse.data.balance !== undefined) {
            store.dispatch(updateBalanceAction(profileResponse.data.balance));
        }
        if (profileResponse.data.address !== undefined) {
            store.dispatch(
                updateWalletAddressAction(profileResponse.data.address)
            );
        }
    }
};
export {
    persistSessionData,
    clearSessionData,
    retrieveSessionData,
    updateProfileInfo,
    logout,
};
