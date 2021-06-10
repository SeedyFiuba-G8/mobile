import React from 'react';

// Navigation
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// Screens
import DashboardScreen from '../screens/DashboardScreen';

// Theme
import { useTheme } from '../contexts/ThemeProvider';

// Constants
import colors from '../constants/colors';

// Ts types
import { TopTabsParamList } from '../types';

const DashboardTabs = createMaterialTopTabNavigator<TopTabsParamList>();

export default function DashboardTopTabs() {
    const { isDarkTheme } = useTheme();

    return (
        <DashboardTabs.Navigator
            initialRouteName="Magic"
            tabBarOptions={{
                scrollEnabled: true,
                tabStyle: {
                    // here we should try the labels not to wrap, maybe?
                },
                activeTintColor: isDarkTheme
                    ? colors.primary.dark
                    : colors.primary.light,
                inactiveTintColor: isDarkTheme ? colors.white : colors.black,
                indicatorStyle: {
                    backgroundColor: isDarkTheme
                        ? colors.primary.dark
                        : colors.primary.light,
                },
            }}
        >
            <DashboardTabs.Screen
                name="Magic"
                component={DashboardScreen}
                options={{ title: 'Magic' }}
            />
            <DashboardTabs.Screen
                name="Popular"
                component={DashboardScreen}
                options={{ title: 'Popular' }}
            />
            <DashboardTabs.Screen
                name="Newest"
                component={DashboardScreen}
                options={{ title: 'Newest' }}
            />
            <DashboardTabs.Screen
                name="EndingSoon"
                component={DashboardScreen}
                options={{ title: 'Ending Soon' }}
            />
        </DashboardTabs.Navigator>
    );
}
