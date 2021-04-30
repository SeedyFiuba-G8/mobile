import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Navigation
import { DrawerContentComponentProps } from '@react-navigation/drawer';

// Constants
import colors from '../../constants/colors';
import values from '../../constants/values';

// Contexts
import { useTheme } from '../../contexts/ThemeProvider';

export default function Footer({ ...props }: DrawerContentComponentProps) {
	const { theme, toggleTheme } = useTheme();

	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={() => toggleTheme()}>
				<Ionicons
					name={theme === 'dark' ? 'sunny-outline' : 'moon-outline'}
					size={40}
					color={theme === 'dark' ? colors.white : colors.black}
					style={styles.icon}
				/>
			</TouchableOpacity>
		</View>
	);
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
