import React from 'react';

// Navigation
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import SignInScreen from '../screens/SignInScreen';
import NotFoundScreen from '../screens/NotFoundScreen';

// Ts types
import { AuthStackParamList } from '../types';

// Constants
import colors from '../constants/colors';
import { useTheme } from '../contexts/ThemeProvider';

const AuthStack = createStackNavigator<AuthStackParamList>();

export default function RootNavigator() {
	const { isDarkTheme } = useTheme();

	return (
		<AuthStack.Navigator
			mode="modal"
			initialRouteName="SignIn"
			screenOptions={{
				headerShown: false,
			}}
		>
			<AuthStack.Screen name="SignIn" component={SignInScreen} />

			<AuthStack.Screen name="SignUp" component={SignInScreen} />

			<AuthStack.Screen
				name="NotFound"
				component={NotFoundScreen}
				options={{ headerShown: true, title: 'Oops!' }}
			/>
		</AuthStack.Navigator>
	);
}
