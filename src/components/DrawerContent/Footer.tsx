import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Navigation
import {
	DrawerContentComponentProps,
	DrawerItem,
} from '@react-navigation/drawer';

// Constants
import colors from '../../constants/colors';
import values from '../../constants/values';

export default function Footer({ ...props }: DrawerContentComponentProps) {
	return (
		<View style={styles.container}>
			{/* Poner toggles para Dark Theme, por ej */}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		// borderTopColor: colors.drawer.separator,
		// borderTopWidth: values.drawer.separatorWeight,
	},
});
