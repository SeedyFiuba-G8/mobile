import React from 'react';

// Navigation
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// Screens
import ReviewRequestsScreen from '../screens/ReviewRequestsScreen';
import ReviewedProjectsScreen from '../screens/ReviewedProjectsScreen';

// Theme
import { useTheme } from '../contexts/ThemeProvider';

// Constants
import colors from '../constants/colors';

// Ts types
import { ReviewerCenterTabParamList } from '../types';

const ReviewerCenterTabs =
    createMaterialTopTabNavigator<ReviewerCenterTabParamList>();

export default function ReviewerCenterNavigator(): React.ReactElement {
    return (
        <ReviewerCenterTabs.Navigator
            initialRouteName='ReviewingProjects'
            tabBarOptions={{
                scrollEnabled: true,
                activeTintColor: colors.primary.light,
                inactiveTintColor: colors.black,
                indicatorStyle: {
                    backgroundColor: colors.primary.light,
                },
                style: { width: '125%' },
            }}
        >
            <ReviewerCenterTabs.Screen
                name='ReviewingProjects'
                component={ReviewedProjectsScreen}
                options={{ title: 'Projects' }}
            />
            <ReviewerCenterTabs.Screen
                name='ReviewRequests'
                component={ReviewRequestsScreen}
                options={{ title: 'Requests' }}
            />
        </ReviewerCenterTabs.Navigator>
    );
}
