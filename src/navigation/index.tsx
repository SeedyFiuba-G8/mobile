import React from 'react';
import * as Notifications from 'expo-notifications';
// Theming
import { DefaultTheme } from '@react-navigation/native';

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
import * as Linking from 'expo-linking';

const genDeepLink = (notifType: string) => {
    switch (notifType) {
        case 'message':
            return '/messages';
        case 'entrepeneurProjectNotPublished':
        case 'entrepeneurProjectPublished':
        case 'entrepeneurProjectFunded':
        case 'entrepeneurProjectStarted':
        case 'entrepeneurProjectStageCompleted':
        case 'entrepeneurProjectCompleted':
            return '/projects';
        case 'reviewerProjectNotPublished':
        case 'reviewerProjectPublished':
        case 'reviewerProjectStarted':
        case 'reviewerProjectStageCompleted':
        case 'reviewerProjectCompleted':
            return '/reviewCenter/projects';
        case 'funderProjectNotFunded':
            return '/donations';
        case 'funderProjectFunded':
            return '/donations';
        default:
            return '/';
    }
};

export default function Navigation(): React.ReactElement {
    const loginState = useSelector(
        (state: RootState) => state.login.loggedInState
    );

    return (
        <NavigationContainer
            theme={DefaultTheme}
            linking={{
                ...LinkingConfiguration,
                subscribe(listener) {
                    const onReceiveURL = ({ url }: { url: string }) =>
                        listener(url);
                    Linking.addEventListener('url', onReceiveURL);

                    const subscription =
                        Notifications.addNotificationResponseReceivedListener(
                            (response) => {
                                //const url = response.notification.request
                                //   .content.data.url as string;
                                console.log('TAPPED NOTIF');
                                const url = Linking.createURL(
                                    genDeepLink(
                                        response.notification.request.content
                                            .data.type as string
                                    )
                                );
                                listener(url);
                            }
                        );
                    return () => {
                        Linking.removeEventListener('url', onReceiveURL);
                        subscription.remove();
                    };
                },
            }}
        >
            {loginState === LoggingInFlowState.LoggedIn ? (
                <MainRootNavigator />
            ) : (
                <AuthRootNavigator />
            )}
        </NavigationContainer>
    );
}
