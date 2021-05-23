// Types
import { DrawerItemType } from './contentTypes';
import { useDispatch } from 'react-redux';

const data: DrawerItemType[] = [
    {
        label: 'Log out',
        icon: 'log-out',
        onPress: (props): void => {
            dispatch = useDispatch();
            dispatchEvent();
        },
    },
];

export default data;
