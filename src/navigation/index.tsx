import React from 'react';

// Navigation
import LinkingConfiguration from './LinkingConfiguration';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './RootNavigator';

export default function Navigation() {
	return (
		<NavigationContainer linking={LinkingConfiguration}>
			<RootNavigator />
		</NavigationContainer>
	);
}
