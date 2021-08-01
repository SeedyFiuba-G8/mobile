import React from 'react';

// Navigation
import { createDrawerNavigator } from '@react-navigation/drawer';

// Components
import DrawerContent from '../components/DrawerContent';
import { IconButton } from 'react-native-paper';

// Constants
import colors from '../constants/colors';

// Ts types
import { DrawerParamList } from '../types';
import { useDispatch } from 'react-redux';

// Actions
import ToggleSearchBarAction from '../actions/ToggleSearchBarAction';
import DashboardTopTabs from './TopTabNavigator';

const Drawer = createDrawerNavigator<DrawerParamList>();

function AddNewProjectButton() {
    const dispatch = useDispatch();
    return (
        <IconButton
            icon='magnify'
            onPress={() => dispatch(ToggleSearchBarAction())}
            style={buttonStyle}
            color={colors.white}
        />
    );
}
export default function DrawerNavigator(): React.ReactElement {
    return (
        <Drawer.Navigator
            initialRouteName='Dashboard'
            screenOptions={{
                headerShown: true,
                headerTintColor: colors.white,
                headerStyle: {
                    backgroundColor: colors.primary.light,
                },
            }}
            drawerContent={(props) => <DrawerContent {...props} />}
        >
            <Drawer.Screen
                name='Dashboard'
                component={DashboardTopTabs}
                options={{
                    title: 'Dashboard',
                    headerRight: () => AddNewProjectButton(),
                }}
            />
        </Drawer.Navigator>
    );
}

const buttonStyle = {
    marginRight: 15,
};
