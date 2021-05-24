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
import collections from './Contents/collections';
import categories from './Contents/categories';

//Hooks
import { useDispatch } from 'react-redux';

//Actions
import {
    updateLoginStatusAction,
    LoggingInFlowState,
} from '../../actions/UpdateLoginStatusAction';

export default function Content({
    ...props
}: DrawerContentComponentProps): React.ReactNode {
    const dispatch = useDispatch();
    const onLogoutClick = () => {
        dispatch(updateLoginStatusAction(LoggingInFlowState.NotLoggedIn));
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

            <Drawer.Section title="Collections">
                <DrawerList data={collections} props={props} />
            </Drawer.Section>

            <Drawer.Section title="Categories">
                <DrawerList data={categories} props={props} />
            </Drawer.Section>

            <Drawer.Section>
                <DrawerItem
                    label="Log out"
                    icon={({ color, size }) => (
                        <Ionicons name={'log-out'} color={color} size={size} />
                    )}
                    onPress={onLogoutClick}
                />
            </Drawer.Section>
        </DrawerContentScrollView>
    );
}
