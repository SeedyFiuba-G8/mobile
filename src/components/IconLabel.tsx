import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar, Subheading } from 'react-native-paper';
import colors from '../constants/colors';

export default function IconLabel(props: {
    icon: string;
    text: string;
}): React.ReactElement {
    return (
        <View style={{ flexDirection: 'row' }}>
            <View>
                <Avatar.Icon
                    icon={props.icon}
                    color={colors.darkGrey}
                    style={styles.icon}
                    size={35}
                />
            </View>
            <View>
                <Subheading style={styles.subheading}>{props.text}</Subheading>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    subheading: {
        color: colors.darkerGrey,
        fontSize: 15,
    },
    icon: {
        backgroundColor: 'transparent',
    },
});
