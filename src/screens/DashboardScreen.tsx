import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Title, Caption, Paragraph } from 'react-native-paper';

// Navigation
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';

export default function DashboardScreen({
    navigation,
}: MaterialTopTabBarProps): React.ReactNode {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Dashboard Screen</Text>
            <Paragraph>
                Here we should render cards according to params.
            </Paragraph>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});
