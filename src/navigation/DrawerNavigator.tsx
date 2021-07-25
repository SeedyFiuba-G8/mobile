import React, { useEffect } from 'react';

// Navigation
import { createDrawerNavigator } from '@react-navigation/drawer';
import TopTabNavigator from './TopTabNavigator';

// Components
import DrawerContent from '../components/DrawerContent';
import { Button, IconButton } from 'react-native-paper';

// Theme
import { useTheme } from '../contexts/ThemeProvider';

// Constants
import colors from '../constants/colors';

// Ts types
import { DrawerParamList, RootStackParamList } from '../types';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../reducers';
import { getProfile } from '../api/profileApi';
import DashboardScreen from '../screens/DashboardScreen';

// Actions
import ToggleSearchBarAction from '../actions/ToggleSearchBarAction';
import { updateNameAction } from '../actions/UpdateNameAction';
import { updateBalanceAction } from '../actions/UpdateBalanceAction';
import { updateWalletAddressAction } from '../actions/UpdateWalletAddressAction';
type DrawerNavigatorNavigationProp = StackNavigationProp<
    RootStackParamList,
    'Drawer'
>;

type Props = {
    navigation: DrawerNavigatorNavigationProp;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

function AddNewProjectButton(props: Props) {
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
export default function DrawerNavigator(props: Props): React.ReactElement {
    const { isDarkTheme } = useTheme();

    const dispatch = useDispatch();
    const userId = useSelector((state: RootState) => state.session.id);
    /*
    useEffect(() => {
        const updateProfileInfo = async () => {
            const profileResponse = await getProfile(userId);
            console.log('Performing profile update');
            if (profileResponse.successful) {
                dispatch(
                    updateNameAction(
                        profileResponse.data.firstName,
                        profileResponse.data.lastName,
                        profileResponse.data.profilePicUrl
                    )
                );
                if (
                    profileResponse.data.interests.length === 0 ||
                    !profileResponse.data.city ||
                    !profileResponse.data.country
                ) {
                    props.navigation.navigate('Profile', {
                        userId: userId,
                        showNotification:
                            'To complete your register, enter your interests and location. ',
                    });
                }
                if (profileResponse.data.balance) {
                    dispatch(updateBalanceAction(profileResponse.data.balance));
                }
                if (profileResponse.data.address) {
                    dispatch(
                        updateWalletAddressAction(profileResponse.data.address)
                    );
                }
            }
        };
        updateProfileInfo();
    }, [userId]);*/
    return (
        <Drawer.Navigator
            initialRouteName='Dashboard'
            screenOptions={{
                headerShown: true,
                headerTintColor: colors.white,
                headerStyle: {
                    backgroundColor: isDarkTheme
                        ? colors.primary.dark
                        : colors.primary.light,
                },
            }}
            drawerContent={(props) => <DrawerContent {...props} />}
        >
            <Drawer.Screen
                name='Dashboard'
                component={DashboardScreen}
                options={{
                    title: 'Dashboard',
                    headerRight: () => AddNewProjectButton(props),
                }}
            />
        </Drawer.Navigator>
    );
}

const buttonStyle = {
    marginRight: 15,
};
