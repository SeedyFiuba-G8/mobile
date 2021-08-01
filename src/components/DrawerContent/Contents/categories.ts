// Types
import {
    DrawerContentComponentProps,
    DrawerContentOptions,
} from '@react-navigation/drawer';
import { DrawerItemType } from './contentTypes';

const data: DrawerItemType[] = [
    {
        label: 'Art',
        icon: 'bookmark-outline',
        onPress: (
            props: DrawerContentComponentProps<DrawerContentOptions>
        ): void => {
            props.navigation.navigate('Dashboard');
        },
    },
    {
        label: 'Games',
        icon: 'bookmark-outline',
        onPress: (
            props: DrawerContentComponentProps<DrawerContentOptions>
        ): void => {
            props.navigation.navigate('Dashboard');
        },
    },
];

export default data;
