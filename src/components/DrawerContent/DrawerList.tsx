import React from 'react';
import { View } from 'react-native';
import { Avatar } from 'react-native-paper';

// Types
import { DrawerItemType } from './Contents/contentTypes';

// Navigation
import {
    DrawerContentComponentProps,
    DrawerItem,
} from '@react-navigation/drawer';

interface DrawerListProps {
    data: DrawerItemType[];
    props: DrawerContentComponentProps;
}

export default function DrawerList(
    args: React.PropsWithChildren<DrawerListProps>
): React.ReactElement {
    const { data, props } = args;
    return (
        <View>
            {data.map((value, key) => {
                return (
                    <DrawerItem
                        key={key}
                        label={value.label}
                        icon={({ color }) => (
                            <Avatar.Icon
                                style={{ backgroundColor: 'transparent' }}
                                icon={value.icon}
                                color={color}
                                size={35}
                            />
                        )}
                        onPress={() => value.onPress(props)}
                    />
                );
            })}
        </View>
    );
}
