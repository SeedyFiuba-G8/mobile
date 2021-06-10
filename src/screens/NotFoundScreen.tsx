import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { Title, Paragraph } from 'react-native-paper';

// Navigation
import { StackScreenProps } from '@react-navigation/stack';

// Ts types
import { RootStackParamList } from '../types';

export default function NotFoundScreen({
    navigation,
}: StackScreenProps<RootStackParamList, 'NotFound'>) {
    return (
        <View style={styles.container}>
            <Title>This screen doesn't exist.</Title>
            <TouchableOpacity
                onPress={() => navigation.replace('Drawer')}
                style={styles.link}
            >
                <Paragraph style={styles.linkText}>
                    Go to home screen!
                </Paragraph>
            </TouchableOpacity>
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
    link: {
        marginTop: 15,
        paddingVertical: 15,
    },
    linkText: {
        fontSize: 14,
        color: '#2e78b7',
    },
});
