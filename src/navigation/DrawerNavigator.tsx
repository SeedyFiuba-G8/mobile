import React from 'react';

// Navigation
import { createDrawerNavigator } from '@react-navigation/drawer';
import TopTabNavigator from './TopTabNavigator';

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
		</Drawer.Navigator>
	);
}
