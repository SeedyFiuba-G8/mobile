// Types
import { DrawerItemType } from './contentTypes';

const data: DrawerItemType[] = [
    {
        label: 'Log out',
        icon: 'log-out',
        onPress: (props): void => {
            console.log('Test123');
        },
    },
];

export default data;
