import React from 'react';
// Firebase
import 'firebase/database';

// Navigation
import { createStackNavigator } from '@react-navigation/stack';
import DrawerNavigator from './DrawerNavigator';
import ReviewerCenterNavigator from './ReviewerCenterNavigator';

// Screens
import NotFoundScreen from '../screens/NotFoundScreen';
import ProfileScreen from '../screens/ProfileScreen';
import MessagesScreen from '../screens/MessagesScreen';
import ProjectCreationScreen from '../screens/ProjectCreationScreen';
import MyProjectsScreen from '../screens/MyProjectsScreen';
import ProjectVisualizationScreen from '../screens/ProjectVisualizationScreen';

// Ts types
import { RootStackParamList } from '../types';

// Constants
import colors from '../constants/colors';
import MessageChatScreen from '../screens/MessageChatScreen';
import DonationHistoryScreen from '../screens/DonationHistoryScreen';

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const RootStack = createStackNavigator<RootStackParamList>();

export default function RootNavigator(): React.ReactElement {
    return (
        <RootStack.Navigator
            mode='modal'
            initialRouteName='Drawer'
            screenOptions={{
                headerShown: true,
                headerTintColor: colors.white,
                headerStyle: {
                    backgroundColor: colors.primary.light,
                },
                headerBackTitleVisible: false,
            }}
        >
            <RootStack.Screen
                name='Drawer'
                component={DrawerNavigator}
                options={{ headerShown: false }}
            />

            <RootStack.Screen name='Profile' component={ProfileScreen} />
            <RootStack.Screen name='Messages' component={MessagesScreen} />
            <RootStack.Screen
                name='ProjectCreation'
                component={ProjectCreationScreen}
                options={({ route }) => ({
                    title: route.params.edition
                        ? 'Edit project'
                        : 'Create project',
                })}
            />
            <RootStack.Screen
                name='MyProjects'
                component={MyProjectsScreen}
                options={{ title: 'My projects' }}
            />
            <RootStack.Screen
                name='ProjectVisualization'
                component={ProjectVisualizationScreen}
                options={{ title: 'Project' }}
            />
            <RootStack.Screen
                name='ReviewerCenter'
                component={ReviewerCenterNavigator}
                options={{ title: 'Reviewer center' }}
            />
            <RootStack.Screen
                name='MessagesChat'
                component={MessageChatScreen}
                options={({ route }) => ({ title: route.params.name })}
            />
            <RootStack.Screen
                name='DonationHistory'
                component={DonationHistoryScreen}
                options={{ title: 'Sponsor History' }}
            />
            <RootStack.Screen
                name='NotFound'
                component={NotFoundScreen}
                options={{ title: 'Oops!' }}
            />
        </RootStack.Navigator>
    );
}
