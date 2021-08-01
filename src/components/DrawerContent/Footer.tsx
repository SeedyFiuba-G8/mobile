import React from 'react';
import { StyleSheet, View } from 'react-native';
// Constants
import colors from '../../constants/colors';
import values from '../../constants/values';

export default function Footer(): React.ReactElement {
    return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-end',
        borderTopColor: colors.separator.light,
        borderTopWidth: values.drawer.separatorWeight,
    },
    icon: {
        paddingRight: 20,
        paddingVertical: 10,
    },
});
