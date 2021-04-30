import React from 'react';

// Theming
import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { useTheme } from '../contexts/ThemeProvider';

// Navigation
import LinkingConfiguration from './LinkingConfiguration';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './RootNavigator';

export default function Navigation() {
	const { isDarkTheme } = useTheme();
	const navigationTheme = isDarkTheme ? DarkTheme : DefaultTheme;

	return (
		<NavigationContainer
			theme={navigationTheme}
			linking={LinkingConfiguration}
		>
			<RootNavigator />
		</NavigationContainer>
	);
}
