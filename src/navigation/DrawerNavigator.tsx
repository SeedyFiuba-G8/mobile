import React from 'react';

// Navigation
import { createDrawerNavigator } from '@react-navigation/drawer';
import TopTabNavigator from './TopTabNavigator';

// Components
import DrawerContent from '../components/DrawerContent';

// Theme
import { useTheme } from '../contexts/ThemeContext';

// Constants
import colors from '../constants/colors';

// Ts types
import { DrawerParamList } from '../types';

const Drawer = createDrawerNavigator<DrawerParamList>();

export default function DrawerNavigator() {
	const { theme } = useTheme();

	return (
		<Drawer.Navigator
			initialRouteName="Dashboard"
			screenOptions={{
				headerShown: true,
				headerTintColor: colors.white,
				headerStyle: {
					backgroundColor:
						theme === 'dark'
							? colors.primary.dark
							: colors.primary.light,
				},
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
		</Drawer.Navigator>
	);
}
