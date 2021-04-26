import React from 'react';

// Navigation
import { createDrawerNavigator } from '@react-navigation/drawer';
import TopTabNavigator from './TopTabNavigator';

// Screens
import SettingsScreen from '../screens/SettingsScreen';
import ProfileScreen from '../screens/ProfileScreen';

// Ts types
import { DrawerParamList } from '../constants/types';
import colors from '../constants/colors';

const Drawer = createDrawerNavigator<DrawerParamList>();

export default function DrawerNavigator() {
	return (
		<Drawer.Navigator initialRouteName="Dashboard">
			<Drawer.Screen
				name="Dashboard"
				component={TopTabNavigator}
				options={{
					headerShown: true,
					title: 'All Projects',
					headerTintColor: colors.white,
					headerStyle: { backgroundColor: colors.primary },
				}}
			/>
			<Drawer.Screen
				name="Settings"
				component={SettingsScreen}
				options={{ headerShown: true, title: 'Settings' }}
			/>
			<Drawer.Screen
				name="Profile"
				component={ProfileScreen}
				options={{ headerShown: true, title: 'Profile' }}
			/>
		</Drawer.Navigator>
	);
}
