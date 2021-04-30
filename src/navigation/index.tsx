import React from 'react';

// Theming
import { useTheme } from 'react-native-paper';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';

// Navigation
import LinkingConfiguration from './LinkingConfiguration';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './RootNavigator';

export default function Navigation() {
	const theme = useTheme();
	const navigationTheme = theme.dark ? DarkTheme : DefaultTheme;

	return (
		<NavigationContainer
			theme={navigationTheme}
			linking={LinkingConfiguration}
		>
			<RootNavigator />
		</NavigationContainer>
	);
}
