// Types
import { DrawerItemType } from './contentTypes';
import store from '../../../stores/MainStore';

const data: DrawerItemType[] = [
    {
        label: 'Profile',
        icon: 'person-circle-outline',
        onPress: (props) => {
            const myUserId = store.getState().session.id;
            props.navigation.navigate('Profile', { userId: myUserId });
        },
    },
    {
        label: 'Messages',
        icon: 'chatbubbles-outline',
        onPress: (props) => {
            props.navigation.navigate('Messages');
        },
    },
    {
        label: 'Settings',
        icon: 'settings-outline',
        onPress: (props) => {
            props.navigation.navigate('Settings');
        },
    },
    {
        label: 'My projects',
        icon: 'briefcase',
        onPress: (props) => {
            props.navigation.navigate('MyProjects');
        },
    },
];

export default data;
