import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar, Title, Text, TouchableRipple } from 'react-native-paper';
import colors from '../../constants/colors';

type Props = {
    pictureUri?: string;
    name: string;
    previewMessage: string;
    onPress: () => void;
};

export default function MessageCard(props: Props): React.ReactElement {
    return (
        <TouchableRipple
            onPress={props.onPress}
            style={styles.ripple}
            borderless={true}
        >
            <View style={styles.container}>
                <Avatar.Image
                    size={70}
                    source={
                        props.pictureUri !== undefined
                            ? { uri: props.pictureUri }
                            : require('../../assets/images/dummy_avatar2.jpg')
                    }
                />
                <View style={styles.nameView}>
                    <Title>{props.name}</Title>
                    <Text numberOfLines={1} style={styles.previewMessage}>
                        {props.previewMessage}
                    </Text>
                </View>
            </View>
        </TouchableRipple>
    );
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'stretch',
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
    previewMessage: {
        color: colors.darkGrey,
    },
    ripple: {
        alignSelf: 'stretch',
        marginHorizontal: 10,
        marginTop: 10,
        borderRadius: 5,
    },
});
