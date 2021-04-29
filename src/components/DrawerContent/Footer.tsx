import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Navigation
import { DrawerContentComponentProps } from '@react-navigation/drawer';

// Hooks
import { useTheme, useThemeUpdate } from '../../hooks/useTheme';

// Constants
import colors from '../../constants/colors';
import values from '../../constants/values';

export default function Footer({ ...props }: DrawerContentComponentProps) {
	const theme = useTheme();
	const toggleTheme = useThemeUpdate();

	return (
		<View style={styles.container}>
			<TouchableOpacity
				onPress={() => {
					console.log('Prev theme: ', theme);
					toggleTheme();
				}}
			>
				{/* Lo ideal sería cambiar el icono según el tema */}
				<Ionicons
					name="moon-outline"
					size={40}
					color="black"
					style={styles.icon}
				/>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'flex-end',
		borderTopColor: colors.drawer.separator,
		borderTopWidth: values.drawer.separatorWeight,
	},
	icon: {
		paddingRight: 20,
		paddingVertical: 10,
	},
});
