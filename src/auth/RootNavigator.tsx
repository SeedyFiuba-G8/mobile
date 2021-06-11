import React, { useEffect } from 'react';

// Navigation
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SingUpScreen';
import NotFoundScreen from '../screens/NotFoundScreen';

// Ts types
import { AuthStackParamList } from '../types';

// Redux
import { useDispatch } from 'react-redux';

// API
import { createSession, createSessionFacebook } from '../api/sessionApi';

// Actions
import {
    updateLoginStatusAction,
    LoggingInFlowState,
} from '../actions/UpdateLoginStatusAction';

import { updateSessionCredentialsAction } from '../actions/UpdateSessionCredentialsAction';

// Util
import { persistSessionData } from '../session/SessionUtil';

import { DeviceEventEmitter } from 'react-native';

const AuthStack = createStackNavigator<AuthStackParamList>();

export default function RootNavigator(): React.ReactNode {
    const dispatch = useDispatch();

    useEffect(() => {
        DeviceEventEmitter.addListener(
            'login',
            (email: string, password: string) => loginFunction(email, password)
        );
        DeviceEventEmitter.addListener('loginFacebook', (fbToken: string) =>
            loginFunctionFacebook(fbToken)
        );
        return () => {
            DeviceEventEmitter.removeAllListeners('login');
            DeviceEventEmitter.removeAllListeners('loginFacebook');
        };
    });

    const loginFunction = async (email: string, password: string) => {
        dispatch(
            updateLoginStatusAction(LoggingInFlowState.WaitingForAuthResponse)
        );
        const loginResult = await createSession(email, password);

        if (loginResult.loginSuccessful) {
            await persistSessionData(
                loginResult.response?.id,
                loginResult.response?.token
            );
            dispatch(
                updateSessionCredentialsAction(
                    loginResult.response?.id,
                    loginResult.response?.token
                )
            );
            dispatch(updateLoginStatusAction(LoggingInFlowState.LoggedIn));
            return;
        }
        dispatch(updateLoginStatusAction(LoggingInFlowState.CredentialsError));
    };

    const loginFunctionFacebook = async (fbToken: string) => {
        dispatch(
            updateLoginStatusAction(LoggingInFlowState.WaitingForAuthResponse)
        );
        const loginResult = await createSessionFacebook(fbToken);

        if (loginResult.loginSuccessful) {
            await persistSessionData(
                loginResult.response?.id,
                loginResult.response?.token
            );
            dispatch(
                updateSessionCredentialsAction(
                    loginResult.response?.id,
                    loginResult.response?.token
                )
            );
            dispatch(updateLoginStatusAction(LoggingInFlowState.LoggedIn));
            return;
        }
        dispatch(updateLoginStatusAction(LoggingInFlowState.CredentialsError));
    };

    return (
        <AuthStack.Navigator
            mode="modal"
            initialRouteName="SignIn"
            screenOptions={{
                headerShown: false,
            }}
        >
            <AuthStack.Screen name="SignIn" component={SignInScreen} />

            <AuthStack.Screen name="SignUp" component={SignUpScreen} />

            <AuthStack.Screen
                name="NotFound"
                component={NotFoundScreen}
                options={{ headerShown: true, title: 'Oops!' }}
            />
        </AuthStack.Navigator>
    );
}
