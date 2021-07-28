import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import colors from '../../constants/colors';

type Props = {
    message: string;
    mine: boolean;
};

export default function Message(props: Props): React.ReactElement {
    return (
        <View style={props.mine ? styles.myMessage : styles.otherMessage}>
            <Text style={{ color: props.mine ? 'white' : 'black' }}>
                {props.message}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    otherMessage: {
        backgroundColor: colors.white,
        borderRadius: 20,
        padding: 15,
        marginRight: 30,
        alignSelf: 'flex-start',
        marginBottom: 5,
    },
    myMessage: {
        backgroundColor: colors.primary.light,
        borderRadius: 20,
        padding: 15,
        marginLeft: 30,
        alignSelf: 'flex-end',
        marginBottom: 5,
    },
});
