import React from 'react';
import { Drawer } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
// Navigation
import {
    DrawerContentComponentProps,
    DrawerContentScrollView,
    DrawerItem,
} from '@react-navigation/drawer';

// Contents
import DrawerList from './DrawerList';
import general from './Contents/general';

//Other
import { logout } from '../../session/SessionUtil';

export default function Content({
    ...props
}: DrawerContentComponentProps): React.ReactElement {
    const onLogoutClick = async () => {
        logout();
    };

    return (
        <DrawerContentScrollView
            {...props}
            contentContainerStyle={{
                paddingTop: 0,
            }}
        >
            <Drawer.Section>
                <DrawerList data={general} props={props} />
            </Drawer.Section>

            <Drawer.Section>
                <DrawerItem
                    label='Log out'
                    icon={({ color, size }) => (
                        <Ionicons name={'log-out'} color={color} size={size} />
                    )}
                    onPress={onLogoutClick}
                />
            </Drawer.Section>
        </DrawerContentScrollView>
    );
}
