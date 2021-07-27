import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar, Title, Text } from 'react-native-paper';
import colors from '../../constants/colors';

type Props = {
    pictureUri: string;
    name: string;
    previewMessage: string;
};

export default function MessageCard(props: Props): React.ReactElement {
    return (
        <View style={styles.container}>
            <Avatar.Image size={70} source={{ uri: props.pictureUri }} />
            <View style={styles.nameView}>
                <Title>{props.name}</Title>
                <Text numberOfLines={1} style={{ color: colors.darkGrey }}>
                    {props.previewMessage}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'stretch',
        margin: 10,
        backgroundColor: 'white',
        borderRadius: 5,
        flexDirection: 'row',
        padding: 10,
    },
    nameView: {
        marginLeft: 10,
        flexWrap: 'nowrap',
        flex: 1,
    },
});
