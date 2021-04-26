import React from 'react';

// Navigation
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// Screens
import MagicScreen from '../screens/tabs/MagicScreen';
import PopularScreen from '../screens/tabs/PopularScreen';
import NewestScreen from '../screens/tabs/NewestScreen';
import EndingSoonScreen from '../screens/tabs/EndingSoonScreen';

// Ts types
import { TopTabsParamList } from '../types';
import colors from '../constants/colors';

const DashboardTabs = createMaterialTopTabNavigator<TopTabsParamList>();

export default function DashboardTopTabs() {
	return (
		<DashboardTabs.Navigator
			initialRouteName="Magic"
			tabBarOptions={{
				scrollEnabled: true,
				tabStyle: {
					// here we should try the labels not to wrap, maybe?
				},
				activeTintColor: colors.primary,
				inactiveTintColor: colors.black,
				indicatorStyle: { backgroundColor: colors.primary },
			}}
		>
			<DashboardTabs.Screen
				name="Magic"
				component={MagicScreen}
				options={{ title: 'Magic' }}
			/>
			<DashboardTabs.Screen
				name="Popular"
				component={PopularScreen}
				options={{ title: 'Popular' }}
			/>
			<DashboardTabs.Screen
				name="Newest"
				component={NewestScreen}
				options={{ title: 'Newest' }}
			/>
			<DashboardTabs.Screen
				name="EndingSoon"
				component={EndingSoonScreen}
				options={{ title: 'Ending Soon' }}
			/>
		</DashboardTabs.Navigator>
	);
}
