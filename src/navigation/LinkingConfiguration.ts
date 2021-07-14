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
            ProjectCreation: 'create',
            Profile: 'profile',
            ProjectVisualization: 'visualizeProject',
            Messages: 'messages',
            Settings: 'settings',
            MyProjects: 'projects',
            NotFound: '*',
            SingIn: 'singin',
            SingUp: 'singup',
            ReviewerCenter: {
                ReviewRequests: 'reviewCenter/requests',
                ReviewingProjects: 'reviewCenter/projects',
            },
        },
    },
};
