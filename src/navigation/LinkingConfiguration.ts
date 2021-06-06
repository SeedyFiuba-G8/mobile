/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import * as Linking from 'expo-linking';

export default {
    prefixes: [Linking.makeUrl('/')],
    config: {
        screens: {
            Drawer: {
                screens: {
                    Dashboard: {
                        screens: {
                            Magic: 'dashboard/magic',
                            Popular: 'dashboard/popular',
                            Newest: 'dashboard/newest',
                            EndingSoon: 'dashboard/ending-soon',
                        },
                    },
                },
            },
            Profile: 'profile',
            Messages: 'messages',
            Settings: 'settings',
            NotFound: '*',
            SingIn: 'singin',
            SingUp: 'singup',
        },
    },
};
