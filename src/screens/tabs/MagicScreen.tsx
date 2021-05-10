import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// Navigation
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';

export default function MagicScreen({ navigation }: MaterialTopTabBarProps) {
	return (
		<View style={styles.container}>
			<Text>Here we should render magic stuff (?)</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
