/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import * as Linking from 'expo-linking';

export default {
    prefixes: [Linking.createURL('/')],
    config: {
        screens: {
            Drawer: {
                screens: {
                    Dashboard: {
                        screens: {
                            Recommended: 'dashboard/recommended',
                            All: 'dashboard/all',
                            Favorites: 'dashboard/favorites',
                            Near: 'dashboard/near',
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
                screens: {
                    ReviewRequests: 'reviewCenter/requests',
                    ReviewingProjects: 'reviewCenter/projects',
                },
            },
            MessageChat: 'chat',
            DonationHistory: 'donations',
        },
    },
};
