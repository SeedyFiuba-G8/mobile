import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar, Caption, Title } from 'react-native-paper';

// Navigation
import { DrawerContentComponentProps } from '@react-navigation/drawer';

// Constants
import colors from '../../constants/colors';
import values from '../../constants/values';

// Contexts
import { useTheme } from '../../contexts/ThemeProvider';

// Hooks
import { useSelector } from 'react-redux';

// Types
import type { RootState } from '../../reducers';

export default function Header({
    ...props
}: DrawerContentComponentProps): React.ReactNode {
    const { isDarkTheme } = useTheme();

    const styles = React.useMemo(
        () => createThemedStyles(isDarkTheme),
        [isDarkTheme]
    );
    const profile_info = useSelector((state: RootState) => state.profile);
    return (
        <View style={styles.container}>
            <View style={styles.userInfo}>
                <Avatar.Image
                    source={require('../../assets/images/dummy_avatar.jpg')}
                    size={120}
                />

                <View style={styles.userName}>
                    <Title
                        style={styles.title}
                    >{`${profile_info.first_name} ${profile_info.last_name}`}</Title>
                </View>
            </View>
        </View>
    );
}

const createThemedStyles = (isDarkTheme: boolean) => {
    const styles = StyleSheet.create({
        caption: {
            fontSize: 14,
            lineHeight: 14,
        },

        container: {
            marginTop: 20,
            paddingBottom: 20,
            borderBottomColor: isDarkTheme
                ? colors.separator.dark
                : colors.separator.light,
            borderBottomWidth: values.drawer.separatorWeight,
        },

        title: {
            fontSize: 16,
            fontWeight: 'bold',
        },

        userInfo: {
            alignItems: 'center',
        },

        userName: {
            marginTop: 10,
            flexDirection: 'column',
        },
    });

    return styles;
};
