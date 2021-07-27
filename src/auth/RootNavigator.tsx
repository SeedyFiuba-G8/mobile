import React, { useEffect } from 'react';

// Navigation
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SingUpScreen';
import NotFoundScreen from '../screens/NotFoundScreen';

// Ts types
import { AuthStackParamList } from '../types';

const AuthStack = createStackNavigator<AuthStackParamList>();

export default function RootNavigator(): React.ReactElement {
    return (
        <AuthStack.Navigator
            mode='modal'
            initialRouteName='SignIn'
            screenOptions={{
                headerShown: false,
            }}
        >
            <AuthStack.Screen
                name='SignIn'
                component={SignInScreen}
                initialParams={{}}
            />

            <AuthStack.Screen name='SignUp' component={SignUpScreen} />

            <AuthStack.Screen
                name='NotFound'
                component={NotFoundScreen}
                options={{ headerShown: true, title: 'Oops!' }}
            />
        </AuthStack.Navigator>
    );
}
