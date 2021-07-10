import React, { useEffect } from 'react';

// Navigation
import { createDrawerNavigator } from '@react-navigation/drawer';
import TopTabNavigator from './TopTabNavigator';

// Components
import DrawerContent from '../components/DrawerContent';
import { Button } from 'react-native-paper';

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
import { updateNameAction } from '../actions/UpdateProfileAction';

type DrawerNavigatorNavigationProp = StackNavigationProp<
    RootStackParamList,
    'Drawer'
>;

type Props = {
    navigation: DrawerNavigatorNavigationProp;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

function AddNewProjectButton(props: Props) {
    return (
        <Button
            icon='briefcase-plus'
            onPress={() =>
                props.navigation.navigate('ProjectCreation', { edition: false })
            }
            mode='contained'
            style={buttonStyle}
            labelStyle={{ color: '#fff' }}
        >
            create
        </Button>
    );
}
export default function DrawerNavigator(props: Props): React.ReactElement {
    const { isDarkTheme } = useTheme();

    const dispatch = useDispatch();
    const userId = useSelector((state: RootState) => state.session.id);
    useEffect(() => {
        const updateProfileInfo = async () => {
            const profileResponse = await getProfile(userId);
            if (profileResponse.successful) {
                dispatch(
                    updateNameAction(
                        profileResponse.data.firstName,
                        profileResponse.data.lastName
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
            }
        };
        updateProfileInfo();
    }, []);
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
                component={TopTabNavigator}
                options={{
                    title: 'All Projects',
                    headerRight: () => AddNewProjectButton(props),
                }}
            />
        </Drawer.Navigator>
    );
}

const buttonStyle = {
    marginRight: 10,
};
