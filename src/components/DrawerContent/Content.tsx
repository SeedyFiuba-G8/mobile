import React from 'react';
// Navigation
import {
    DrawerContentComponentProps,
    DrawerContentScrollView,
} from '@react-navigation/drawer';

// Contents
import DrawerList from './DrawerList';
import general from './Contents/general';

export default function Content({
    ...props
}: DrawerContentComponentProps): React.ReactElement {
    return (
        <DrawerContentScrollView
            {...props}
            contentContainerStyle={{
                paddingTop: 0,
            }}
        >
            <DrawerList data={general} props={props} />
        </DrawerContentScrollView>
    );
}
