// Types
import { DrawerItemType } from './contentTypes';
import store from '../../../stores/MainStore';
import {
    DrawerContentComponentProps,
    DrawerContentOptions,
} from '@react-navigation/drawer';
import { logout } from '../../../session/SessionUtil';

const data: DrawerItemType[] = [
    {
        label: 'Profile',
        icon: 'account',
        onPress: (
            props: DrawerContentComponentProps<DrawerContentOptions>
        ): void => {
            const myUserId = store.getState().session.id;
            props.navigation.navigate('Profile', { userId: myUserId });
        },
    },
    {
        label: 'Messages',
        icon: 'message-text',
        onPress: (
            props: DrawerContentComponentProps<DrawerContentOptions>
        ): void => {
            props.navigation.navigate('Messages');
        },
    },
    {
        label: 'My projects',
        icon: 'briefcase',
        onPress: (
            props: DrawerContentComponentProps<DrawerContentOptions>
        ): void => {
            props.navigation.navigate('MyProjects');
        },
    },
    {
        label: 'Reviewer center',
        icon: 'shield-account',
        onPress: (
            props: DrawerContentComponentProps<DrawerContentOptions>
        ): void => {
            props.navigation.navigate('ReviewerCenter');
        },
    },
    {
        label: 'Sponsor History',
        icon: 'clock',
        onPress: (
            props: DrawerContentComponentProps<DrawerContentOptions>
        ): void => {
            props.navigation.navigate('DonationHistory');
        },
    },
    {
        label: 'Log out',
        icon: 'logout',
        onPress: (): void => {
            logout();
        },
    },
];

export default data;
