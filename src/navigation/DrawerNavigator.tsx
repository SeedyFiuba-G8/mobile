import React from 'react';

// Navigation
import { createDrawerNavigator } from '@react-navigation/drawer';
import TopTabNavigator from './TopTabNavigator';

// Screens
import ProfileScreen from '../screens/ProfileScreen';
import MessagesScreen from '../screens/MessagesScreen';
import SettingsScreen from '../screens/SettingsScreen';

// Ts types
import { DrawerParamList } from '../types';
import colors from '../constants/colors';
import DrawerContent from '../components/DrawerContent';

const Drawer = createDrawerNavigator<DrawerParamList>();

export default function DrawerNavigator() {
	return (
		<Drawer.Navigator
			initialRouteName="Dashboard"
			screenOptions={{
				headerShown: true,
				headerTintColor: colors.white,
				headerStyle: { backgroundColor: colors.primary },
			}}
			drawerContent={(props) => <DrawerContent {...props} />}
		>
			<Drawer.Screen
				name="Dashboard"
				component={TopTabNavigator}
				options={{
					title: 'All Projects',
				}}
			/>
			<Drawer.Screen
				name="Profile"
				component={ProfileScreen}
				options={{ headerShown: true, title: 'Profile' }}
			/>
			<Drawer.Screen
				name="Messages"
				component={MessagesScreen}
				options={{ headerShown: true, title: 'Messages' }}
			/>
			<Drawer.Screen
				name="Settings"
				component={SettingsScreen}
				options={{ headerShown: true, title: 'Settings' }}
			/>
		</Drawer.Navigator>
	);
}
