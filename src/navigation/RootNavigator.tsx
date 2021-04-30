import React from 'react';

// Navigation
import { createStackNavigator } from '@react-navigation/stack';
import DrawerNavigator from './DrawerNavigator';

// Screens
import NotFoundScreen from '../screens/NotFoundScreen';
import ProfileScreen from '../screens/ProfileScreen';
import MessagesScreen from '../screens/MessagesScreen';
import SettingsScreen from '../screens/SettingsScreen';

// Ts types
import { RootStackParamList } from '../types';

// Constants
import colors from '../constants/colors';
import { useTheme } from '../contexts/ThemeProvider';

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const RootStack = createStackNavigator<RootStackParamList>();

export default function RootNavigator() {
	const { theme } = useTheme();

	return (
		<RootStack.Navigator
			mode="modal"
			initialRouteName="Drawer"
			screenOptions={{
				headerShown: true,
				headerTintColor: colors.white,
				headerStyle: {
					backgroundColor:
						theme === 'dark'
							? colors.primary.dark
							: colors.primary.light,
				},
				headerBackTitleVisible: false,
			}}
		>
			<RootStack.Screen
				name="Drawer"
				component={DrawerNavigator}
				options={{ headerShown: false }}
			/>

			<RootStack.Screen name="Profile" component={ProfileScreen} />
			<RootStack.Screen name="Messages" component={MessagesScreen} />
			<RootStack.Screen name="Settings" component={SettingsScreen} />

			<RootStack.Screen
				name="NotFound"
				component={NotFoundScreen}
				options={{ title: 'Oops!' }}
			/>
		</RootStack.Navigator>
	);
}
