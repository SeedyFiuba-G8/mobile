import React from 'react';

// Navigation
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// Screens
import MagicScreen from '../screens/tabs/MagicScreen';
import PopularScreen from '../screens/tabs/PopularScreen';
import NewestScreen from '../screens/tabs/NewestScreen';
import EndingSoonScreen from '../screens/tabs/EndingSoonScreen';

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
