import AsyncStorage from '@react-native-async-storage/async-storage';

const persistSessionData = async (id: string, token: string): void => {
    try {
        await AsyncStorage.setItem('id', id);
        await AsyncStorage.setItem('token', token);
        console.log('Successfully persisted session data');
    } catch (e) {
        console.log('Unable to persist session data.');
    }
};

const clearSessionData = async () => {
    try {
        await AsyncStorage.removeItem('id');
        await AsyncStorage.removeItem('token');
    } catch (e) {
        console.log('Unable to clear session data.');
    }
};
export { persistSessionData, clearSessionData };
