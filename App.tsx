import React, { useRef, useState } from 'react';
// Notifications
import * as Notifications from 'expo-notifications';
// Hooks
import { createStore } from 'redux';
import { Provider } from 'react-redux';

// Providers
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';

// Wrappers
import Navigation from './src/navigation';

// Reducers
import rootReducer from './src/reducers';
import 'intl';
import { Platform } from 'react-native';
import 'intl/locale-data/jsonp/en';

// Stores
import store from './src/stores/MainStore';
import colors from './src/constants/colors';
import Constants from 'expo-constants';
import { useEffect } from 'react';

// Actions
import { updateExpoTokenAction } from './src/actions/UpdateExpoTokenAction';

import {
    retrieveSessionData,
    updateProfileInfo,
} from './src/session/SessionUtil';
import { updateSessionCredentialsAction } from './src/actions/UpdateSessionCredentialsAction';
import {
    LoggingInFlowState,
    updateLoginStatusAction,
} from './src/actions/UpdateLoginStatusAction';

if (Platform.OS === 'android') {
    // See https://github.com/expo/expo/issues/6536 for this issue.
    if (typeof (Intl as any).__disableRegExpRestore === 'function') {
        (Intl as any).__disableRegExpRestore();
    }
}
const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: colors.primary.light,
    },
};

export default function App(): React.ReactElement {
    useEffect(() => {
        registerForPushNotificationsAsync().then((token) => {
            if (token) {
                store.dispatch(updateExpoTokenAction(token));
                console.log('Registered for push notifications');
            }
        });

        // This listener is fired whenever a notification is received while the app is foregrounded
        Notifications.setNotificationHandler({
            handleNotification: async () => ({
                shouldShowAlert: true,
                shouldPlaySound: true,
                shouldSetBadge: true,
            }),
        });

        const checkSession = async () => {
            const sessionData = await retrieveSessionData();
            if (sessionData) {
                store.dispatch(
                    updateLoginStatusAction(
                        LoggingInFlowState.WaitingForAuthResponse
                    )
                );
                store.dispatch(
                    updateSessionCredentialsAction(
                        sessionData.id,
                        sessionData.token
                    )
                );
                await updateProfileInfo(sessionData.id);
                store.dispatch(
                    updateLoginStatusAction(LoggingInFlowState.LoggedIn)
                );
            }
        };

        checkSession();
    }, []);

    return (
        <SafeAreaProvider>
            <PaperProvider theme={theme}>
                <Provider store={store}>
                    <Navigation />
                </Provider>
            </PaperProvider>
        </SafeAreaProvider>
    );
}

async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
        const { status: existingStatus } =
            await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(token);
    } else {
        alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            sound: 'default',
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
            enableVibrate: true,
        });
    }

    return token;
}
