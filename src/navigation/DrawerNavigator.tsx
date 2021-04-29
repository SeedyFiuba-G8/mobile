import React from 'react';

// Navigation
import { createDrawerNavigator } from '@react-navigation/drawer';
import TopTabNavigator from './TopTabNavigator';

// Components
import DrawerContent from '../components/DrawerContent';

// Ts types
import { DrawerParamList } from '../types';

// Constants
import colors from '../constants/colors';

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
