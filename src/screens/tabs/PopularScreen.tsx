import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// Navigation
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';

export default function PopularScreen({ navigation }: MaterialTopTabBarProps) {
	return (
		<View style={styles.container}>
			<Text>Here we should render popular stuff (?)</Text>
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
