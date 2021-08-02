import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Title } from 'react-native-paper';
// Constants
import colors from '../../constants/colors';
import values from '../../constants/values';

export default function Footer(): React.ReactElement {
    return (
        <View style={styles.container}>
            <Title style={styles.title}>Seedy FIUBA</Title>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        borderTopColor: colors.separator.light,
        borderTopWidth: values.drawer.separatorWeight,
        padding: 15,
    },
    title: {
        color: colors.darkGrey,
    },
});
