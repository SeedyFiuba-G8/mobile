import React from 'react';

// Navigation
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// Screens
import DashboardScreen from '../screens/DashboardScreen';

// Constants
import colors from '../constants/colors';

// Ts types
import { TopTabsParamList } from '../types';
import RecommendedProjectsScreen from '../screens/RecommendedProjectsScreen';
import FavoriteProjectsScreen from '../screens/FavoriteProjectsScreen';

const DashboardTabs = createMaterialTopTabNavigator<TopTabsParamList>();

export default function DashboardTopTabs(): React.ReactElement {
    return (
        <DashboardTabs.Navigator
            initialRouteName='Recommended'
            tabBarOptions={{
                scrollEnabled: true,
                tabStyle: {
                    // here we should try the labels not to wrap, maybe?
                },
                activeTintColor: colors.primary.light,
                inactiveTintColor: colors.black,
                indicatorStyle: {
                    backgroundColor: colors.primary.light,
                },
            }}
        >
            <DashboardTabs.Screen
                name='Recommended'
                component={RecommendedProjectsScreen}
                options={{ title: 'Recommended' }}
                initialParams={{ type: 'recommended' }}
            />
            <DashboardTabs.Screen
                name='All'
                component={DashboardScreen}
                options={{ title: 'All Projects' }}
                initialParams={{ type: 'all' }}
            />
            <DashboardTabs.Screen
                name='Favorites'
                component={FavoriteProjectsScreen}
                options={{ title: 'Liked' }}
                initialParams={{ type: 'favorites' }}
            />
        </DashboardTabs.Navigator>
    );
}
