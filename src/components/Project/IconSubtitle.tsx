import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar, Title } from 'react-native-paper';
import colors from '../../constants/colors';

type Props = {
    icon: string;
    text: string;
};

export default function IconSubtitle(props: Props): React.ReactElement {
    return (
        <View style={styles.labelTitleView}>
            <Avatar.Icon
                icon={props.icon}
                color={colors.primary.light}
                style={styles.icon}
                size={35}
            />
            <Title style={styles.titleSecondary}>{props.text}</Title>
        </View>
    );
}

const styles = StyleSheet.create({
    icon: {
        backgroundColor: 'transparent',
    },
    labelTitleView: {
        flexDirection: 'row',
        marginLeft: 30,
        alignSelf: 'flex-start',
    },
    titleSecondary: {
        alignSelf: 'flex-start',
        fontSize: 20,
        color: colors.primary.light,
    },
});
