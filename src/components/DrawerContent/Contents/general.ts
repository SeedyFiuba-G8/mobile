// Types
import { DrawerItemType } from './contentTypes';
import store from '../../../stores/MainStore';

const data: DrawerItemType[] = [
    {
        label: 'Profile',
        icon: 'account',
        onPress: (props) => {
            const myUserId = store.getState().session.id;
            props.navigation.navigate('Profile', { userId: myUserId });
        },
    },
    {
        label: 'Messages',
        icon: 'message-text',
        onPress: (props) => {
            props.navigation.navigate('Messages');
        },
    },
    {
        label: 'My projects',
        icon: 'briefcase',
        onPress: (props) => {
            props.navigation.navigate('MyProjects');
        },
    },
    {
        label: 'Review requests',
        icon: 'shield-account',
        onPress: (props) => {
            props.navigation.navigate('ReviewRequests');
        },
    },
    {
        label: 'Settings',
        icon: 'cog',
        onPress: (props) => {
            props.navigation.navigate('Settings');
        },
    },
];

export default data;
