import React from 'react';

// Theming
import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { useTheme } from '../contexts/ThemeProvider';

// Navigation
import LinkingConfiguration from './LinkingConfiguration';
import { NavigationContainer } from '@react-navigation/native';
import MainRootNavigator from './RootNavigator';
import AuthRootNavigator from '../auth/RootNavigator';

// Redux
import { useSelector } from 'react-redux';

// Types
import { LoggingInFlowState } from '../actions/UpdateLoginStatusAction';
import type { RootState } from '../reducers/index';

export default function Navigation(): React.ReactElement {
    const { isDarkTheme } = useTheme();
    const navigationTheme = isDarkTheme ? DarkTheme : DefaultTheme;
    const loginState = useSelector(
        (state: RootState) => state.login.loggedInState
    );
    return (
        <NavigationContainer
            theme={navigationTheme}
            linking={LinkingConfiguration}
        >
            {loginState === LoggingInFlowState.LoggedIn ? (
                <MainRootNavigator />
            ) : (
                <AuthRootNavigator />
            )}
        </NavigationContainer>
    );
}
